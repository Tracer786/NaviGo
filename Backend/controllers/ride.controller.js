const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');

// module.exports.createRide = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try {
//         const { userId, pickup, destination, vehicleType } = req.body;
//         const ride = await rideService.createRide({user :  req.user._id, pickup, destination, vehicleType });
//         // return res.status(201).json(ride);
//         res.status(201).json(ride);
//         const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
//         console.log('Pickup Coordinates:', pickupCoordinates);
//         const captainsInRadius = await mapService.getCaptainsInTheRadius()
//     } catch (error) {
//         console.error('Error creating ride:', error.message);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, vehicleType } = req.body;
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        // Get pickup coordinates and captains in radius BEFORE sending response
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log('Pickup Coordinates:', pickupCoordinates);

        // Example: 3km radius
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            // pickupCoordinates.latitude,
            // pickupCoordinates.longitude,
            5
        );
        ride.otp = ""

        const rideWithUser = await rideModel.findOne({_id : ride._id}).populate('user');

        // console.log('Captains in radius:', captainsInRadius);
        captainsInRadius.map(captain => {
            console.log('Captain and ride data : ',captain,ride)
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data : rideWithUser
            })
        })

        // Now send response
        res.status(201).json(ride);
    } catch (error) {
        console.error('Error creating ride:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error('Error fetching fare:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId } = req.body;
        const ride = await rideService.confirmRide(rideId, req.captain._id);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        console.error('Error confirming ride:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};