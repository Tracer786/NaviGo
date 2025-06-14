const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

//creating a ride for user
router.post('/create',
    authMiddleware.authUser, // Middleware to check if user is authenticated
    body('pickup').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Invalid pickup address'), // Validate pickup type and length
    body('destination').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Invalid destination address'), // Validate destination type and length
    body('vehicleType').isString().isIn(['auto', 'motorcycle', 'car']).notEmpty().withMessage('Invalid vehicle type'), // Validate vehicle type
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Invalid pickup address'), // Validate pickup type and length
    query('destination').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Invalid destination address'), // Validate destination type and length
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain, // Middleware to check if captain is authenticated
    body('rideId').isMongoId().withMessage('Invalid ride ID'), // Validate ride ID
    // body('otp').isString().isLength({min: 4, max: 4}).notEmpty().withMessage('Invalid OTP'), // Validate OTP
    rideController.confirmRide
)

module.exports = router;