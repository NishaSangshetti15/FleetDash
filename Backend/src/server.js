require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config");

const vehicleRoutes = require("./routes/vehicleRoutes");
const telemetryRoutes = require("./routes/telemetryRoutes");
const geofenceRoutes = require("./routes/geofenceRoutes");
const alertRoutes = require("./routes/alertRoutes");

const { initSocket } = require("./socket");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/geofences", geofenceRoutes);
app.use("/api/alerts", alertRoutes);

app.get("/", (req, res) => {
  res.send("FleetDash Backend Running");
});

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});