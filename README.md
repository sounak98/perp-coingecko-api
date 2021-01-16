# Perpetual Protocol Coingecko API

## Local Env

```sh
$ pip install -r requirements.txt
$ uvicorn app.main:app --reload
```

## Docker

```sh
$ docker build -t perp-coingecko-api .
$ docker run -p 80:80 perp-coingecko-api
```
