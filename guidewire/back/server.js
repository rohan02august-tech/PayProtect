require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const serverAdapter = require("./bullBoard");


const app = express();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// ROUTES
app.use("/admin/queues", serverAdapter.getRouter());
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/policy", require("./routes/policy"));
app.use("/trigger", require("./routes/trigger"));
app.use("/monitor", require("./routes/monitor"));
// START WORKERS (instead of services)
require("./workers/triggerWorker");
require("./workers/fraudWorker");
require("./workers/payoutWorker");

const http = require("http");
const { Server } = require("socket.io");

app.get("/", (req, res) => {
  res.send("GigShield Backend Running 🚀");
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
global.io = io; // Make io globally accessible to push logs from anywhere

io.on("connection", (socket) => {
  console.log("⚡ Frontend Dashboard connected to Live Logs socket.");
});

server.listen(4000, () => {
  console.log("🚀 Server running on port 4000 with WebSockets enabled");
});