const { Schema } = require('mongoose');

const PointSchema = new Schema({
  ts: { type: Date, required: true },
  coords: { type: [Number], index: '2dsphere', required: true }, // [lon, lat]
  speed: Number,
  heading: Number,
  meta: Schema.Types.Mixed,
});

const TelemetryBucketSchema = new Schema({
  vehicleId: { type: String, required: true, index: true },
  bucketStart: { type: Date, required: true, index: true },
  points: { type: [PointSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TelemetryBucketSchema.index({ vehicleId: 1, bucketStart: 1 }, { unique: true });

module.exports = { TelemetryBucketSchema };
