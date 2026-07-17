const express = require("express");

const router = express.Router();

const {
  addTelemetry,
} = require("../controllers/telemetryController");

router.post("/", addTelemetry);

module.exports = router;