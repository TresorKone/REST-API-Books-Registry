const express = require('express');
const bodyParser = require('body-parser');

const bookRoutes = require('./src/routes/book');
const { mongoConnect } = require('./src/config/database')

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

mongoConnect(() => {

    app.listen(5000);
})

