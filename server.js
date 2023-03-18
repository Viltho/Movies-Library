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

const PORT = process.env.PORT || 3003;
const client = new pg.Client(process.env.DATABASE_URL);

client.connect().then(() => {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT} : I am ready`);
    })
})

//Routes
server.get('/', movieHandler);
server.get('/trending', trending);
server.get('/movies', movie);
server.get('/search', search);
server.get('/people', people);
server.get('/genres', genres);
server.get('/favMovie', getFavHandler);
server.get('/addCustomer', getCustomerHandler);
server.post('/addCustomer', addCustomerHandler);
server.put('/addCustomer/:id', updateCustomerHandler);
server.delete('/addCustomer/:id', deleteCustomersHandler);
server.get('/favMovie/:id', getFavMovieHandler);
server.post('/addFavourite', addFavMovieHandler);
server.put('/favMovie/:id', updateFavMovieHandler);
server.delete('/favMovie/:id', deleteFavMovieHandler);
// server.get('/newMovieHandler', newMovieHandler);
server.get('/favorite', favoriteHandler);
server.get('*', pageNotFoundHandler);
server.use(errorHandler);

//functions meow
function movie(req, res) {
    try {
        let API = process.env.API;
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API}&language=en-US&page=1`;
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

function favoriteHandler(req, res) {
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

function pageNotFoundHandler(req, res) {
    let object = { "status": 404, "responseText": "Sorry, Page not found" };
    res.status(404).send(object);
}

function Movie(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

function People(name, biography, birthday, place_of_birth) {
    this.name = name;
    this.biography = biography;
    this.birthday = birthday;
    this.place_of_birth = place_of_birth;
}

function getFavHandler(req, res) {
    const sql = `SELECT * FROM favmovies;`;
    client.query(sql)
        .then((data) => {
            res.status(200).json(data.rows);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
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
    const sql = `DELETE FROM favmovies WHERE id=${id} RETURNING *;`;
    client.query(sql)
        .then((data) => {
            const sql = `SELECT * FROM favmovies`;
            client.query(sql)
                .then((data) => {
                    res.status(200).json(data.rows);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                })
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
}

function updateFavMovieHandler(req, res) {
    const id = req.params.id;
    const movie = req.body;
    const sql = `UPDATE favmovies SET comment =$1 WHERE id =${id} RETURNING *;`;
    const values = [movie.comment];
    client.query(sql, values)
        .then((data) => {
            const sql = `SELECT * FROM favmovies`;
            client.query(sql)
                .then((data) => {
                    res.status(200).json(data.rows);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                })
        })
        .catch(error => {
            console.log(error);
        });
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

function updateCustomerHandler(req, res) {
    const id = req.params.id;
    const clients = req.body;
    const sql = `UPDATE favmovies SET client_name=$1, client_code=$2 WHERE id =${id} RETURNING *;`;
    const values = [clients.client_name, clients.client_code];
    client.query(sql, values)
        .then((data) => {
            const sql = `SELECT * FROM favmovies`;
            client.query(sql)
                .then((data) => {
                    res.status(200).json(data.rows);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                })
        })
        .catch(error => {
            console.log(error);
        });
}

// function deleteCustomersHandler(req, res) {
//     const id = req.params.id;
//     const sql = `DELETE FROM clients WHERE id=${id} RETURNING *;`;
//     client.query(sql)
//         .then((data) => {
//             const sql = `SELECT * FROM clients`;
//             client.query(sql)
//                 .then((data) => {
//                     res.status(200).json(data.rows);
//                 })
//                 .catch((error) => {
//                     errorHandler(error, req, res);
//                 })
//         })
//         .catch((error) => {
//             errorHandler(error, req, res);
//         })
// }

function getCustomerHandler(req, res) {
    const sql = `SELECT * FROM clients;`;
    client.query(sql)
        .then((data) => {
            res.status(200).json(data.rows);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
}

function addCustomerHandler(req, res) {
    const clients = req.body;
    const sql = `INSERT INTO clients (client_name, client_code) VALUES ($1, $2) RETURNING *;`
    const values = [clients.client_name, clients.client_code];
    client.query(sql, values)
        .then((data) => {
            const sql = `SELECT * FROM clients;`;
            client.query(sql)
                .then((data) => {
                    res.status(200).json(data.rows);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                })
        })
        .catch(error => {
            console.log(error);
        });
}

function errorHandler(error, req, res) {
    let object = {
        status: 500,
        responseText: error
    }
    res.status(500).send(object);
}
