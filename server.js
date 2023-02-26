'use strict';

//import the express framework
const express = require('express');

//import cors
const cors = require('cors');
const server = express();
const axios = require('axios');

require('dotenv').config();
//server open for all clients requests
server.use(cors());

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT} : I am ready`);
})

//Routes
server.get('/', movieHandler);
server.get('/trending', trending);
server.get('/search', search);
server.get('/people', people);
server.get('/genres', genres);
// server.get('/newMovieHandler', newMovieHandler);
// server.get('/favorite', favoriteHandler);
server.get('*', pageNotFoundHandler);
server.use(errorHandler);

//functions 
function trending(req, res) {
    try{
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
    catch(error){errorHandler(error, req, res);}
}
async function search(req, res) {
    let API = process.env.API;
    let url = `https://api.themoviedb.org/3/search/company?query=sony&api_key=${API}&page=1`;
    let axiosRes = await axios.get(url);
    res.json(axiosRes.data);
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
    catch (error){errorHandler(error, req, res);}
}

async function genres(req, res) {
    let API = process.env.API;
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API}&language=en-US`;
    let axiosRes = await axios.get(url);
    res.json(axiosRes.data);
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
    catch (error) {errorHandler(error, req, res);}
}

function errorHandler(error, req, res) {
    let object = {
        status: 500,
        responseText: error
    }
    res.status(500).send(object);
}