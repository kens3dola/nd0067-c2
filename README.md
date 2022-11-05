<<<<<<< HEAD
# Configurations:

## port: 3000

## environment variables: listed in .env
=======
#   Configurations:
##  port: 3000
##  environment variables: listed in .env
>>>>>>> b83c454474a5502df0f5233ad9e98ee34d1664b0

-   POSTGRES_HOST=127.0.0.1
-   POSTGRES_DB=nd0067
-   POSTGRES_USER=postgres
-   POSTGRES_PASSWORD=postgres
-   POSTGRES_DB_TEST=test
-   ENV=dev
-   TOKEN_SECRET=abcd

<<<<<<< HEAD
## installation: npm i

## db:
=======
##  installation: npm i
##  db:
>>>>>>> b83c454474a5502df0f5233ad9e98ee34d1664b0

```
    CREATE USER postgres WITH PASSWORD 'postgres';
    CREATE DATABASE nd0067;
    GRANT ALL PRIVILEGES ON DATABASE nd0067 TO postgres;
```

```
    # run before execute test
    CREATE DATABASE test;
    GRANT ALL PRIVILEGES ON DATABASE nd0067 TO postgres;
```

<<<<<<< HEAD
## Run server: npm start

## Run test: npm run test
=======
##  Run server: npm start
##  Run test: npm run test
>>>>>>> b83c454474a5502df0f5233ad9e98ee34d1664b0
