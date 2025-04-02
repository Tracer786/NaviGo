const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //else -> if everything is input correct
    const { firstname, lastname, email, password } = req.body;

    //and we don't store the password directly in DB
    //will hash the password before storing it
    const hashedPassword = await userModel.hashPassword(password);


    //register user
    
}

//created a user model and acquired it in user.controller