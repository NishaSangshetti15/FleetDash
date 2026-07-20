console.log("✅ telemetryController loaded");

const TelemetryBucket = require("../models/TelemetryBucket");
const Vehicle = require("../models/Vehicle");
const { getIO } = require("../socket");

const addTelemetry = async (req, res) => {
  try {
    const {
      vehicleId,
      latitude,
      longitude,
      speed,
      fuel,
    } = req.body;

    const hour = new Date().toISOString().slice(0, 13);

    // Find or create telemetry bucket
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

    // Add new telemetry record
    bucket.telemetry.push({
      latitude,
      longitude,
      speed,
      fuel,
      timestamp: new Date(),
    });

    await bucket.save();

    // Update current vehicle location
    await Vehicle.findOneAndUpdate(
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
      { new: true }
    );

    // Send live update to all connected clients
    const io = getIO();

    io.emit("telemetry-update", {
      vehicleId,
      latitude,
      longitude,
      speed,
      fuel,
      timestamp: new Date(),
    });

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