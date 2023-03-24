// 'use strict';

// //import the express framework
// const express = require('express');

// //import cors
// const cors = require('cors');
// const server = express();
// const axios = require('axios');

// require('dotenv').config();
// const pg = require('pg');

// server.use(cors());
// server.use(express.json());

// const PORT = process.env.PORT || 3003;
// const client = new pg.Client(process.env.DATABASE_URL);

// client.connect().then(() => {
//     server.listen(PORT, () => {
//         console.log(`listening on ${PORT} : I am ready`);
//     })
// })

// //Routes
// server.get('/', movieHandler);
// server.get('/trending', trending);
// server.get('/movies', movie);
// server.get('/search', search);
// server.get('/people', people);
// server.get('/genres', genres);
// server.get('/favMovie', getFavHandler);
// server.get('/addCustomer', getCustomerHandler);
// server.post('/addCustomer', addCustomerHandler);
// server.put('/addCustomer/:id', updateCustomerHandler);
// server.delete('/addCustomer/:id', deleteCustomersHandler);
// server.get('/favMovie/:id', getFavMovieHandler);
// server.post('/addFavourite', addFavMovieHandler);
// server.put('/favMovie/:id', updateFavMovieHandler);
// server.delete('/favMovie/:id', deleteFavMovieHandler);
// // server.get('/newMovieHandler', newMovieHandler);
// server.get('/favorite', favoriteHandler);
// server.get('*', pageNotFoundHandler);
// server.use(errorHandler);

// //functions meow
// function movie(req, res) {
//     try {
//         let API = process.env.API;
//         let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API}&language=en-US&page=1`;
//         axios.get(url)
//             .then((result) => {
//                 let mapResult = result.data.results.map((item) => {
//                     let movie = new Movie(item.id, item.title, item.release_date, item.poster_path, item.overview);
//                     return movie;
//                 })
//                 res.json(mapResult);
//             })
//             .catch((error) => {
//                 res.status(500).send(error);
//             })
//     }
//     catch (error) { errorHandler(error, req, res); }
// }

// function trending(req, res) {
//     try {
//         let API = process.env.API;
//         let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API}`;
//         axios.get(url)
//             .then((result) => {
//                 let mapResult = result.data.results.map((item) => {
//                     let movie = new Movie(item.id, item.title, item.release_date, item.poster_path, item.overview);
//                     return movie;
//                 })
//                 res.json(mapResult);
//             })
//             .catch((error) => {
//                 res.status(500).send(error);
//             })
//     }
//     catch (error) { errorHandler(error, req, res); }
// }

// async function search(req, res) {
//     try {
//         let API = process.env.API;
//         let url = `https://api.themoviedb.org/3/search/movie?api_key=${API}&language=en-US&query=limitless&page=1`;
//         axios.get(url)
//             .then((result) => {
//                 let mapResult = result.data.results.map((item) => {
//                     let movie = new Movie(item.id, item.title, item.release_date, item.poster_path, item.overview);
//                     return movie;
//                 })
//                 res.json(mapResult);
//             })
//             .catch((error) => {
//                 res.status(500).send(error);
//             })
//     }
//     catch (error) { errorHandler(error, req, res); }
// }

// function people(req, res) {
//     try {
//         let API = process.env.API;
//         let url = `https://api.themoviedb.org/3/person/2?api_key=${API}&language=en-US`;
//         axios.get(url)
//             .then((result) => {
//                 let mapResult = result.data;
//                 let person = new People(mapResult.name, mapResult.biography, mapResult.birthday, mapResult.place_of_birth);
//                 res.json(person);
//             })
//             .catch((error) => {
//                 res.status(500).send(error);
//             })
//     }
//     catch (error) { errorHandler(error, req, res); }
// }

// async function genres(req, res) {
//     try {
//         let API = process.env.API;
//         let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API}&language=en-US`;
//         let axiosRes = await axios.get(url);
//         res.json(axiosRes.data);
//     }
//     catch (error) { errorHandler(error, req, res); }
// }

// function favoriteHandler(req, res) {
//     let API = process.env.API;
//     const url = `https://api.themoviedb.org/3/movie/76341?api_key=${API}`;
//     axios.get(url)
//         .then((result) => {
//             let mapResult = result.data;
//             let movie = new Movie(mapResult.id, mapResult.title, mapResult.release_date, mapResult.poster_path, mapResult.overview);
//             res.json(movie);
//         })
//         .catch((error) => {
//             res.status(500).json(error);
//         })
// }

// function pageNotFoundHandler(req, res) {
//     let object = { "status": 404, "responseText": "Sorry, Page not found" };
//     res.status(404).send(object);
// }

