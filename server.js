
const express = require('express');
const serverless = require ('serverless-http')

const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
//const PORT = process.env.PORT || 3000

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({ extended: false })); // change to false
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// set view engine
app.set("view engine", "ejs")


// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))


app.listen(process.env.PORT || 3000, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

