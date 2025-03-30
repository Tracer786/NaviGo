const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

//create server
const server = http.createServer(app);

// server.listen(3000); //on which port to run the server

//if we don't want to use the fixed port and want env. variable to tell which port we are using
//install two more packages -> 'npm i dotenv cors'


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//listen on port, and make a callback to print on console whenever the server starts