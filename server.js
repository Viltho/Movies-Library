'use strict';

//import the express framework
const express = require('express');

//import cors
const cors = require('cors');
const server = express();
const axios = require('axios');

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
server.get('/error', errorHandler);
server.get('*', pageNotFoundHandler);

//functions 
async function trending(req,res){
    let url = "https://api.themoviedb.org/3/trending/all/day?api_key=e693e677de5f501d0f33cbc824eda903";
    let axiosRes = await axios.get(url);
    res.json(axiosRes.data);
}
async function search(req,res){
    let url = "https://api.themoviedb.org/3/search/company?query=sony&api_key=e693e677de5f501d0f33cbc824eda903&page=1";
    let axiosRes = await axios.get(url);
    res.json(axiosRes.data);
}
async function people(req,res){
    let url = "https://api.themoviedb.org/3/person/2?api_key=e693e677de5f501d0f33cbc824eda903&language=en-US";
    let axiosRes = await axios.get(url);
    res.json(axiosRes.data);
}
async function genres(req,res){
    let url = "https://api.themoviedb.org/3/genre/movie/list?api_key=e693e677de5f501d0f33cbc824eda903&language=en-US";
    let axiosRes = await axios.get(url);
    res.json(axiosRes.data);
}

// function favoriteHandler(req, res) {
//     let meow = "Hello ya teacher you reached my favorite bage, don't worry nothing creepy here";
//     res.status(200).send(meow);
// }
function errorHandler(req, res) {
    let object = { "status": 500, "responseText": "Sorry, something went wrong" };
    res.status(500).json(object);
}
function pageNotFoundHandler(req, res) {
    let object = { "status": 404, "responseText": "Sorry, Page not found" };
    res.status(404).json(object);
}

// async function newMovieHandler(req, res) {
//     const url = "https://api.themoviedb.org/3/movie/76341?api_key=e693e677de5f501d0f33cbc824eda903";
//     // const url = "https://api.themoviedb.org/3/movie/550?api_key={e693e677de5f501d0f33cbc824eda903}&callback=test";
//     let axiosRes = await axios.get(url);
//     // JSON.stringify(axiosRes);
//     res.json(axiosRes.data);
// }

function Movie(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overiew = overview;
}

async function movieHandler(req, res) {
    const url = "https://api.themoviedb.org/3/movie/76341?api_key=e693e677de5f501d0f33cbc824eda903";
    let axiosRes = await axios.get(url);
    const answers = axiosRes.data;
    const movie = new Movie(
        answers.id,
        answers.title,
        answers.release_date,
        answers.poster_path,
        answers.overview
    );
    res.json(movie);
}