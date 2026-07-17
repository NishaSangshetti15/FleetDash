import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    high_rps: {
      executor: 'constant-arrival-rate',
      rate: 2000, // iterations per second
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 200,
      maxVUs: 1000,
    },
  },
};

const BASE = __ENV.TEST_BASE || 'http://localhost:3000';

function makePayload(id) {
  // generate a short burst of points
  const points = [];
  const now = Date.now();
  for (let i = 0; i < 5; i++) {
    points.push({
      ts: new Date(now - i * 1000).toISOString(),
      coords: [ -73.9 + Math.random() * 0.2, 40.7 + Math.random() * 0.2 ],
      speed: Math.random() * 30,
      heading: Math.random() * 360,
    });
  }
  return JSON.stringify({ vehicleId: `veh-${id}`, points });
}

export default function (data) {
  const id = Math.floor(Math.random() * 2000);
  const res = http.post(`${BASE}/ingest`, makePayload(id), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'accepted': (r) => r.status === 202 });
}
