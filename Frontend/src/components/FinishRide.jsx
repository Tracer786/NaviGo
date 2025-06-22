import React from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRide = (props) => {

  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/endride`,{
      rideId : props.ride._id
    },{
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      // props.setFinishRidePanel(false);
      // props.setRidePopUpPanel(false);
      navigate('/captainhome');
      // props.setRide(null);
      // props.setRides((prevRides) => prevRides.filter((ride) => ride._id !== props.ride._id));
      // Optionally, you can show a success message or redirect the user
    } else {
      // Handle error case
      console.error('Failed to end ride:', response.data);
    }
  }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Finish this Ride
      </h3>
      <div className="flex items-center justify-between p-4 border-2 border-yellow-300 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="/images/User_Image.webp"
            alt="User_Image"
          />
          <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 Km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11/A</h3>
              <p className="text-sm -mt-1 text-color-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">103/A</h3>
              <p className="text-sm -mt-1 text-color-600">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-color-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full">
          <button
          onClick={endRide}
            className="flex justify-center w-full mt-5 bg-green-500 text-white font-semibold p-3 rounded-lg text-lg"
          >
            Finish Ride
          </button>
          <p className='text-gray-600 mt-10 text-xs'>click on finish ride button if you have completed the payment.</p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
