import React , {useState, useRef} from 'react';
import { Link } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
  };

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
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
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

        <div className="mt-6 w-full">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />
            <Link
              to="/captainriding"
              className="flex justify-center w-full mt-5 text-lg bg-green-500 text-white font-semibold p-3 rounded-lg"
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                props.setRidePopupPanel(false);
                // Add logic to decline the ride here
                // For example, you can call a function to send a request to the server to decline the ride
                // declineRide(rideId); // Assuming you have the rideId available in this context
                // Or you can just close the popup without any action
                props.setConfirmRidePopupPanel(false);
              }}
              className="text-lg w-full mt-2 bg-red-500 text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
