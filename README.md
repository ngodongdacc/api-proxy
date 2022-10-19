## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

Create .env file to setup port for service by using template in file env.example  
Server will run in port 4001 for default, but you can change suitable for by change in .env file  
Swagger run in http:localhost:4001/explorer

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
