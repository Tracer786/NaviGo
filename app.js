const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
}); //create a route

module.exports = app;