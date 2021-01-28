module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name          = "CoinGecko-Perp API Gateway"
  description   = "API Gateway to proxy to CoinGecko API"
  protocol_type = "HTTP"

  cors_configuration = {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["*"]
  }

  # Access logs
  default_stage_access_log_destination_arn = aws_cloudwatch_log_group.gateway_log_group.arn
  default_stage_access_log_format          = "$context.identity.sourceIp - - [$context.requestTime] \"$context.httpMethod $context.routeKey $context.protocol\" $context.status $context.responseLength $context.requestId $context.integrationErrorMessage"

    create_api_domain_name = false
# Change these lines to assign custom domain to the gateway
#   domain_name = coingecko.perp.fi
#   domain_name_certificate_arn = "arn...."

  integrations = {
    "ANY /{proxy+}" = {
      lambda_arn             = module.lambda_function_from_container_image.this_lambda_function_arn
      payload_format_version = "1.0"
      timeout_milliseconds   = 12000
    }
  }

  tags = var.tags
}

resource "aws_cloudwatch_log_group" "gateway_log_group" {
  tags = var.tags
}

# Uncomment to add api gateway custom domain redirect to route53
# resource "aws_route53_record" "api-gateway-custom-domain" {
#   name    = local.site_name
#   type    = "A"
#   zone_id = data.aws_route53_zone.selected.zone_id

#   alias {
#     name                   = module.api_gateway.this_apigatewayv2_domain_name_configuration[0].target_domain_name
#     zone_id                = module.api_gateway.this_apigatewayv2_domain_name_configuration[0].hosted_zone_id
#     evaluate_target_health = false
#   }
# }
