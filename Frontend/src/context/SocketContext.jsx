import React, { createContext, useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();

  // ...basic connection logic...
  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_BASE_URL}`); // Adjust the URL as needed
    // Connection logic: log when connected
    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
    });
    
    // Disconnection logic: log when disconnected
    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    
    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  // Function to send message to a specific event
  const sendMessage = (eventName, message) => {
    socketRef.current.emit(eventName, message);
  }

  // Function to subscribe to a specific event
  const subscribe = (eventName, callback) => {
    socketRef.current.on(eventName, callback);
  }

  return (
    <SocketContext.Provider value={{ sendMessage, subscribe }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
