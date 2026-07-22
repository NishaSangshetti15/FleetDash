const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
    },

    geofenceName: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["ENTRY", "EXIT"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Alert", alertSchema);