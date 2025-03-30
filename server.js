const http = require('http');
const app = require('./app');

//create server
const server = http.createServer(app);

server.listen(3000); //on which port to run the server

//if we don't want to use the fixed port and want env. variable to tell which port we are using 
//install two more packages -> 'npm i dotenv cors'