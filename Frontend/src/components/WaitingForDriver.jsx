import React from "react";

const WaitingForDriver = (props) => {
    return (
        <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          // props.setConfirmRidePanel(false);
          props.waitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <div className="flex items-center justify-between">
            <img className="h-12" src="/images/NaviGo_Car.webp" alt="NaviGo_Car" />
            <div className="text-right">
              <h2 className="text-lg font-medium">Mirul</h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">PB04 AB 1234</h4>
              <p className="text-sm font-grey-600">Maruti Suzuki Alto</p>
            </div>
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
      </div>
    </div>
    )
};

export default WaitingForDriver;
// This component is used to show the waiting for driver screen. It will be shown when the user has confirmed the ride and is waiting for the driver to arrive. The component will show a loading animation and a message indicating that the user is waiting for the driver.