const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

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
    auto: Number(
      (
        baseFare.auto +
        (distanceTime.distance_value / 1000) * perKmRate.auto +
        (distanceTime.duration_value / 60) * perMinuteRate.auto
      ).toFixed(2)
    ),
    motorcycle: Number(
      (
        baseFare.motorcycle +
        (distanceTime.distance_value / 1000) * perKmRate.motorcycle +
        (distanceTime.duration_value / 60) * perMinuteRate.motorcycle
      ).toFixed(2)
    ),
    car: Number(
      (
        baseFare.car +
        (distanceTime.distance_value / 1000) * perKmRate.car +
        (distanceTime.duration_value / 60) * perMinuteRate.car
      ).toFixed(2)
    ),
  };

  return fare;
}
module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('User, pickup, destination, and vehicle type are required');
  }

  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp : getOtp(6),
    fare: fare[vehicleType],
  });
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

module.exports.confirmRide = async ({
  rideId
}) => {
  if (!rideId) {
    throw new Error('Ride ID is required');
  }

  await rideModel.findOneAndUpdate({
    _id : rideId
  },
    {
      status: 'accepted',
      captain: captain._id, // Assuming captain is passed in the request
      // otp: getOtp(4), // Generate a new OTP for the ride
    }
  );

  // const ride = await rideModel.findById(rideId);
  const ride = await rideModel.findOne({
    _id: ride,
    // status: 'pending',
  // }).populate('user').populate('captain', 'name vehicleType');
  }).populate('user');
  if (!ride) {
    throw new Error('Ride not found');
  }

  // ride.status = 'accepted';
  // // ride.otp = getOtp(4); // Generate a new OTP for the ride
  // await ride.save();

  return ride;
}