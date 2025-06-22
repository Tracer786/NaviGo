import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useEffect, useContext} from 'react';
import {SocketContext} from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride || null;
  const {socket} = useContext(SocketContext);
  const navigate = useNavigate();

   useEffect(() => {
    if (!socket) return;
    const handler = () => {
      console.log('Ride ended');
      navigate('/home');
    };
    socket.on('ride-ended', handler);

    // Cleanup
    return () => {
      socket.off('ride-ended', handler);
    };
  }, [socket, navigate]);

  // useEffect(() => {
  //   if (!ride) {
  //     // Handle case where ride is not available
  //   }
  // }, [ride]);

  return (
    <div className="h-screen">
        <Link to='/home' className='fixed  h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-4-line"></i>
        </Link>
      <div className="h-3/5">
        {/* <img
          className="h-full w-full object-cover"
          src="/images/Home_Map_Gif_Image.gif"
          alt="Home Page"
        /> */}
        <LiveTracking height="100%" />
      </div>
      <div className="h-2/5 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="/images/NaviGo_Car.webp"
            alt="NaviGo_Car"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm font-grey-600">Maruti Suzuki Alto</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
              <i className="text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">103/A</h3>
                <p className="text-sm -mt-1 text-color-600">
                  {ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="text-lg ri-currency-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-color-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
