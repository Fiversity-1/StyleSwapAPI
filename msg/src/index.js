"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*", // Replace with client URL (no clue yet :p)
        methods: ["GET", "POST"]
    }
});
const users = [];
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('register', (username) => {
        users.push({ id: socket.id, username });
        socket.emit('registered', socket.id);
    });
    socket.on('private_message', ({ recipientId, message }) => {
        io.to(recipientId).emit('private_message', { senderId: socket.id, message });
    });
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        const index = users.findIndex(user => user.id === socket.id);
        if (index !== -1) {
            users.splice(index, 1);
        }
    });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
