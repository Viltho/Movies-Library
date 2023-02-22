'use strict';

//import the express framework
const express = require('express');

//import cors
const cors = require('cors');
const server = express();

//server open for all clients requests
server.use(cors());

const PORT = 3000;

//Routes
//home route
function Movie(title, poster_path,overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overiew = overview;
}
 
server.get('/',(req,res)=>{
    const answers = require('./moviedata/data.json');
    const movie = new Movie(
        answers.title,
        answers.poster_path,
        answers.overview
    );
    res.json(movie);
})

// http://localhost:3000/test
//default route

server.get('/favorite',(req,res)=>{
    let meow = "Hello ya teacher you reached my favorite bage, don't worry nothing creepy here";
    res.status(200).send(meow);
})

server.get('/error', errorHandler)

function errorHandler(req,res){
    let object = {"status": 500, "responseText": "Sorry, something went wrong"};
    res.status(500).json(object);
}

server.get('*',(req,res)=>{
    let object = {"status": 404, "responseText": "Sorry, Page not found"};
    res.status(404).json(object);
})

// http://localhost:3000 => (Ip = localhost) (port = 3000)
server.listen(PORT, () =>{
    console.log(`listening on ${PORT} : I am ready`);
})