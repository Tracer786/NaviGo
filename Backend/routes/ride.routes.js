const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

//creating a ride for user
router.post('/create',
    body('userId').isString().isLength({min: 24,max: 24}).notEmpty().withMessage('Invalid user ID'), // Validate userID type and length
    body('pickup').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Invalid pickup address'), // Validate pickup type and length
    body('destination').isString().isLength({min: 3,max: 100}).notEmpty().withMessage('Invalid destination address'), // Validate destination type and length
)

module.exports = router;