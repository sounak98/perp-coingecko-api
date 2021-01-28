# Access Keys can be given using ENV variables
# For more details check AWS provider access key docs
# aws_access_key = ""
# aws_secret_key = ""

# Selected region needs to have support for docker images as lambda
aws_region     = "ap-southeast-1"
lambda_function_name = "CoinGecko-API-PERP"

tags = {
    application = "coingecko-api"
    runner = "nemani"
    script_by    = "github.com/nemani"
    created_by = "terraform"
}
