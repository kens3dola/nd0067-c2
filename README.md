# Configurations:

## port: 3000

## environment variables: listed in .env

-   POSTGRES_HOST=127.0.0.1
-   POSTGRES_DB=nd0067
-   POSTGRES_USER=postgres
-   POSTGRES_PASSWORD=postgres
-   POSTGRES_DB_TEST=test
-   ENV=dev
-   TOKEN_SECRET=abcd

## installation: npm i

## db:

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

## Run server: npm start

## Run test: npm run test
