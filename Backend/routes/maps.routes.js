const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const {query} = require('express-validator');

router.get('/get-coordinates',
    // query('address').notEmpty().withMessage('Address is required'), // Validate address parameter
    // query('address').isString().withMessage('Address must be a string'), // Validate address type
    // query('address').isLength({ min: 3, max: 100 }).withMessage('Address must be between 3 and 100 characters'), // Validate address length
    query('address').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Address must be a string and between 3 and 100 characters'), // Validate address type and length
    authMiddleware.authUser,mapController.getCoordinates); // Get coordinates for a given address

router.get('/get-distance-time',
    // query('origin').notEmpty().withMessage('Origin is required'), // Validate origin parameter
    // query('destination').notEmpty().withMessage('Destination is required'), // Validate destination parameter
    // query('origin').isString().withMessage('Origin must be a string'), // Validate origin type
    // query('destination').isString().withMessage('Destination must be a string'), // Validate destination type
    // query('origin').isLength({ min: 3, max: 100 }).withMessage('Origin must be between 3 and 100 characters'), // Validate origin length
    // query('destination').isLength({ min: 3, max: 100 }).withMessage('Destination must be between 3 and 100 characters'), // Validate destination length
    query('origin').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Origin must be a string and between 3 and 100 characters'), // Validate origin type and length
    query('destination').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Destination must be a string and between 3 and 100 characters'), // Validate destination type and length
    authMiddleware.authUser, 
    mapController.getDistanceAndTime // Get distance and time between two locations
)

router.get('/get-suggestions',
    query('input').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Input must be a string and between 3 and 100 characters'), // Validate input type and length
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions // Get address suggestions based on user input
)

    
module.exports = router;