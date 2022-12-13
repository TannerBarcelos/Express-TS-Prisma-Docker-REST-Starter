## Express - TypeScript - Prisma - Zod - Docker REST API Starter

This project serves as a template and demonstration for developing a modern Node / Express, Typescript based REST API. We use Prisma as an ORM to interact with a local Postgres database being deployed through Docker.

To read about the project and get an in-depth guide on running the app, to testing and everything in between, see my blog series on how I created this project, why I did it, how to do it yourself, how to run it if you are not interested in re-building this from scratch and so much more! **Link coming soon - for now, follow this guide for setup instructions**

### Run the project

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

# App related env-vars
PORT=<desired_port_for_server>
DB_PORT=<desired_port_for_db>

# JWT secrets
JWT_SECRET_KEY=<token_secret>

AUTH_COOKIE_NAME=<cookie_name_for_jwt_auth>
PORT=<desired_port_for_server>
```

2. Install dependencies

```bash
npm install
```

3. Download [Docker](https://docker.com) if you do not already have it installed. Run docker desktop once it is installed.

4. **Run the project** using the following command _(ensure you have Make installed on your machine)_. This command will build the postgres and api app containers and initialize prisma in your app. You can query your api with an HTTP client like Postman and confirm

```bash
Make run build
```

> **Note**
> To make updates to your models and have the prisma schema and client also update and get in sync with the database, you must uncomment the DATABASE_URL that points to localhost and comment out the DATABASE_URL that points to postgres (container name). To push a change to the db, run a migration, seed or do anything else, you need to run the commands through the localhost connection as the container_name connection will fail.
>
> I have included a starting migration file in the prisma folder which will automatically sync up the starter prisma models with the newly created Postgres DB. All you need to do is run the Make command above and you will be good to go.
>
> Just remember - as this is a starter repo, I assume many users will want to delete the models and designt their own stuff. In order for your local environment to change and have the DB be in sync, just uncomment the localhost variable like mentioned earlier, run your pushes / migrations, etc. and then switch back.
>
> **You can also run prisma commands within the container and ommit this step. Given the use of Docker volumes, if you do a Prisma migrate or push, the local environment will sync with the container and you will still get the desired behavior.. this is just less user friendly**

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
