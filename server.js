const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { faker } = require("@faker-js/faker");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Simulate telemetry every 3 seconds
setInterval(() => {
  const data = {
    id: "haps-001",
    timestamp: new Date().toISOString(),
    altitude: faker.number.int({ min: 17000, max: 20000 }),
    temperature: faker.number.int({ min: -60, max: 0 }),
    battery: faker.number.int({ min: 10, max: 100 }),
    signal_strength: faker.number.int({ min: 50, max: 100 }),
  };
  io.emit("telemetry", data);
}, 3000);

server.listen(4000, () => console.log("Server running on port 4000"));
