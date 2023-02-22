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
    res.send(`${answers.title}<\n>${answers.poster_path}\n${answers.overview}`);
})

// http://localhost:3000/test
//default route

server.get('/favorite',(req,res)=>{
    let meow = "Hello ya teacher you reached my favorite bage, don't worry nothing creepy here";
    res.status(200).send(meow);
})

server.get('*',(req,res)=>{
    res.status(404).send("Hello ya teacher you reached a wrong bage, go back ples");
})

server.get('*',(req,res)=>{
    let str = "Hello m3allem you server is bad";
    res.status(500).send(str);
})



// http://localhost:3000 => (Ip = localhost) (port = 3000)
server.listen(PORT, () =>{
    console.log(`listening on ${PORT} : I am ready`);
})