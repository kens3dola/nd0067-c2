CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    password VARCHAR(255)
);