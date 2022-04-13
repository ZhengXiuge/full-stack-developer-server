/*
The following server.js implements an HTTP server that responds Hello World! when the server receives an HTTP request to http://localhost:4000/hello.
 */
// const express = require('express'); // The require function is equivalent to the import keyword and loads a library into the local source.
import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import helloController from "./controllers/hello-controller.js";
import userController from "./controllers/user-controller.js";
import tuitsController from "./controllers/tuits-controller.js";    // load the mongoose library
const app = express(); //  The express() function call creates an instance of the express library and assigns it to local variable app.

/*
CORS stands for Cross Origin Resource Sharing and establishes the rules by which resources can be
shared across domains (origins). Configure CORS in server.js by importing it and using it as the first middleware.
 */
app.use(cors());

/*
A request to URL http://localhost:4000/hello triggers the function implemented as the second argument
of app.get(). The handler function receives parameters req and res which allows the function to
participate in the request / response interaction common in client / server applications.
The res.send() function responds to the request with the text Hello World!
 */
// app.get('/hello', (req, res) => {res.send('Life if good!')}) // The app.get() function declares an HTTP handler by mapping the URL pattern '/hello' to a function that handles HTTP request.
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

/*
Out of the box express does not know how to extract data from an HTTP body. Express defines a JSON
middleware to parse data from the body that can be registered as a middleware. All requests will first
go through this middleware parsing HTTP body into a JSON object added to the request object in a new
body property that later HTTP handlers can access.
 */
app.use(express.json()); // parse JSON from HTTP request body

helloController(app);
userController(app);
tuitsController(app);

/*
We're going to host our Node HTTP server on Heroku and we can't use port 4000 when running on Heroku.
Instead Heroku declares the proper port to use in an environment variable called PORT available from
Node using process.env.PORT. Refactor server.js so that it uses the PORT environment variable if available on Heroku, or uses 4000 otherwise when running locally on our machines.
 */
app.listen(process.env.PORT || 4000);
// app.listen(4000);

/*
To connect to the database server programmatically, import the Mongoose library and then use the
connect function as shown below.
 */

// mongoose.connect('mongodb://localhost:27017/webdev');       // connect to the webdev database
// mongoose.connect('mongodb+srv://zhenghelen:supersecretpassword@cluster0.4wczs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
                          || 'mongodb://localhost:27017/webdev'
// console.log(CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING);
