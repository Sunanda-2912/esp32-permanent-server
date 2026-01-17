const express = require("express");
const app = express();
app.use(express.json());

let latestData = { status: "No data yet", connected: false };
const timeout = 30000; // 30 seconds

// ESP32 sends data here
app.post("/api/scan", (req, res) => {
  latestData = { ...req.body, connected: true, lastSeen: Date.now() };
  console.log("Received from ESP32:", latestData);
  res.status(200).json({ message: "Data received" });
});

// Anyone can view data here
app.get("/api/scan", (req, res) => {
  const now = Date.now();
  if (now - (latestData.lastSeen || 0) > timeout) {
    latestData.connected = false;
    latestData.status = "Device is offline";
  } else {
    latestData.connected = true;
  }
  res.json(latestData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
