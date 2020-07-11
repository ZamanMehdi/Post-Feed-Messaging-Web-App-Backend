const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRouters = require('./routers/feed');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRouters);

mongoose
    .connect(
        'mongodb+srv://ZamanMehdi:qazwsx74@cluster0.cjl3w.mongodb.net/Post-Feed-Web-App'
    )
    .then(result => {
        app.listen(8080);
        console.log('Connected');
    })
    .catch(error => {
        console.log(error);
    })