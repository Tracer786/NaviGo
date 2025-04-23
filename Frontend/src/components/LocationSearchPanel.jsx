import React from "react";

const LocationSearchPanel = (props) => {
    // console.log(props);

    // sample array for location
    const locations = [
        "103, Near Myom Hospital, Seactor-41, Gurgaon",
        "104, Near Myom Hospital, Seactor-41, Gurgaon",
        "105, Near Myom Hospital, Seactor-41, Gurgaon",
        "106, Near Myom Hospital, Seactor-41, Gurgaon",
        "107, Near Myom Hospital, Seactor-41, Gurgaon",
    ];
    return (
        <div>
            {/* This is sample data */}
            {
                locations.map(function(elem,idx){
                    return  <div key={idx} onClick={()=>{
                        props.setVehiclePanelOpen(true)
                        props.setPanelOpen(false)
                    }} className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start">
                    <h2 className="bg-[#eee] flex items-center justify-center h-6 w-7 rounded-full">
                    <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className="font-medium">
                    {elem}
                    </h4>
                </div>
                })
            }
            
        </div>
    )
}

export default LocationSearchPanel;