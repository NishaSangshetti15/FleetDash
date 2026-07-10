# FleetDash
FleetDash is a MERN stack application for real-time fleet tracking and monitoring. It processes high-frequency vehicle telemetry, displays live locations on an interactive map, detects geofence breaches, and provides instant updates using Socket.io, Redis, MongoDB, and React Canvas for high-performance visualization.


Commands
#Backend
npm init -y

#Install production dependencies
npm install express mongoose cors dotenv socket.io ioredis @turf/turf

#Install development dependencies
npm install -D nodemon jest supertest