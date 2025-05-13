const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const rideController = require('../controllers/ride.controller');

//creating a ride for user
router.post('/create',
    body('userId').isString().isLength({min: 24,max: 24}).notEmpty().withMessage('Invalid user ID'), // Validate userID type and length
    body('pickup').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Invalid pickup address'), // Validate pickup type and length
    body('destination').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Invalid destination address'), // Validate destination type and length
    body('vehicleType').isString().isIn(['auto', 'motorcycle', 'car']).notEmpty().withMessage('Invalid vehicle type'), // Validate vehicle type
    rideController.createRide
)

module.exports = router;