import React from 'react';
import { Link } from 'react-router-dom';

const CaptainHome = () => {
  return (
    <div className="h-screen">
      <div className='fixed p-3 top-0 flex  items-center justify-between w-screen'>
      <img className="w-16" src="/images/NaviGo_Logo.png" alt="NaviGo Logo" />
        <Link
          to="/home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="/images/Home_Map_Gif_Image.gif"
          alt="Home Page"
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="/images/NaviGo_Car.webp"
            alt="NaviGo_Car"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Mirul</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">PB04 AB 1234</h4>
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
                  Sector-41, Gurgaon
                </p>
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
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default CaptainHome;
