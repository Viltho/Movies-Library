DROP TABLE IF EXISTS favmovies;

CREATE TABLE IF NOT EXISTS favmovies (
    id SERIAL PRIMARY KEY,
    movie_title VARCHAR(255),
    poster_path VARCHAR(255),
    comments VARCHAR(10000)
);