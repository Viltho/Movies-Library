-- DROP TABLE IF EXISTS favmovies;

-- CREATE TABLE IF NOT EXISTS favmovies (
--     id SERIAL PRIMARY KEY,
--     movie_title VARCHAR(255),
--     release_date VARCHAR(255),
--     poster_path VARCHAR(255),
--     overview VARCHAR(10000),
--     comment VARCHAR(10000)
-- );

-- DROP TABLE IF EXISTS clients;

-- CREATE TABLE IF NOT EXISTS clients (
--     id SERIAL PRIMARY KEY,
--     client_name NVARCHAR(10000) COLLATE Arabic_CI_AI_KS_WS,
--     client_code INTEGER(10000)
-- );

DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users (
    userId SERIAL,
    userFullName VARCHAR(255) NOT NULL,
    dateOfBirth DATE,
    email VARCHAR(255) NOT NULL,
    imageURL VARCHAR(255) ,
    bio TEXT,
    PRIMARY KEY(userId)
);

DROP TABLE IF EXISTS Posts;

CREATE TABLE IF NOT EXISTS Posts(
    postId SERIAL ,
    userId SERIAL NOT NULL,
    imageURL VARCHAR(255) ,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    numberOfLikes int NOT NULL DEFAULT 0,
    Created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY(postId),
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES Users(userId)
);

nes (11 sloc)  395 Bytes

DROP TABLE IF EXISTS Comments;

CREATE TABLE IF NOT EXISTS Comments(
    commentId SERIAL ,
    postId SERIAL NOT NULL,
    userId SERIAL NOT NULL,
    Content  TEXT NOT NULL,
    Created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY(commentId ),
    CONSTRAINT fk_post FOREIGN KEY(postId) REFERENCES Posts(postId),
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES Users(userId)
);
