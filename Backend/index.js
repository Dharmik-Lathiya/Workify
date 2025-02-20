const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/route');
const watchNotifications = require('./Database/watchNotification');
const UserSchema = require('./models/UserSchema');
const ClientSchema = require('./models/ClientSchema');
const { Server } = require("socket.io");


const app = express();
const server = require('http').createServer(app);
const io = new Server(server);



app.use(cors());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

require('./Database/dbconnection');


const connectedClients = {};
watchNotifications(UserSchema,"users",io,connectedClients);
watchNotifications(ClientSchema,"client",io,connectedClients);

app.use('/',routes);


io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (userId) => {
    connectedClients[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
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

app.listen(3000)