const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    //check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: "Captain already exists" });
    }
    //create captain

    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });
    //generate token for captain
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //get email and password from request body
    //find captain by email
    const captain = await captainModel.findOne({ email }).select("+password"); //select password field as well

    //if captain not found
    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    //compare password
    const isMatch = await captain.comparePassword(password); //compare password with hashed password

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    //if email and password are correct
    const token = captain.generateAuthToken(); //generate token for captain
    res.cookie('token', token,); //set token in cookie

    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res) => {
    const captain = req.captain; //get captain from request object
    res.status(200).json({ captain });
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; //get token from cookies or headers
    //add token to blacklist
    await blacklistTokenModel.create({ token });
    res.clearCookie('token'); //clear cookie
    res.status(200).json({ message: "Logged out successfully" });
}
