const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRouters = require('./routers/feed');
const { error } = require('console');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRouters);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message })
})

mongoose
    .connect(
        'mongodb+srv://ZamanMehdi:qazwsx74@cluster0.cjl3w.mongodb.net/Post-Feed-Web-App?retryWrites=true'
    )
    .then(result => {
        app.listen(8080);
        console.log('Connected');
    })
    .catch(error => {
        console.log(error);
    })