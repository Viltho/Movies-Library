DROP TABLE IF EXISTS favmovies;

CREATE TABLE IF NOT EXISTS favmovies (
    id SERIAL PRIMARY KEY,
    movie_title VARCHAR(255),
    release_date VARCHAR(255),
    poster_path VARCHAR(255),
    overview VARCHAR(10000),
    comment VARCHAR(10000)
);

-- DROP TABLE IF EXISTS crm;

-- CREATE TABLE IF NOT EXISTS crm (
--     id SERIAL PRIMARY KEY,
--     movie_title VARCHAR(255),
--     release_date VARCHAR(255),
--     poster_path VARCHAR(255),
--     overview VARCHAR(10000),
--     comment VARCHAR(10000)
-- );

DROP TABLE IF EXISTS clients;

CREATE TABLE IF NOT EXISTS clients (
    client_name NVARCHAR(10000) COLLATE Arabic_CI_AI_KS_WS,
    id INTEGER(10000)
);
