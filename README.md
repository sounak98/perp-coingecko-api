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

- Deployment is done using serverless.com
- Please install [sls / serverless cli](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy/)
- login to serverless account using `sls login`
- change variables in `serverless.yml`
- go to `app.serverless.com` to setup the aws (or gcp) provider creds needed to setup the lambda and api gateway
- run `sls deploy --debug` to setup the deployment

## Sample Response

```json
{
  "pairs": [
    {
      "ticker_id": "ETH_USDC",
      "base_currency": "ETH",
      "target_currency": "USDC",
      "last_price": 1740.12,
      "product_type": "Perpetual",
      "funding_rate": -0.0180938085275365,
      "next_funding_rate_timestamp": 1615460460,
      "high": 1863.560971469879,
      "low": 1709.9515690497437,
      "target_volume": 20794876.31728001,
      "base_volume": 11552.293807828666,
      "open_interest": 15302295.533485038
    },
    {
      "ticker_id": "BTC_USDC",
      "base_currency": "BTC",
      "target_currency": "USDC",
      "last_price": 54753.89,
      "product_type": "Perpetual",
      "funding_rate": -0.006123389349057,
      "next_funding_rate_timestamp": 1615460460,
      "high": 57364.540338010454,
      "low": 54219.891406369665,
      "target_volume": 11595132.29580138,
      "base_volume": 207.08394149239206,
      "open_interest": 11232399.665813368
    },
    {
      "ticker_id": "YFI_USDC",
      "base_currency": "YFI",
      "target_currency": "USDC",
      "last_price": 36092.98,
      "product_type": "Perpetual",
      "funding_rate": -0.0031469854718157,
      "next_funding_rate_timestamp": 1615460460,
      "high": 38628.980828084044,
      "low": 35892.887444158136,
      "target_volume": 4716040.276390527,
      "base_volume": 126.50609330638798,
      "open_interest": 1328124.9612149775
    },
    {
      "ticker_id": "DOT_USDC",
      "base_currency": "DOT",
      "target_currency": "USDC",
      "last_price": 36.23,
      "product_type": "Perpetual",
      "funding_rate": -0.0122404208632822,
      "next_funding_rate_timestamp": 1615460460,
      "high": 39.43741774936222,
      "low": 35.79088270935207,
      "target_volume": 9847677.698112981,
      "base_volume": 263153.0362513521,
      "open_interest": 3287365.355694675
    },
    {
      "ticker_id": "SNX_USDC",
      "base_currency": "SNX",
      "target_currency": "USDC",
      "last_price": 21.09,
      "product_type": "Perpetual",
      "funding_rate": -0.0077745639999855995,
      "next_funding_rate_timestamp": 1615460460,
      "high": 22.790834461144296,
      "low": 20.896171187001812,
      "target_volume": 2804336.5720873247,
      "base_volume": 128764.96169319592,
      "open_interest": 944018.8215263624
    },
    {
      "ticker_id": "LINK_USDC",
      "base_currency": "LINK",
      "target_currency": "USDC",
      "last_price": 28.91,
      "product_type": "Perpetual",
      "funding_rate": -0.0068153899164143,
      "next_funding_rate_timestamp": 1615460465,
      "high": 30.89536100522565,
      "low": 28.63024939650237,
      "target_volume": 4624225.611880518,
      "base_volume": 155909.1619614124,
      "open_interest": 460192.3713556992
    },
    {
      "ticker_id": "AAVE_USDC",
      "base_currency": "AAVE",
      "target_currency": "USDC",
      "last_price": 398.68,
      "product_type": "Perpetual",
      "funding_rate": 0.0062827723800774,
      "next_funding_rate_timestamp": 1615460465,
      "high": 437.3308488249692,
      "low": 389.85390992769123,
      "target_volume": 6534075.217204846,
      "base_volume": 15817.067509784589,
      "open_interest": 729103.533831669
    },
    {
      "ticker_id": "SUSHI_USDC",
      "base_currency": "SUSHI",
      "target_currency": "USDC",
      "last_price": 17.33,
      "product_type": "Perpetual",
      "funding_rate": 0.0072257713883762,
      "next_funding_rate_timestamp": 1615460465,
      "high": 18.8327990230181,
      "low": 17.109595631721955,
      "target_volume": 6829377.177491898,
      "base_volume": 378635.64070982067,
      "open_interest": 579673.2955020546
    },
    {
      "ticker_id": "COMP_USDC",
      "base_currency": "COMP",
      "target_currency": "USDC",
      "last_price": 465.55,
      "product_type": "Perpetual",
      "high": 469.8398136851644,
      "low": 465.55207808029195,
      "target_volume": 39234.75970005113,
      "base_volume": 83.98891113937388,
      "open_interest": 0
    }
  ]
}
```

#### Created By

- [@sounak98](https://github.com/sounak98)
- [@nemani](https://github.com/nemani)
- [@nanspro](https://github.com/nanspro)
