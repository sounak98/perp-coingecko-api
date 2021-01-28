# Perpetual Protocol Coingecko API

## Local Env

```sh
$ npm install
$ npm run listen
```

## Docker

```sh
$ docker build -t perp-coingecko-api .
$ docker run -itp 80:5000 perp-coingecko-api
```

## Terraform

- Make sure you have AWS-CLI credentials in ~/.aws/credentials

```sh
$ cd iac
$ terraform plan # To plan for changes that need to be made
$ terraform apply # To apply changes to the resources
$ terraform destroy # To bring down the resources
```
