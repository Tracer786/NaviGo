const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await mapService.getDistanceAndTime(pickup, destination);

  const baseFare = {
    auto: 30,
    motorcycle: 20,
    car: 50,
  };

  const perKmRate = {
    auto: 15,
    motorcycle: 12,
    car: 20,
  };

  const perMinuteRate = {
    auto: 2,
    motorcycle: 1.5,
    car: 3,
  };

  const fare = {
    auto:
      baseFare.auto +
      distanceTime.distance * perKmRate.auto +
      distanceTime.time * perMinuteRate.auto,
    motorcycle:
      baseFare.motorcycle +
      distanceTime.distance * perKmRate.motorcycle +
      distanceTime.time * perMinuteRate.motorcycle,
    car:
      baseFare.car +
      distanceTime.distance * perKmRate.car +
      distanceTime.time * perMinuteRate.car,
  };

  return fare;
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination, and vehicle type are required');
    }

    const fare = await getFare(pickup, destination);
    const ride = rideModel.create({
        user, pickup, destination, fare : fare[vehicleType]
    })
    return ride;
    
    // try {
    //     const fare = await getFare(pickup, destination);
    
    //     const ride = new rideModel({
    //     user,
    //     pickup,
    //     destination,
    //     vehicleType,
    //     fare: fare[vehicleType],
    //     });
    
    //     await ride.save();
    //     return ride;
    // } catch (error) {
    //     console.error('Error creating ride:', error.message);
    //     throw error;
    // }
};
