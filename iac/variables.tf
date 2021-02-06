variable "lambda_function_name" {
    type = string
}
variable "aws_region" {
    type = string
}
variable "tags" {
    type = map(string)
}

variable "aws_access_key" {
    type = string
}
variable "aws_secret_key" {
    type = string
}