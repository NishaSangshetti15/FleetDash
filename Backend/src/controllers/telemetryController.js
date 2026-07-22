console.log("✅ telemetryController loaded");

const TelemetryBucket = require("../models/TelemetryBucket");
const Vehicle = require("../models/Vehicle");
const Geofence = require("../models/Geofence");
const Alert = require("../models/Alert");
const { getIO } = require("../socket");

const addTelemetry = async (req, res) => {
  try {
    console.log("========== TELEMETRY RECEIVED ==========");
    console.log(req.body);

    const {
      vehicleId,
      latitude,
      longitude,
      speed,
      fuel,
    } = req.body;

    const hour = new Date().toISOString().slice(0, 13);

    let bucket = await TelemetryBucket.findOne({
      vehicleId,
      hour,
    });

    if (!bucket) {
      bucket = new TelemetryBucket({
        vehicleId,
        hour,
        telemetry: [],
      });
    }

    bucket.telemetry.push({
      latitude,
      longitude,
      speed,
      fuel,
      timestamp: new Date(),
    });

    await bucket.save();

    // Get all geofences
const geofences = await Geofence.find();

for (const geofence of geofences) {

  const distance = Math.sqrt(
    Math.pow(latitude - geofence.center.latitude, 2) +
    Math.pow(longitude - geofence.center.longitude, 2)
  );

  const inside = distance <= geofence.radius / 111000;

  if (inside) {

    const alert = new Alert({
      vehicleId,
      geofenceName: geofence.name,
      type: "ENTRY",
      message: `${vehicleId} entered ${geofence.name}`,
    });

    await alert.save();

    const io = getIO();

    io.emit("new-alert", alert);
  }
}

    const updatedVehicle = await Vehicle.findOneAndUpdate(
      { vehicleId },
      {
        currentLocation: {
          latitude,
          longitude,
        },
        speed,
        fuel,
        updatedAt: new Date(),
      },
      {
        new: true,
      }
    );

    console.log("Vehicle Updated:");
    console.log(updatedVehicle);

    const io = getIO();

    console.log("📡 Connected Clients:", io.engine.clientsCount);
    console.log("📡 Sending telemetry update...");
    io.emit("telemetry-update", {
      vehicleId,
      latitude,
      longitude,
      speed,
      fuel,
      timestamp: new Date(),
    });

    console.log("✅ Telemetry event emitted");

    res.status(201).json({
      success: true,
      message: "Telemetry Added Successfully",
      bucket,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTelemetry,
};