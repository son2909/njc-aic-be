# -njc_aic_back
- [x] Serverless, NestJS, Postgres, Repository pattern
- [x] TypeORM
- [x] Migrations
- [x] Swagger
- [ ] Seeds
- [x] Environment (development, test, staging, production)
- [x] Express (DI, authz, utils, logging, response, error handling and example)
- [x] Batches, Caching
- [x] Folder structure
- [x] Coding convention (eslint, prettier)
- [x] Unit test with jest
- [ ] Gitlab CI/CD
- [ ] Configure container images stored container registry
- [ ] Update guideline
- [ ] Infrastructure as code with Cloudformation or Terraform

## Requirement

- Node 16.x
- Yarn 1.x
- PostgreSQL

## Installation

```bash
$ yarn install
```

```bash
$ sh setup_env.sh dev
```

## Migration
Note: The TypeORM is not setting to auto synchronize between entity and DB table when application booting. If you wish to migration database, please using following command.
### Create new migration
```bash
$ yarn run migrate:create <migration name>
```
### Migrate database
```bash
$ yarn run migrate:up
$ NODE_ENV=production yarn run migrate:up
```
## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [HuuSon](https://www.facebook.com/Son.IT.Ptit/)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

  Nest is [MIT licensed](LICENSE).