// function Movie(id, title, release_date, poster_path, overview) {
//     this.id = id;
//     this.title = title;
//     this.release_date = release_date;
//     this.poster_path = poster_path;
//     this.overview = overview;
// }

// function People(name, biography, birthday, place_of_birth) {
//     this.name = name;
//     this.biography = biography;
//     this.birthday = birthday;
//     this.place_of_birth = place_of_birth;
// }

// function getFavHandler(req, res) {
//     const sql = `SELECT * FROM favmovies;`;
//     client.query(sql)
//         .then((data) => {
//             res.status(200).json(data.rows);
//         })
//         .catch((error) => {
//             errorHandler(error, req, res);
//         })
// }

// function movieHandler(req, res) {
//     try {
//         let API = process.env.API;
//         const url = `https://api.themoviedb.org/3/movie/76341?api_key=${API}`;
//         axios.get(url)
//             .then((result) => {
//                 let mapResult = result.data;
//                 let movie = new Movie(mapResult.id, mapResult.title, mapResult.release_date, mapResult.poster_path, mapResult.overview);
//                 res.json(movie);
//             })
//             .catch((error) => {
//                 res.status(500).json(error);
//             })
//     }
//     catch (error) { errorHandler(error, req, res); }
// }

// function deleteFavMovieHandler(req, res) {
//     const id = req.params.id;
//     const sql = `DELETE FROM favmovies WHERE id=${id} RETURNING *;`;
//     client.query(sql)
//         .then((data) => {
//             const sql = `SELECT * FROM favmovies`;
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

// function updateFavMovieHandler(req, res) {
//     const id = req.params.id;
//     const movie = req.body;
//     const sql = `UPDATE favmovies SET comment =$1 WHERE id =${id} RETURNING *;`;
//     const values = [movie.comment];
//     client.query(sql, values)
//         .then((data) => {
//             const sql = `SELECT * FROM favmovies`;
//             client.query(sql)
//                 .then((data) => {
//                     res.status(200).json(data.rows);
//                 })
//                 .catch((error) => {
//                     errorHandler(error, req, res);
//                 })
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// function getFavMovieHandler(req, res) {
//     const id = req.params.id;
//     const sql = `SELECT * FROM favmovies WHERE id=${id};`;
//     client.query(sql)
//         .then((data) => {
//             res.status(200).json(data.rows);
//         })
//         .catch((error) => {
//             errorHandler(error, req, res);
//         })
// }

// function updateCustomerHandler(req, res) {
//     const id = req.params.id;
//     const clients = req.body;
//     const sql = `UPDATE clients SET client_name=$1, client_code=$2 WHERE id =${id} RETURNING *;`;
//     const values = [clients.client_name, clients.client_code];
//     client.query(sql, values)
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
//         .catch(error => {
//             console.log(error);
//         });
// }

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

// function getCustomerHandler(req, res) {
//     const sql = `SELECT * FROM clients;`;
//     client.query(sql)
//         .then((data) => {
//             res.status(200).json(data.rows);
//         })
//         .catch((error) => {
//             errorHandler(error, req, res);
//         })
// }

// function addFavMovieHandler(req, res) {
//     const clients = req.body;
//     const sql = `INSERT INTO favmovies (title, release_date, poster_path, overview, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
//     const values = [clients.title, clients.release_date, clients.poster_path, clients.overview, clients.comment];
//     client.query(sql, values)
//         .then((data) => {
//             const sql = `SELECT * FROM favmovies;`;
//             client.query(sql)
//                 .then((data) => {
//                     res.status(200).json(data.rows);
//                 })
//                 .catch((error) => {
//                     errorHandler(error, req, res);
//                 })
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// function addCustomerHandler(req, res) {
//     const clients = req.body;
//     const sql = `INSERT INTO clients (client_name, client_code) VALUES ($1, $2) RETURNING *;`
//     const values = [clients.client_name, clients.client_code];
//     client.query(sql, values)
//         .then((data) => {
//             const sql = `SELECT * FROM clients;`;
//             client.query(sql)
//                 .then((data) => {
//                     res.status(200).json(data.rows);
//                 })
//                 .catch((error) => {
//                     errorHandler(error, req, res);
//                 })
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// function errorHandler(error, req, res) {
//     let object = {
//         status: 500,
//         responseText: error
//     }
//     res.status(500).send(object);
// }

'use strict';

//import the express framework
const express = require('express');
//import cors
const cors = require('cors');
//import axios
const axios = require('axios');
//Database - > importing the pg 
const pg = require('pg');

var bodyParser = require('body-parser')
const server = express();

//server open for all clients requests
server.use(cors());

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())


// Load the environment variables into your Node.js
require('dotenv').config();

