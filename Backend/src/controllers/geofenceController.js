const Geofence = require("../models/Geofence");

// Create a new geofence
const createGeofence = async (req, res) => {
  try {
    const { name, latitude, longitude, radius } = req.body;

    const geofence = new Geofence({
      name,
      center: {
        latitude,
        longitude,
      },
      radius,
    });

    await geofence.save();

    res.status(201).json({
      success: true,
      message: "Geofence created successfully",
      data: geofence,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all geofences
const getGeofences = async (req, res) => {
  try {
    const geofences = await Geofence.find();

    res.status(200).json({
      success: true,
      count: geofences.length,
      data: geofences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGeofence,
  getGeofences,
};