import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const CaptainRiding = () => {
  const finishRidePanelRef = useRef(null);
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: 'translateY(0)',
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: 'translateY(100%)',
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex  items-center justify-between w-screen">
        <img className="w-16" src="/images/NaviGo_Logo.png" alt="NaviGo Logo" />
        <Link
          to="/captainhome"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="/images/Home_Map_Gif_Image.gif"
          alt="Home Page"
        />
      </div>
      <div
        onClick={() => {
        //   setFinishRidePanel(!finishRidePanel);
          setFinishRidePanel(true);
        }}
        className="h-1/5 flex items-center justify-between p-6 bg-yellow-400 relative"
      >
        <h5
          className="p-1 text-center w-[90%] absolute top-0"
          onClick={() => {}}
        >
          <i className="text-3xl ri-arrow-up-wide-fill"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white"
      >
        <FinishRide  setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
