// dummyVehicles.js
// This file contains fake vehicle data to use while building the UI.
// Once the backend API is connected, we will replace this with real data.
//
// Each vehicle object has:
//   id          - unique identifier
//   name        - vehicle name or plate number
//   driver      - driver's name
//   status      - "active", "idle", or "offline"
//   speed       - current speed in km/h
//   location    - last known city/area
//   fuel        - current fuel level percentage (0 to 100)
//   latitude    - geographical latitude
//   longitude   - geographical longitude
//   lastUpdated - time of the last telemetry report (HH:MM:SS)

const dummyVehicles = [
  {
    id: 1,
    name: 'TN-01-AB-1234',
    driver: 'Rajesh Kumar',
    status: 'active',
    speed: 62,
    location: 'Chennai',
    fuel: 78,
    latitude: 13.0827,
    longitude: 80.2707,
    lastUpdated: '12:35:10',
  },
  {
    id: 2,
    name: 'MH-02-CD-5678',
    driver: 'Priya Nair',
    status: 'idle',
    speed: 0,
    location: 'Mumbai',
    fuel: 42,
    latitude: 19.0760,
    longitude: 72.8777,
    lastUpdated: '12:30:45',
  },
  {
    id: 3,
    name: 'KA-03-EF-9012',
    driver: 'Arjun Singh',
    status: 'active',
    speed: 45,
    location: 'Bengaluru',
    fuel: 90,
    latitude: 12.9716,
    longitude: 77.5946,
    lastUpdated: '12:36:12',
  },
  {
    id: 4,
    name: 'DL-04-GH-3456',
    driver: 'Meena Sharma',
    status: 'offline',
    speed: 0,
    location: 'Delhi',
    fuel: 15,
    latitude: 28.6139,
    longitude: 77.2090,
    lastUpdated: '11:45:00',
  },
  {
    id: 5,
    name: 'GJ-05-IJ-7890',
    driver: 'Kiran Patel',
    status: 'active',
    speed: 78,
    location: 'Ahmedabad',
    fuel: 65,
    latitude: 23.0225,
    longitude: 72.5714,
    lastUpdated: '12:34:55',
  },
];

export default dummyVehicles;
