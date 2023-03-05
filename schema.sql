DROP TABLE IF EXISTS favmovies;

CREATE TABLE IF NOT EXISTS favmovies (
    id SERIAL PRIMARY KEY,
    movie_title VARCHAR(255),
    min VARCHAR(255),
    summary VARCHAR(10000)
);