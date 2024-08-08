import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Replace with client URL (no clue yet :p)
    methods: ["GET", "POST"]
  }
});

interface User {
  id: string; // Auth0 / userId
  username: string; // Their name i.e. Jackson :)
}

const users: User[] = [];

io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  socket.on('register', (username: string) => {
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
