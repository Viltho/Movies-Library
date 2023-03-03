# Movies Library - Project Version: v1.0.0

**Author Name**: Abdullah Abu Hamad

## WRRC

! [meow](./Image.jpg)

## Overview:

Today will be the beginning of a multi-lab project, where i will build a movie app that can check the latest movies based on categories.

This week, i will build the server and the database for my project.

## Getting Started:

- create repo with name and with .gitignore (node)
- clone on local machine (using ubuntu) and install express cors
- open vscode, and create server.js file and moviedata folder with data.json
- use require to assign variables of express, server such as const server = express(); and server.use(cors()); and declare port number as a variable
- assign a constructor for movie library
- declare server.get for home/favorite/error404/error500
- assign welcome message when server starts with server.listen

## Project Features:

- data info for the movie Spiderman: far from home on main page **removed
- favorite page message **removed
- page not found error page
- internal server error page

## Links- added the following:

- if you go to home or / a movie with the name of Mad Max and its info will appear
- if you go to /trending you will see a page of 20 items for the trending movies in all countries.
- if you go to /search it will display the search functionality working on the website using query and how many pages required.
- if you go to /people and you have an id for the searched person the results will be an overiew for his background.
- if you go to /genres it will display all aailable genres on the website so you can use them in the future for the search functionality.

## Lab 13:

- Added favMovie for get and post to import and export data from local Database

# Lab 14:

- Added delete and update functions