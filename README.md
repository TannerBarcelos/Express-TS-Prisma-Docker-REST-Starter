## Express - TypeScript - Prisma - Zod - Docker API Starter

This project serves as a template and demonstration for developing a modern Node / Express, Typescript based REST API. We use Prisma as an ORM to interact with a local Postgres database being deployed through Docker.

To read about the project and get an in-depth guide on running the app, to testing and everything in between, [see my blog series](https://blog.tannerbarcelos.com/creating-a-modern-rest-api-using-prisma-typescript-express-and-docker-part-1) on how I created this project, why I did it, how to do it yourself, how to run it if you are not interested in re-building this from scratch and so much more!

### Setup and Run

1. Create a .env file and add the following configuration variables

> These are very important as the Docker Compose file and the Prisma CLI / Client depend on the variables within this file to properly create a user for our database, create a connection to the database and more.

```bash
# DB Related env-vars
POSTGRES_PASSWORD=<Secret_pass>
POSTGRES_USER=<user>
POSTGRES_DB=<db_name>

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}"

# Uncomment and use when you need to make changes to your schema / models or run a db push (for dev) or migration (prod)
# Note > You can run push and migration commands as well as edit the actual schema in the container using Vim if you would like as well.
# This is easier and a bit my user friendly
# DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"

# App related env-**vars**
PORT=<desired_port_for_server>
DB_PORT=<desired_port_for_db>

# JWT secrets
JWT_SECRET_KEY=<token_secret>

AUTH_COOKIE_NAME=<cookie_name_for_jwt_auth>
PORT=<desired_port_for_server>
```

> **Note**
> If you look at the .env variables above, I call out that you should uncomment the omitted `DATABASE_URL` that points to `@localhost` if you need to run prisma related commands like `npx prisma migrate dev`, `npx prisma studio` etc. The reason this has to be done is that currently, the uncommented `DATABASE_URL` points to `@postgres` due to our whole app (REST API and Postgres) running in a Docker environment.
>
> If we had solely deployed Postgres in Docker and did not use Docker for the API, then the need for pointing to `@postgres` would be meaningless as we port map the container to the host machines default postgres port. You would not need two versions of a `DATABASE_URL` because the REST API would always be running on `localhost` and the container would be as well.
>
> So, because our whole project is dockerized, we need two `DATABASE_URL` variables. One that points at the container so that when Prisma runs its ORM commands on the database from within the Dockerized API, it will know where to go (because Docker Networking requires that all services must communicate on the same network leveraging the container name instead of `localhost`). The commented out `DATABASE_URL` is to only be uncommented, and then commenting out the reference to `@postgres` when you need to run local migrations, prisma studio to visualize the database in a GUI and more database related work.
>
> **You can also run prisma commands within the container and ommit the 2 `DATABASE_URL` environment variable paradigm and only need the `@localhost` url. Given the use of Docker volumes, if you do a Prisma migrate or push, the local environment will sync with the container and you will still get the desired behavior.. this is just less user friendly. However, if you require Prisma Studio, then again, you'd need the 2 env var approach**

2. Install dependencies

```bash
npm install
```

3. Download [Docker](https://docker.com) if you do not already have it installed. Run docker desktop once it is installed.

4. **Run the project** using the following command _(ensure you have Make installed on your machine)_. This command will build the postgres and api app containers and initialize prisma in your app. You can query your api with an HTTP client like Postman and confirm

```bash
Make run build
```

---

### Exploring the database

[Learn more here](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/?utm_campaign=2022-10-11-brnd-postgresdoi&utm_medium=social&utm_source=linkedin)

1. Open Docker Desktop and find the running postgres container
2. Click on the postgres container and select the terminal tab. This will show a blank command line which is running within the container
   ![image](./docs/docker-pg.png)
   ![image](./docs/docker-term.png)
3. Connect to the database using the `psql` command within this terminal

```bash
psql -U <username_you_created> -d <db_name>
```

![image](./docs/psql.png)

> Note the database name should match the name you give the connection string in the .env file which Prisma uses. **1 database for 1 Prisma configuration**
