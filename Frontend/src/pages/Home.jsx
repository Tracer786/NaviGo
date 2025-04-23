import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../components/LocationSearchPanel";

// gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const vehiclePanelOpenRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    // vehicle panel open

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: "70%",
                // padding: 20,
                paddingLeft: 20,
                paddingRight: 20
                // opacity : 1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        }
        else {
            gsap.to(panelRef.current, {
                height: "0%",
                // padding : 20,
                paddingLeft: 20,
                paddingRight: 20
                // opacity : 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen]);

    useGSAP(function () {
        if (vehiclePanelOpen) {
            gsap.to(vehiclePanelOpenRef.current, {
                transform: 'translateY(0)',
            })
        } else {
            gsap.to(vehiclePanelOpenRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [vehiclePanelOpen]);


    return (
        <div className="h-screen relative overflow-hidden">
            <img className="w-16 absolute left-5 top-5" src="/images/NaviGo_Logo.png" alt="NaviGo Logo" />
            <div className="h-screen w-screen">
                <img className="h-full w-full object-cover" src="/images/Home_Map_Gif_Image.gif" alt="Home Page" />
            </div>
            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[30%] p-5 bg-white relative">
                    <h5
                        ref={panelCloseRef}
                        onClick={() => {
                            setPanelOpen(false);
                        }} className="absolute opacity-0 top-5 right-7 text-2xl">
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <div className="line absolute h-16 w-1 top-[36%] bg-gray-500 left-10 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                            }}
                            value={pickup}
                            onChange={(e) => {
                                setPickup(e.target.value);
                            }}
                            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3" type="text" placeholder="Add a pick-up location" />
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                            }}
                            value={destination}
                            onChange={(e) => {
                                setDestination(e.target.value);
                            }}
                            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5" type="text" placeholder="Enter your destination" />
                    </form>
                </div>
                <div ref={panelRef} className="bg-white h-0">
                    <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
                </div>
            </div>
            <div ref={vehiclePanelOpenRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 bg-white">
                <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={() => {
                    setVehiclePanelOpen(false);
                }}>
                    <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>
                <h3 className="text-2xl font-semibold mb-5">Choose a Ride</h3>
                <div className="flex border-2 border-gray-100  active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
                    <img className="h-10" src="/images/NaviGo_Car.webp" alt="NaviGo_Car" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">Car <span><i className="ri-user-3-fill"></i>4</span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                    </div>
                    <h2 className="text-lg font-semibold">₹193</h2>
                </div>
                <div className="flex border-2 border-gray-100  active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
                    <img className="h-10" src="/images/NaviGo_Moto.webp" alt="NaviGo_Car" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                        <h5 className="font-medium text-sm">1 min away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable motorcycle rides</p>
                    </div>
                    <h2 className="text-lg font-semibold">₹48</h2>
                </div>
                <div className="flex border-2 border-gray-100  active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
                    <img className="h-10" src="/images/NaviGo_Auto.webp" alt="NaviGo_Car" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">Auto <span><i className="ri-user-3-fill"></i>3</span></h4>
                        <h5 className="font-medium text-sm">3 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable auto rides</p>
                    </div>
                    <h2 className="text-lg font-semibold">₹85</h2>
                </div>
            </div>

        </div>
    );
}

export default Home;