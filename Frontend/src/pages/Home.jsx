import React, { useState, useRef } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

// gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const vehiclePanelOpenRef = useRef(null);
    const panelCloseRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    // vehicle panel open

    // New state for suggestions
    const [suggestions, setSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(""); // "pickup" or "destination"
    const fetchSuggestions = async (input) => {
        if (!input) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.get("http://localhost:4000/maps/get-suggestions", {
                params: { input }
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions", error);
        }
    };

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

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)',
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [confirmRidePanel]);

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)',
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [vehicleFound]);

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)',
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [waitingForDriver]);


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
                    <form onSubmit={submitHandler}>
                        <div className="line absolute h-16 w-1 top-[36%] bg-gray-500 left-10 rounded-full"></div>
                        <input
                            onClick={() => {
                                setActiveField("pickup");
                                setPanelOpen(true);
                            }}
                            value={pickup}
                            onChange={(e) => {
                                setPickup(e.target.value);
                                fetchSuggestions(e.target.value);
                            }}
                            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3" type="text" placeholder="Add a pick-up location" />
                        <input
                            onClick={() => {
                                setActiveField("destination");
                                setPanelOpen(true);
                            }}
                            value={destination}
                            onChange={(e) => {
                                setDestination(e.target.value);
                                fetchSuggestions(e.target.value);
                            }}
                            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5" type="text" placeholder="Enter your destination" />
                    </form>
                </div>
                <div ref={panelRef} className="bg-white h-0">
                    {/* <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} /> */}
                    {/* Pass suggestions and callback to update the input field */}
                    <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        suggestions={suggestions}
                        onSuggestionSelect={(suggestion) => {
                            if (activeField === "pickup") {
                                setPickup(suggestion.description);
                            } else {
                                setDestination(suggestion.description);
                            }
                            setPanelOpen(false);
                        }}
                    />
                </div>
            </div>
            <div ref={vehiclePanelOpenRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white">
                <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
            </div>
            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
                <ConfirmRide setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
                <LookingForDriver setVehicleFound={setVehicleFound}/>
            </div>
            <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white">
                <WaitingForDriver waitingForDriver={waitingForDriver}/>
            </div>
        </div>
    );
}

export default Home;