# Perpetual Protocol Coingecko API

## Run Locally

```sh
$ npm install
$ npm run listen
```

## Run with Docker Image

```sh
$ docker build -t perp-coingecko-api .
$ docker run -itp 80:5000 perp-coingecko-api
```

## Infrastructure

- AWS credentials are read from `~/.aws/credentials`

```
[default]
aws_access_key_id = "...."
aws_secret_access_key = "...."
```

- Terraform is used to create AWS resources
- AWS Resources
  - ECR Repository: Private ECR repository to keep docker images
  - Lambda Function: Lambda Function to run the docker image
  - API Gateway: Endpoint for exposing Lambda via HTTP API
  - Cloudwatch Logs Groups: For storing application logs

#### Quick Deploy

We wrote a script to init terraform and update the code in a single command for quick setup.

```sh
npm run quick-deploy
```

#### Terraform Workflow

```sh
$ cd iac
$ terrafrom init # to init the provider and download needed modules
$ terraform plan # To plan for changes that need to be made
$ terraform apply # To apply changes to the resources
$ terraform destroy # To bring down the resources
```

## Sample Response

- Some pairs are missing `funding_rate` and `next_funding_rate_timestamp`
- They will automatically be updated when the information is avaialble on the subgraph
- [Link to PR](https://github.com/perpetual-protocol/perp-position-subgraph/pull/6)

```json
{
  "pairs": [
    {
      "ticker_id": "ETH_USDC",
      "base_currency": "ETH",
      "target_currency": "USDC",
      "last_price": 1414.04,
      "product_type": "Perpetual",
      "funding_rate": 0.0015915819194816,
      "next_funding_rate_timestamp": 1611925500,
      "high": 1428.4120663546696,
      "low": 1294.0204656905978,
      "target_volume": 14220064.200668627,
      "base_volume": 10531.84436540028
    },
    {
      "ticker_id": "BTC_USDC",
      "base_currency": "BTC",
      "target_currency": "USDC",
      "last_price": 37252.8,
      "product_type": "Perpetual",
      "funding_rate": -0.0377643433050893,
      "next_funding_rate_timestamp": 1611925505,
      "high": 37306.53246076909,
      "low": 31305.28445403109,
      "target_volume": 10944763.750863258,
      "base_volume": 319.37663512979844
    },
    {
      "ticker_id": "YFI_USDC",
      "base_currency": "YFI",
      "target_currency": "USDC",
      "last_price": 31187.77,
      "product_type": "Perpetual",
      "high": 31806.27685045105,
      "low": 28687.586138700837,
      "target_volume": 3661129.289683183,
      "base_volume": 122.23521521111489
    },
    {
      "ticker_id": "DOT_USDC",
      "base_currency": "DOT",
      "target_currency": "USDC",
      "last_price": 17.36,
      "product_type": "Perpetual",
      "high": 17.650933394554873,
      "low": 16.09702373922158,
      "target_volume": 2757236.9734023623,
      "base_volume": 163771.74331373145
    },
    {
      "ticker_id": "SNX_USDC",
      "base_currency": "SNX",
      "target_currency": "USDC",
      "last_price": 16.66,
      "product_type": "Perpetual",
      "high": 17.891016965187813,
      "low": 16.113105996857335,
      "target_volume": 3819955.5906198923,
      "base_volume": 227184.69358029726
    }
  ]
}
```

#### Created By

- [@sounak98](https://github.com/sounak98)
- [@nemani](https://github.com/nemani)
- [@nanspro](https://github.com/nanspro)
