const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./src/routes/book');
const userRoutes = require('./src/routes/auth');
const db_URI = require('./src/config/db_URI');
const User = require('./src/models/user');
//const { mongoConnect } = require('./src/config/database')

const app = express();

app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/book', bookRoutes);
app.use('/auth', userRoutes);


mongoose.connect(db_URI.URI)
    .then(r => {
        app.listen(5000);
        console.log('connected')
    })
    .catch(err => {
        console.log(err);
    })

