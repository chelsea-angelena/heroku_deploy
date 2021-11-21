## Description

Basic NestJs/Postgres Api - deployed with Heroku

Returns plant identification information for images posted to the 'identify' endpoint in base64

Check out the <a href='https://clar-server.herokuapp.com/api'>Swagger</a> documentation

(local: <a href='http://localhost:5002/api'>Swagger</a> documentation)

## Installation

`npm install`

## Dependencies

- @nestjs/mapped-types
- @nestjs/passport
- @nestjs/platform-express
- @nestjs/swagger
- @nestjs/typeorm
- @types/multer
- bcryptjs
- body-parser
- clarifai
- clarifai-nodejs-grpc
- class-transformer
- class-validator
- cookie-parser
- passport
- passport-jwt
- passport-local
- pg
- reflect-metadata
- rimraf
- rxjs
- swagger-ui-express
- typeorm

## Running the app with Docker

- update POSTGRES_HOST to be 'db' in the .env file
- make run-local

## Deploying The Docker Image

- docker tag <image> registry.heroku.com/<app>/<process-type>
- docker push registry.heroku.com/<app>/<process-type>
- heroku container:push release
- heroku container:release web release

ie:

- docker tag clar-server-server registry.heroku.com/clar-server/web
- docker push registry.heroku.com/clar-server/web

## Running the app locally

`npm run start:dev`

## Environment

- Add a .env (set to local environment)

```
MODE=devleopment
POSTGRES_HOST=localhost
POSTGRES_DATABASE=<db_name>
POSTGRES_USER=<db_user>
POSTGRES_PORT=5432
POSTGRES_PASSWORD=<db_password>
```

## Deploy To Heroku

These are the steps for deploying an app to heroku:

- heroku login
- heroku create <app name>
- package.json: node engine:

```
"engines": {
    "node": "16.x.x",
    "yarn": '1.2.x
  },

```

- add a Procfile (no file type appended )

```
web: npm run start:prod

```

change main.js:

```
const port = process.env.PORT || 5000;
await app.listen(port);
}

```

Heroku will set the port env variable to a random port, so you need to use process.env.port.

This variable does need to be explicitly set

Set Heroku env vars:

- heroku config:set <key>=<value> --app <appname>

  heroku config:set NODE_ENV=development --app <appname>
  typescript dev dependencies will be needed at build time

  heroku config:set MODE=production --app <appname>
  since NODE_ENV = development, we want to set this to production to specifiy SSL true in our database module during production vs local development

  (Even though we are calling this production, this is a 'development deployment' as it is not really configured/scalable for production)

Commit changes, push to: git push heroku main

## Adding Heroku Database

- Log in to heroku -> addons -> search 'postgres'
- select Heroku Postgres--> Hobby Free
- open Resources tab --> click on the database name
- copy down values for the database settings
- In the terminal at the root dir of your project, add the values from your postgres heroku add on, name them exactly as you have set up in your .env file

  - heroku config:set <var>=<value> --app <app name>

## License

[MIT licensed](LICENSE).
