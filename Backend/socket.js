const socketIo = require('socket.io');
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
