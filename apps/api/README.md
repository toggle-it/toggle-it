<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prepare for local development

- Refer to ./config/configurations.ts to tweak avaiable env variables
- Add .env in api root folder with the necessary env defined\

e.g. for content in `./.env` file:

```sh
NEST_JWT_SECRET="YOUR RANDOM CHAR STRING HERE"
NEST_REFRESH_TOKEN_SECRET="A DIFFERENT RANDOM CHAR STRING HERE"
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# test debug
$ pnpm run test:debug

# test coverage
$ pnpm run test:ci
```

### Naming style for constants

```js
const SNAKE_CASE = "SNAKE_CASE";
const SNAKE_CASE_KEY = "snakeCase";
```

The const with `_KEY` as a suffix will have camelCase styled value with `_key` keyword omitted.\
All others will have same value as variable name.
