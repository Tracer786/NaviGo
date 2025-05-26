import React, { createContext, useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();

  // Basic connection logic
  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_BASE_URL}`); // Adjust the URL as needed
    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
    });
    
    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Function to send a message on a specific event
  const sendMessage = (eventName, message) => {
    socketRef.current.emit(eventName, message);
  };

  // Function to receive a message from a specific event
  const receiveMessage = (eventName, callback) => {
    socketRef.current.on(eventName, callback);
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);