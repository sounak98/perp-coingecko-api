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
  "pairs":[
    {
      "ticker_id":"ETH_USDC",
      "base_currency":"ETH",
      "target_currency":"USDC",
      "last_price":1841.68,
      "product_type":"Perpetual",
      "funding_rate":0.000348495531157,
      "next_funding_rate_timestamp":1615392055,
      "high":1875.0363612527026,
      "low":1759.3936845587664,
      "target_volume":13729021.524708664,
      "base_volume":7569.530468450589,
      "open_interest":16093777.154698012
    },
    {
      "ticker_id":"BTC_USDC",
      "base_currency":"BTC",
      "target_currency":"USDC",
      "last_price":56232.58,
      "product_type":"Perpetual",
      "funding_rate":-0.0010677194902996999,
      "next_funding_rate_timestamp":1615392055,
      "high":56553.88897950449,
      "low":52968.99896040421,
      "target_volume":6918590.92855673,
      "base_volume":126.90619454311592,
      "open_interest":11755675.128303612
    },
    {
      "ticker_id":"YFI_USDC",
      "base_currency":"YFI",
      "target_currency":"USDC",
      "last_price":38512.46,
      "product_type":"Perpetual",
      "funding_rate":-0.0049485801763517,
      "next_funding_rate_timestamp":1615392055,
      "high":39630.79634971939,
      "low":36410.943342048085,
      "target_volume":3783063.375605729,
      "base_volume":99.60919332749803,
      "open_interest":1618000.0144490085
    },
    {
      "ticker_id":"DOT_USDC",
      "base_currency":"DOT",
      "target_currency":"USDC",
      "last_price":38.74,
      "product_type":"Perpetual",
      "funding_rate":-0.0043578220858435,
      "next_funding_rate_timestamp":1615392055,
      "high":39.43741774936222,
      "low":35.73557481752403,
      "target_volume":7995538.183349177,
      "base_volume":212449.92285871052,
      "open_interest":3730058.1568083805
    },
    {
      "ticker_id":"SNX_USDC",
      "base_currency":"SNX",
      "target_currency":"USDC",
      "last_price":22.63,
      "product_type":"Perpetual",
      "funding_rate":-0.0036711858718644,
      "next_funding_rate_timestamp":1615392060,
      "high":23.33444756135917,
      "low":21.83142873462133,
      "target_volume":2442909.5378809073,
      "base_volume":109261.93589734554,
      "open_interest":1081659.6879472183
    },
    {
      "ticker_id":"LINK_USDC",
      "base_currency":"LINK",
      "target_currency":"USDC",
      "last_price":30.62,
      "product_type":"Perpetual",
      "funding_rate":-0.0098634717276378,
      "next_funding_rate_timestamp":1615392060,
      "high":31.609246132222754,
      "low":29.552480545534152,
      "target_volume":3640308.8463049144,
      "base_volume":119387.34053360077,
      "open_interest":748068.768720699
    },
    {
      "ticker_id":"AAVE_USDC",
      "base_currency":"AAVE",
      "target_currency":"USDC",
      "last_price":433.26,
      "product_type":"Perpetual",
      "funding_rate":0.0097120020067045,
      "next_funding_rate_timestamp":1615392060,
      "high":460.4553576023913,
      "low":417.65409665872784,
      "target_volume":7614142.031466088,
      "base_volume":17552.390932501443,
      "open_interest":420219.67896210914
    },
    {
      "ticker_id":"SUSHI_USDC",
      "base_currency":"SUSHI",
      "target_currency":"USDC",
      "last_price":18.56,
      "product_type":"Perpetual",
      "funding_rate":-0.001250609086206,
      "next_funding_rate_timestamp":1615392060,
      "high":19.938914045699665,
      "low":17.678260577363755,
      "target_volume":8324820.207773659,
      "base_volume":440850.0581713898,
      "open_interest":387619.6746824534
    }
  ]
}
```

#### Created By

- [@sounak98](https://github.com/sounak98)
- [@nemani](https://github.com/nemani)
- [@nanspro](https://github.com/nanspro)
