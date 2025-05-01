const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {

    // Validate the request parameters using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { address } = req.query; // Get the address from the query parameters

        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }

        const coordinates = await mapsService.getAddressCoordinate(address);

        return res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        // return res.status(500).json({ message: 'Internal server error' });
        return res.status(404).json({ message: 'Co-ordinates not found' });
    }
}

module.exports.getDistanceAndTime = async (req, res) => {
    // Validate the request parameters using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { origin, destination } = req.query; // Get the origin and destination from the query parameters

        if (!origin || !destination) {
            return res.status(400).json({ message: 'Origin and destination are required' });
        }

        const distanceAndTime = await mapsService.getDistanceAndTime(origin, destination);

        return res.status(200).json(distanceAndTime);
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        // return res.status(500).json({ message: 'Internal server error' });
        return res.status(404).json({ message: 'Distance and time not found' });
    }
}