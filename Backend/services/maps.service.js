const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      // const location = response.data.results[0].geometry.location;
      // return {
      //     latitude: location.lat,
      //     longitude: location.lng
      // };
      const result = response.data.results[0];
      const location = result.geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: result.formatted_address,
        place_id: result.place_id,
        types: result.types,
        viewport: result.geometry.viewport,
      };
    } else {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required');
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const element = response.data.rows[0].elements[0];
      if (element.status === 'OK') {
        // return {
        //   distance: element.distance.text,
        //   duration: element.duration.text,
        // };
        return {
          distance: element.distance.text,
          distance_value: element.distance.value,
          duration: element.duration.text,
          duration_value: element.duration.value,
          origin_address: response.data.origin_addresses[0],
          destination_address: response.data.destination_addresses[0],
          status: element.status,
        };
      } else {
        // throw new Error(`Distance Matrix API error: ${element.status}`);
        throw new Error(
          'No route found. Please check the origin and destination.'
        );
      }
    } else {
      // throw new Error(`Distance Matrix API error: ${response.data.status}`);
      throw new Error(
        'Unable to fetch distance and time. Please check the origin and destination.'
      );
    }
  } catch (error) {
    console.error('Error fetching distance and time:', error.message);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error('Input is required');
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      //   return response.data.predictions.map((prediction) => ({
      //     description: prediction.description,
      //     place_id: prediction.place_id,
      //   }));
      return response.data.predictions.map((prediction) => ({
        description: prediction.description,
        place_id: prediction.place_id,
        types: prediction.types,
        structured_formatting: prediction.structured_formatting,
        matched_substrings: prediction.matched_substrings,
      }));
    } else if (response.data.status === 'ZERO_RESULTS') {
      // Instead of throwing an error, return an empty array.
      return [];
    } else {
      throw new Error(`Autocomplete API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error.message);
    throw error;
  }
};
