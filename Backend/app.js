const dotenv = require('dotenv');
dotenv.config();        //configure dotenv at top
const express = require('express');
const cors = require('cors');
const cookiesParser = require('cookie-parser');
const connectToDb = require('./db/db');
const app = express();
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

connectToDb();
app.use(cookiesParser()); //parse cookies

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
}); //create a route

app.use('/users', userRoutes);
app.use('/captains', captainRoutes); //use captain routes

module.exports = app;