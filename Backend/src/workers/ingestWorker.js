const { parentPort } = require('worker_threads');
const { connect, mongoose } = require('../utils/db');

const { Schema } = require('mongoose');

const TelemetryBucketSchema = require('../models/telemetry').TelemetryBucketSchema;

async function ensureModels() {
  await connect();
  if (!mongoose.models.TelemetryBucket) {
    mongoose.model('TelemetryBucket', TelemetryBucketSchema);
  }
  return mongoose.model('TelemetryBucket');
}

function floorToHour(d) {
  const t = new Date(d);
  t.setUTCMinutes(0, 0, 0);
  return t;
}

parentPort.on('message', async (payload) => {
  try {
    const TelemetryBucket = await ensureModels();

    // Expect payload to be { vehicleId, points: [{ ts, coords, speed, heading, meta }, ...] }
    const { vehicleId, points } = payload;
    if (!vehicleId || !Array.isArray(points) || points.length === 0) {
      parentPort.postMessage({ ok: false, error: 'invalid-payload' });
      return;
    }

    // Group points by bucketStart
    const buckets = new Map();
    for (const p of points) {
      const ts = new Date(p.ts);
      const bucketStart = floorToHour(ts).toISOString();
      if (!buckets.has(bucketStart)) buckets.set(bucketStart, []);
      buckets.get(bucketStart).push({
        ts,
        coords: p.coords,
        speed: p.speed,
        heading: p.heading,
        meta: p.meta,
      });
    }

    const ops = [];
    for (const [bucketStartISO, pts] of buckets.entries()) {
      const bucketStart = new Date(bucketStartISO);
      ops.push({
        updateOne: {
          filter: { vehicleId, bucketStart },
          update: { $push: { points: { $each: pts } }, $set: { updatedAt: new Date() } },
          upsert: true,
        },
      });
    }

    if (ops.length) {
      await TelemetryBucket.bulkWrite(ops, { ordered: false });
    }

    parentPort.postMessage({ ok: true, written: points.length, vehicleId });
  } catch (err) {
    parentPort.postMessage({ ok: false, error: err.message });
  }
});
