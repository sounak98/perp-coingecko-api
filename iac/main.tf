terraform {
  required_version = ">= 0.12.6"

  required_providers {
    aws    = ">= 3.19"

    docker = {
      source  = "kreuzwerker/docker"
      version = ">= 2.11.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key

  # Make it faster by skipping something
  skip_get_ec2_platforms      = true
  skip_metadata_api_check     = true
  skip_region_validation      = true
  skip_credentials_validation = true
  skip_requesting_account_id  = true
}

module "lambda_function_from_container_image" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = var.lambda_function_name
  description   = "An API to feed data and stats from perp.exchange to CoinGecko"

  create_package = false
  publish = true

  ##################
  # Container Image
  ##################
  image_uri    = docker_registry_image.app.name
  package_type = "Image"
  #  Entrypoint override
  image_config_entry_point = ["/lambda-entrypoint.sh"]
  image_config_command = ["dist/index.handler"]
  
  timeout = 60 # 1 mins

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service = "apigateway"
      arn     = module.api_gateway.this_apigatewayv2_api_execution_arn
    }
  }

  tags = var.tags
}

#################
# ECR Repository
#################
resource "aws_ecr_repository" "this" {
    name = "coingeckoapi"
    tags = var.tags
}

###############################################
# Create Docker Image and push to ECR registry
###############################################

data "aws_caller_identity" "this" {}
data "aws_region" "current" {}
data "aws_ecr_authorization_token" "token" {}

locals {
  ecr_address = format("%v.dkr.ecr.%v.amazonaws.com", data.aws_caller_identity.this.account_id, data.aws_region.current.name)
  ecr_image   = format("%v/%v:%v", local.ecr_address, aws_ecr_repository.this.id, "1.0")
}

provider "docker" {
  registry_auth {
    address  = local.ecr_address
    username = data.aws_ecr_authorization_token.token.user_name
    password = data.aws_ecr_authorization_token.token.password
  }
}

resource "docker_registry_image" "app" {
  name = local.ecr_image
  build {
    context = "../"
  }
}