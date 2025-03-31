const mongoose = require('mongoose');

//create an object by name of fullname -> contains 2 entities
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            //adding the name filters
            minlength : [3,'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            // required : true
            minlength : [3,'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength : [5,'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required : true
    },
    socketId: {
        type : String,
    },
})