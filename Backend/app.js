const dotenv = require('dotenv');
dotenv.config();        //configure dotenv at top
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
}); //create a route

module.exports = app;