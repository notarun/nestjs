<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description
Personal NestJS template with NestJS + MikroORM + nestjs-console + eta.

> Only MySQL is supported

## Installation

```bash
npm install
cp .env.example .env
docker-compose up
docker-compose run app npm run console migration up
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

# migration cli
npm run console migration
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
