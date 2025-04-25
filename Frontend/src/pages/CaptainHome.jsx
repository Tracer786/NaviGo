import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [ridePopupPanel]);

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmRidePopupPanel]);


  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex  items-center justify-between w-screen">
        <img className="w-16" src="/images/NaviGo_Logo.png" alt="NaviGo Logo" />
        <Link
          to="/home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="/images/Home_Map_Gif_Image.gif"
          alt="Home Page"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white">
        <RidePopUp setRidePopupPanel={setRidePopupPanel}  setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmRidePopupPanelRef} className="fixed h-screen w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white">
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel}  setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
