const mongoose = require("mongoose");

const telemetryPointSchema = new mongoose.Schema(
  {
    latitude: Number,
    longitude: Number,
    speed: Number,
    fuel: Number,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const telemetryBucketSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
    },

    hour: {
      type: String,
      required: true,
    },

    telemetry: [telemetryPointSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "TelemetryBucket",
  telemetryBucketSchema
);