'use strict';

//import the express framework
const express = require('express');

//import cors
const cors = require('cors');
const server = express();
const axios = require('axios');

require('dotenv').config();
const pg = require('pg');

server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);

client.connect().then(() => {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT} : I am ready`);
    })
})

//Routes
server.get('/', movieHandler);
server.get('/trending', trending);
server.get('/search', search);
server.get('/people', people);
server.get('/genres', genres);
server.get('/favMovie/:id', getFavMovieHandler);
server.post('/favMovie', addFavMovieHandler);
server.delete('/favMovie/:id', deleteFavMovieHandler);
server.put('/favMovie/:id', updateFavMovieHandler);
// server.get('/newMovieHandler', newMovieHandler);
// server.get('/favorite', favoriteHandler);
server.get('*', pageNotFoundHandler);
server.use(errorHandler);

//functions meow
function trending(req, res) {
    try {
        let API = process.env.API;
        let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API}`;
        axios.get(url)
            .then((result) => {
                let mapResult = result.data.results.map((item) => {
                    let movie = new Movie(item.id, item.title, item.release_date, item.poster_path, item.overview);
                    return movie;
                })
                res.json(mapResult);
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    }
    catch (error) { errorHandler(error, req, res); }
}

async function search(req, res) {
    try {
        let API = process.env.API;
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${API}&language=en-US&query=limitless&page=1`;
        axios.get(url)
            .then((result) => {
                let mapResult = result.data.results.map((item) => {
                    let movie = new Movie(item.id, item.title, item.release_date, item.poster_path, item.overview);
                    return movie;
                })
                res.json(mapResult);
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    }
    catch (error) { errorHandler(error, req, res); }
}

function people(req, res) {
    try {
        let API = process.env.API;
        let url = `https://api.themoviedb.org/3/person/2?api_key=${API}&language=en-US`;
        axios.get(url)
            .then((result) => {
                let mapResult = result.data;
                let person = new People(mapResult.name, mapResult.biography, mapResult.birthday, mapResult.place_of_birth);
                res.json(person);
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    }
    catch (error) { errorHandler(error, req, res); }
}

async function genres(req, res) {
    try {
        let API = process.env.API;
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API}&language=en-US`;
        let axiosRes = await axios.get(url);
        res.json(axiosRes.data);
    }
    catch (error) { errorHandler(error, req, res); }
}

// function favoriteHandler(req, res) {
//     let meow = "Hello ya teacher you reached my favorite bage, don't worry nothing creepy here";
//     res.status(200).send(meow);
// }

function pageNotFoundHandler(req, res) {
    let object = { "status": 404, "responseText": "Sorry, Page not found" };
    res.status(404).send(object);
}

function Movie(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overiew = overview;
}

function People(name, biography, birthday, place_of_birth) {
    this.name = name;
    this.biography = biography;
    this.birthday = birthday;
    this.place_of_birth = place_of_birth;
}

function movieHandler(req, res) {
    try {
        let API = process.env.API;
        const url = `https://api.themoviedb.org/3/movie/76341?api_key=${API}`;
        axios.get(url)
            .then((result) => {
                let mapResult = result.data;
                let movie = new Movie(mapResult.id, mapResult.title, mapResult.release_date, mapResult.poster_path, mapResult.overview);
                res.json(movie);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    }
    catch (error) { errorHandler(error, req, res); }
}

function deleteFavMovieHandler(req, res) {
    const id = req.params.id;
    const sql = `DELETE FROM favmovies WHERE id=${id};`;
    client.query(sql)
        .then((data) => {
            console.log("movie with id has been deleted");
            res.status(204).json({});
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
}

function updateFavMovieHandler(req, res) {
    const id = req.params.id;
    const sql = `UPDATE favmovies SET movie_title=$1, min=$2, summary= $3 WHERE id=${id} RETURNING *;`;
    const values = [req.body.movie_title, req.body.poster_path, req.body.comments];
    client.query(sql, values)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((error) => {
        errorHandler(error, req, res);
    })
}

function getFavMovieHandler(req, res) {
    const id = req.params.id;
    const sql = `SELECT * FROM favmovies WHERE id=${id};`;
    client.query(sql)
    .then((data) => {
        res.status(200).json(data.rows);
    })
    .catch((error) => {
        errorHandler(error, req, res);
    })
}

function addFavMovieHandler(req, res) {
    const movie = req.body;
    const sql = `INSERT INTO favmovies (movie_title, min, summary) VALUES ($1,$2,$3) RETURNING *;`
    const values = [movie.movie_title, movie.min, movie.summary];

    client.query(sql, values)
        .then((data) => {
            res.send("your movie was added !");
        })
        .catch(error => {
            console.log(error);
            // errorHandler(error, req, res);
        });
}

function errorHandler(error, req, res) {
    let object = {
        status: 500,
        responseText: error
    }
    res.status(500).send(object);
}
