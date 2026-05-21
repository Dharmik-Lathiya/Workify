const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require('http');
require('dotenv').config();

// Database
require('./Database/dbconnection');
const watchNotifications = require('./Database/watchNotification');
const UserSchema = require('./models/UserSchema');
const ClientSchema = require('./models/ClientSchema');

// Middlewares
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false, parameterLimit: 2000 }));
app.use(bodyParser.json({ limit: '2mb' }));

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' data:;");
  next();
});

// Socket.io setup
const connectedClients = {};
watchNotifications(UserSchema, "users", io, connectedClients);
watchNotifications(ClientSchema, "client", io, connectedClients);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (userId) => {
    connectedClients[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    socket.userId = userId;
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    for (let userId in connectedClients) {
      if (connectedClients[userId] === socket.id) {
        delete connectedClients[userId];
      }
    }
  });
});

// Use Modular Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Workify API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});
