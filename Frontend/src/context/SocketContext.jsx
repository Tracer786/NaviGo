/*import React, { createContext, useContext, useEffect, useRef } from 'react';
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

  // // Function to send a message on a specific event
  // const sendMessage = (eventName, message) => {
  //   console.log(`Sending message: ${message} to ${eventName}`);
  //   socketRef.current.emit(eventName, message);
  // };

  // // Function to receive a message from a specific event
  // const receiveMessage = (eventName, callback) => {
  //   console.log(`Sending message: ${message} to ${eventName}`);
  //   socketRef.current.on(eventName, callback);
  // };

  return (
    // <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);*/



import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_BASE_URL}`);
    setSocket(socketRef.current);

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

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);