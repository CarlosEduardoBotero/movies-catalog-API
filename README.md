## 🎯 Purpose

Develop a movies API.

---

### ❤️ Available on

https://movies-catalog-api.onrender.com

**Note**: Web Services on the free plan are automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, **Render** spins it up again so it can process the request.
This can cause a _response delay of up to 30 seconds_ for the first request that comes in after a period of inactivity.

---

### 🔧 Technologies used

- TypeScript
- Nest.js
- TypeORM
- Swagger
- Docker
- Redis
- PostgreSQL

### 🔎 Improvements

- Logging
- More tests
- Filtering and searching

### 🏁 API Usage

[swagger](https://movies-catalog-api.onrender.com/api)

### Endpoints to be implemented:

- filter all avialable movies

      /v1/movies/?director=james%20cameron

- searching by movie name

      /v1/movies/search/?movie=titanic

### ✨ Local environment set up

There are two set up, using npm or docker-compose. Next steps are common between them.

- Copy \_.env to .env:

        $ cp _.env .env

- Update .env file with the right values

#### Using npm

- Install dependencies using npm.

        $ npm i

- Run the development server executing:

        $ npm run start:dev

#### Using docker-compose

- Execute:

        $ docker-compose up -d build

- To stop it execute:

        $ docker-compose stop

**To test successfully set up visit: http://localhost:8000**

### ☁️ Production environment

Set up with Docker deploy. Use the [Dockerfile](Dockerfile) file.

To use [render](https://render.com/) connect your GitHub repository and allow automatic deploy by push.

In server needs to configure this list of environment variables [\_.env](_.env).

**Keep an eye on PORT value** It is required to deploy the app, Heroku and Render assign it automatically.

On Render you can create Postgres Database and Redis instance for free.

---

⌨️ by [Carlos Botero](https://github.com/in/carlos-eduardo-botero/) 😊
