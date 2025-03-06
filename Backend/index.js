const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/route');
const watchNotifications = require('./Database/watchNotification');
const UserSchema = require('./models/UserSchema');
const ClientSchema = require('./models/ClientSchema');
const { Server } = require("socket.io");
const crypto = require('crypto')
const stripe = require('stripe')("sk_test_51QwTKoGbnzXJuBBehl1LyFaMOS7jR0FCemzCOGlQoZwEv00N9mEUvhnRKcTstKbmpdvzDw4nI0x4wuSeDJWopqwR00E5xnaZp6");

const app = express();
const server = require('http').createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173"
  }
})


app.use(cors());
app.use(bodyParser.urlencoded({ limit: '2mb',extended:false, parameterLimit: 2000}));
app.use(bodyParser.json({ limit: '2mb' }));

require('./Database/dbconnection');


const connectedClients = {};
watchNotifications(UserSchema,"users",io,connectedClients);
watchNotifications(ClientSchema,"client",io,connectedClients);

app.use('/',routes);

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});


const PAYU_MERCHANT_KEY = "rERd4X";
const PAYU_SALT = "0LPpyx9hfnuEKxiFaIb6gkF3cwLhXyCA";  // ✅ Test mode salt

const PAYU_BASE_URL = "https://test.payu.in/_payment"; // Use "https://secure.payu.in/_payment" for production

app.post("/pay", async (req, res) => {
    const { amount, productInfo, firstName, email, phone } = req.body;

    const txnId = "txn" + Date.now();
    const hashString = `${PAYU_MERCHANT_KEY}|${txnId}|${amount}|${productInfo}|${firstName}|${email}|${""}|${""}|${""}|${""}|${""}||||||${PAYU_SALT}`;

    // ✅ Generate SHA-512 hash
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const payUData = {
        key: PAYU_MERCHANT_KEY,
        txnid: txnId,
        amount: amount.toString(),
        productinfo: productInfo,
        firstname: firstName,
        email: email,
        phone: phone,
        surl: "http://localhost:3000/payment/success",
        furl: "http://localhost:3000/payment/fail",
        hash: hash,
        service_provider: "payu_paisa",
    };

    res.json({ payUData, action: PAYU_BASE_URL });
});
app.post("/success", (req, res) => {
  res.json({ message: "Payment Successful!", data: req.body });
});

app.post("/fail", (req, res) => {
  res.json({ message: "Payment Failed!", data: req.body });
});

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

server.listen(3000)