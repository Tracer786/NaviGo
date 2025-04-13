const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const { validationResult } = require('express-validator');
const blackListTokenModel =require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    //else -> if everything is input correct
    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    //check if user already exists
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    //and we don't store the password directly in DB
    //will hash the password before storing it
    const hashedPassword = await userModel.hashPassword(password);

    //register user
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

}

//created a user model and acquired it in user.controller

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;  //get email and password from request body
    //find user by email
    // const user = await userService.findUserByEmail(email);
    const user = await userModel.findOne({ email }).select('+password'); //select password field as well

    //if user not found
    if (!user) {
        // return res.status(404).json({ message: 'User not found' });
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    //compare password
    // const isMatch = await userModel.comparePassword(password, user.password);
    const isMatch = await user.comparePassword(password); //compare password with hashed password

    //if password doesn't match
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    //generate token
    const token = user.generateAuthToken();
    res.cookie('token', token); //set token in cookies 
        

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
    // console.log(req.user); //log user object
    res.status(200).json(req.user); //send user object as response
}

// module.exports.logoutUser = async (req, res, next) => {
//     res.clearCookie('token'); //clear token from cookies
//     const token = req.cookies.token || req.headers.authorization.split(' ')[1]; //get token from cookies or headers
//     await blackListTokenModel.create({ token }); //add token to blacklist
//     //token is added to blacklist so that it can't be used again
//     res.status(200).json({ message: 'Logged out successfully' });
// }

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token'); // Clear token from cookies
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]; // Get token from cookies or headers

    // Check if the token already exists in the blacklist
    const isTokenBlacklisted = await blackListTokenModel.findOne({ token });
    if (!isTokenBlacklisted) {
        await blackListTokenModel.create({ token }); // Add token to blacklist
    }

    res.status(200).json({ message: 'Logged out successfully' });
};