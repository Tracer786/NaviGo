const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create middleware
moudule.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]; //get token from cookies or headers
    //if token is not present in cookies or headers
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    //decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token using secret key
        const user = await userModel.findById(decoded.id); //find user by id in token
        //if is added by me -> EXTRA
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user; //set user in request object
        return next(); //call next middleware
    }
}