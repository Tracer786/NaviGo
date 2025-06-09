const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
let ioInstance;

function initializeSocket(server) {
  ioInstance = socketIo(server, {
    cors: {
      // origin: "http://localhost:5173",
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  ioInstance.on('connection', (socket) => {
    // console.log('New client connected:', socket.id);
    console.log(`New client connected:  ${socket.id}`);
    socket.on('join', async (data) => {
      const { userId, userType } = data;
      console.log(`User joined: ${userId}, Type: ${userType}`);
      if (userType == 'user') {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType == 'captain') {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on('update-location', async (data) => {
      const { userId, userType, location } = data;
      console.log(`User ${userId} updated location: ${location}`);
      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { location });
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { location });
      }
    });

    // socket.on('update-location-captain', async (data)=>{
    //   const {userId, location} = data;
    //   if (!location || !location.ltd || !location.lng) {
    //     console.error('Invalid location data received');
    //     return socket.emit('error', 'Invalid location data');
    //   }
    //   console.log(`Captain ${userId} updated location: ${location}`);
    //   await captainModel.findByIdAndUpdate(userId, { location : {
    //     ltd: location.ltd,
    //     lng: location.lng
    //   } });
    // })

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        console.error('Invalid location data received');
        return socket.emit('error', 'Invalid location data');
      }
      console.log(`Captain ${userId} updated location:`, location);
      // Update location as a GeoJSON point:
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: 'Point',
          coordinates: [location.lng, location.ltd], // GeoJSON order: [lng, lat]
        },
      });
    });

    socket.on('disconnect', () => {
      // console.log('Client disconnected:', socket.id);
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (ioInstance) {
    ioInstance.to(socketId).emit('message', message);
  } else {
    console.error('Socket.io not initialized');
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
