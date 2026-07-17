const express = require('express');
const router = express.Router();
const { Worker } = require('worker_threads');
const path = require('path');

// For simplicity we'll reuse a single worker for ingestion in this scaffold.
const workerPath = path.resolve(__dirname, '..', 'workers', 'ingestWorker.js');
const ingestWorker = new Worker(workerPath);

ingestWorker.on('message', (msg) => {
  // In a more complete implementation we'd forward these to Redis or Socket.io
  console.debug('ingestWorker:', msg);
});

ingestWorker.on('error', (err) => console.error('Ingest worker error', err));

router.post('/', express.json({ limit: '1mb' }), (req, res) => {
  const payload = req.body;
  if (!payload) return res.status(400).json({ error: 'no-payload' });

  // post to worker for async processing
  ingestWorker.postMessage(payload);
  res.status(202).json({ accepted: true });
});

module.exports = router;
