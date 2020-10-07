// importing required packages
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors');

// importing required local files
const config = require('./config');

// global storing project path
global.appRoot = path.resolve(__dirname);

// Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express()

// init/connect mongodb
require('./app/utils').db(mongoose);

// enable CORS 
app.use(cors())

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property. Limited to 50mb for both form data and json
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

// handles all api 
app.use('/api', require('./app/router/api'));

app.get('/', (req, res)=>{
    return res.send('App running')
})

// app listening to port 8080
app.listen(8000, () => console.log(`Listening on port 3000!`));
