import React, { useState , useRef} from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../components/LocationSearchPanel";

// gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

const Home = () => {
    const[pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef  = useRef(null);
    const panelCloseRef = useRef(null);

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
                opacity : 1
            })
        }
        else {
            gsap.to(panelRef.current, {
                height : "0%",
                // padding : 20,
                paddingLeft: 20,
                paddingRight: 20
                // opacity : 0
            })
            gsap.to(panelCloseRef.current, {
                opacity : 0
            })
        }
    }, [panelOpen]);

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
                        <LocationSearchPanel/>
                </div>
            </div>
            <div className="fixed z-10 bottom-0 p-5 bg-white">
                <div className="flex bg-red-600 items-center justify-center">
                    <img className="h-10" src="/images/NaviGo_Car.webp" alt="NaviGo_Car" />
                    <div className="bg-green-500 w-1/2">
                        <h4>Car <span><i className="ri-user-3-fill"></i>4</span></h4>
                        <h5>2 mins away</h5>
                        <p>Affordable, compact rides</p>
                    </div>
                    <h2>₹193.95</h2>
                </div>
            </div>
        </div>
    );
}

export default Home;