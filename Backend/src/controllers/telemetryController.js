console.log("✅ telemetryController loaded");
const TelemetryBucket = require("../models/TelemetryBucket");

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

    res.status(201).json({
      success: true,
      message: "Telemetry Added",
      bucket,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addTelemetry,
};
