require("dotenv").config();

const express = require("express");

const connectDB = require("./config");

const vehicleRoutes = require("./routes/vehicleRoutes");

const telemetryRoutes = require("./routes/telemetryRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/telemetry", telemetryRoutes);

app.get("/", (req, res) => {
  res.send("FleetDash Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});