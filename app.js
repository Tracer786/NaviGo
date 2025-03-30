const dotenv = require('dotenv');
dotenv.config();        //configure dotenv at top
const express = require('express');
const cors = require('cors');
app.use(cors());
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
}); //create a route

module.exports = app;