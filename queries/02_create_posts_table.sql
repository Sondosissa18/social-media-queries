CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title varchar(50),
    body varchar(500),
    "user_id" INTEGER REFERENCES "users" ("id") --ON DELETE CASCADE ON UPDATE CASCADE
);
