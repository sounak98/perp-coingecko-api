# Lambda Function
output "this_lambda_function_name" {
  description = "The name of the Lambda Function"
  value       = module.lambda_function_from_container_image.this_lambda_function_name
}

output "this_lambda_function_version" {
  description = "Latest published version of Lambda Function"
  value       = module.lambda_function_from_container_image.this_lambda_function_version
}

output "this_lambda_function_last_modified" {
  description = "The date Lambda Function resource was last modified"
  value       = module.lambda_function_from_container_image.this_lambda_function_last_modified
}

# CloudWatch Log Group
output "lambda_cloudwatch_log_group_arn" {
  description = "The ARN of the Cloudwatch Log Group"
  value       = module.lambda_function_from_container_image.lambda_cloudwatch_log_group_arn
}

output "API_Gateway_URI" {
  description = "The URI to access api gateway "
  value       = module.api_gateway.this_apigatewayv2_api_api_endpoint
}

output "CoinGecko_Full_URL" {
  description = "The URI to access api gateway "
  value       = "${module.api_gateway.this_apigatewayv2_api_api_endpoint}/pairs"
}