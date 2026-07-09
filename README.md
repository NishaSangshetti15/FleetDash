# FleetDash

A high-throughput, event-driven fleet telemetry dashboard.
Tracks live vehicle positions, stores GPS history efficiently, and alerts
on geofence boundary crossings in real time.

## Status
Day 1: basic Express server with a health check endpoint.

## Run it
```bash
cd backend
cp .env.example .env
npm install
npm start
```
Then visit http://localhost:4000/health
