const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
}

//created a user model and acquired it in user.controller