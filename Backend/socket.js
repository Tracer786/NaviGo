const socketIo = require('socket.io');
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model');
let ioInstance;

function initializeSocket(server) {
    ioInstance = socketIo(server, {
        cors: {
            // origin: "http://localhost:5173",
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    ioInstance.on('connection', (socket) => {
        // console.log('New client connected:', socket.id);
        console.log(`New client connected:  ${socket.id}`);
socket.on('join', async('data') => {
    const {userId, userType} = data;
    if(userType=='user'){
        await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
    }else if(userType=='captain'){
        await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
    }
})

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
