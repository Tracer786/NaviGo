import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Move libraries array outside the component to avoid performance warning
const LIBRARIES = ['marker'];

const LiveTracking = ({ height = '100vh' }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const [zoom, setZoom] = useState(16);

  const containerStyle = {
    width: '100vw',
    height: height,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(coords);
          console.log('Live location:', coords);
        },
        (err) => setError('Unable to retrieve your location')
      );
    };

    updatePosition();
    intervalRef.current = setInterval(updatePosition, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (loadError) {
    return <div className="h-full flex items-center justify-center"><h2>Map cannot be loaded</h2></div>;
  }

  if (!isLoaded) {
    return <div className="h-full flex items-center justify-center"><h2>Loading Map...</h2></div>;
  }

  if (error) {
    return <div className="h-full flex items-center justify-center"><h2>{error}</h2></div>;
  }

  return (
    <div style={containerStyle} className="relative">
      {/* Zoom controls
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          className="bg-white rounded shadow p-2 text-xl"
          onClick={() => setZoom((z) => Math.min(z + 1, 21))}
        >
          +
        </button>
        <button
          className="bg-white rounded shadow p-2 text-xl"
          onClick={() => setZoom((z) => Math.max(z - 1, 2))}
        >
          -
        </button>
      </div> */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={currentPosition || { lat: 0, lng: 0 }}
        zoom={zoom}
        options={{
          scrollwheel: true,
          draggable: true, // <-- This enables moving the map with the cursor
          zoomControl: false, // Hide default zoom controls, use custom
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default LiveTracking;
// This component implements live tracking using Google Maps API,
// showing the user's current location and updating it in real time.