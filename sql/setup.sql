-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS github_users cascade;
DROP TABLE IF EXISTS posts cascade;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash VARCHAR NOT NULL
);
CREATE TABLE github_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    login TEXT UNIQUE,
    email TEXT
);
CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  login TEXT,
  content VARCHAR NOT NULL,
  FOREIGN KEY (email) REFERENCES users(email),
  FOREIGN KEY (login) REFERENCES github_users(login)
);