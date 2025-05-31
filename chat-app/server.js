const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const chatRoutes = require('./routes/chatRooms');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Simple route
app.get('/', (req, res) => {
  res.send('Chat server is running');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