//Set Port Number
const PORT = process.env.PORT || 5500;
//create obj from Client
const client = new pg.Client(process.env.DATABASE_URL);


// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())

//Routes
server.get('/', startHandler)
server.get('/home', homeHandler)

server.get('/getUserPosts/:id', getUserPostsHandler)
server.get('/getPostById/:id', getPostByIdHandler)

server.post('/addUsers', addUsersHandler)
server.get('/getUsers', getUsersHandler)
server.get('/getUsers/:id', getUsersByEmailHandler)
server.post('/addPost', savePostHandler)
server.get('/getAllPosts', getAllPostsHandler)

// Functions Handlers

function startHandler(req, res) {
    res.send("Hello from the Start route");
}

function homeHandler(req, res) {
    res.send("Hello from the home route");
}

function addUsersHandler(req, res) {
    const user = req.body;
    const sql = `INSERT INTO Users (userFullName, email, imageURL, bio) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [user.userFullName, user.email, user.imageURL, user.bio];
    client.query(sql, values)
        .then((data) => {
            res.send(data.rows);
        })
        .catch(error => {
            res.send('error');
        });
}

function getUsersHandler(req, res) {
    const sql = `SELECT * FROM Users;`
    client.query(sql)
        .then((data) => {
            res.send(data.rows);
        })
        .catch(error => {
            res.send('error');
        });
}
function getUsersByEmailHandler(req, res) {
    const email = req.params.email;
    const sql = `SELECT * FROM Users WHERE email=${email} RETURNING *;`
    client.query(sql)
        .then((data) => {
            res.send(data.rows);
        })
        .catch(error => {
            res.send('error');
        });
}

function savePostHandler(req, res) {
    const Post = req.body;
    const sql = `INSERT INTO Posts (userId, title, content,imageURL) VALUES ($1, $2, $3,$4) RETURNING *;`
    const values = [Post.userId, Post.title, Post.content, Post.imageURL];
    client.query(sql, values)
        .then((data) => {
            res.send("your data was added !");
        })
        .catch(error => {
            // console.log(error);
            errorHandler(error, req, res);
        });
}

// (GET) /getAllPosts: get list of all blog posts created by all users. (Database Join between Posts and User )
//  (postId ,userId ,imageURL ,title ,content ,numberOfLikes,Created_at , userFullName , imageURL AS userImageURL) sorted by created_at
function getAllPostsHandler(req, res) {
    const sql = 'SELECT Posts.postId ,Users.userId ,Users.userFullName, Users.imageURL , Posts.postId  , Posts.imageURL , Posts.title , Posts.content  , Posts.numberOfLikes , Posts.Created_at  FROM Users INNER JOIN Posts ON Users.userId=Posts.userId  ORDER BY Created_at DESC ;'
    client.query(sql)
        .then((data) => {
            res.send(data.rows);
        })
        .catch(error => {
            res.send('error');
        });
}


function getUserPostsHandler(req, res) {
    const id = req.params.id;
    const sql = `SELECT Users.userId ,
                        Posts.postId ,
                        Users.userFullName ,
                        Users.imageURL AS userImageURL ,
                        Posts.imageURL,
                        Posts.title ,
                        Posts.content ,
                        Posts.numberOfLikes ,
                        Posts.Created_at 
                FROM Posts
                INNER JOIN Users ON Posts.userId =Users.userId 
                WHERE Posts.userId=${id}
                ORDER BY Posts.Created_at DESC;`;

    client.query(sql)
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            errorHandler(err, req, res);
        })
}

function getPostByIdHandler(req, res) {
    const id = req.params.id;
    const sql = `SELECT Users.userId ,
                        Posts.postId ,
                        Users.userFullName ,
                        Users.imageURL AS userImageURL ,
                        Posts.imageURL,
                        Posts.title ,
                        Posts.content ,
                        Posts.numberOfLikes ,
                        Posts.Created_at  
                FROM Posts 
                INNER JOIN Users ON Posts.userId = Users.userId
                WHERE postId=${id}`;
    client.query(sql)
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            errorHandler(err, req, res);
        })

}


// 404 errors
server.get('*', (req, res) => {
    const errorObj = {
        status: 404,
        responseText: 'Sorry, page not found'
    }
    res.status(404).send(errorObj);
})


//middleware function
function errorHandler(err, req, res) {
    const errorObj = {
        status: 500,
        massage: err
    }
    res.status(500).send(errorObj);
}

// server errors
server.use(errorHandler)


//connect the server with Blogify database
// http://localhost:3000 => (Ip = localhost) (port = 3000)
client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`listening on ${PORT} : I am ready`);
        });
    })
