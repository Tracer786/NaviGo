const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { userId, pickup, destination, vehicleType } = req.body;
        const ride = await rideService.createRide({ userId, pickup, destination, vehicleType });
        return res.status(201).json(ride);
    } catch (error) {
        console.error('Error creating ride:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};