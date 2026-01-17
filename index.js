const express = require("express");
const app = express();

app.use(express.json());

let latestData = { status: "No data yet" };

// ESP32 sends data here
app.post("/api/scan", (req, res) => {
  latestData = req.body;
  console.log("Received from ESP32:", latestData);
  res.status(200).json({ message: "Data received" });
});

// Anyone can view data here
app.get("/api/scan", (req, res) => {
  res.json(latestData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
