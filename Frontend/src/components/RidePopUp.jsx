import React from 'react';

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available !</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="/images/User_Image.webp"
            alt="User_Image"
          />
          <h2 className="text-xl font-medium">User Singh</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 Km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11/A</h3>
              <p className="text-sm -mt-1 text-color-600">Near Metro, Delhi</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">103/A</h3>
              <p className="text-sm -mt-1 text-color-600">Sector-41, Gurgaon</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm -mt-1 text-color-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between w-full mt-5'>
        <button
            onClick={() => {
              props.setRidePopupPanel(false);
              // Add logic to decline the ride here
              // For example, you can call a function to send a request to the server to decline the ride
              // declineRide(rideId); // Assuming you have the rideId available in this context
              // Or you can just close the popup without any action
            }}
            className="mt-1 bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg"
          >
            Decline
          </button>
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
              props.setConfirmRidePopupPanel(true);
              // Add logic to accept the ride here
              // For example, you can call a function to send a request to the server to accept the ride
              // acceptRide(rideId); // Assuming you have the rideId available in this context
              // Or you can just close the popup without any action
              // Or you can navigate to a different page or perform any other action
            }}
            className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
          >
            Accept
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
