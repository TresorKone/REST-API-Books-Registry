const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./src/routes/book');
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

// finding testUser for books creation
app.use((req, res, next) => {
    User.findById('63e25ebd89503390551ef19b')
        .then(user => {
            req.user = user;
            next();
        })
        .catch();
    }

);


/*
mongoConnect(() => {

    app.listen(5000);
})
 */

mongoose.connect(db_URI.URI)
    .then(r => {
        User.findOne()
            .then(user => {
               if (!user) {
                   const user = new User({
                       name: 'TestUser',
                       email: 'testUser@test.com',
                       books: {
                           bookId: []
                       }
                   });
                   user.save();
               }
            });

        app.listen(5000);
        console.log('connected')
    })
    .catch(err => {
        console.log(err);
    })

