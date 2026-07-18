// dummyAlerts.js
// Fake alerts dataset representing realistic telemetry issues in a fleet dashboard.
// These mock alerts will be replaced by real-time events from Socket.io later.

const dummyAlerts = [
  {
    id: 1,
    vehicleId: "TN-01-AB-1234",
    driver: "Rajesh Kumar",
    type: "Geofence Breach",
    severity: "High",
    message: "Vehicle entered restricted warehouse zone.",
    time: "2 mins ago"
  },
  {
    id: 2,
    vehicleId: "KA-03-EF-9012",
    driver: "Arjun Singh",
    type: "Overspeed",
    severity: "High",
    message: "Vehicle is traveling at 85 km/h in a 60 km/h speed limit zone.",
    time: "10 mins ago"
  },
  {
    id: 3,
    vehicleId: "DL-04-GH-3456",
    driver: "Meena Sharma",
    type: "Vehicle Offline",
    severity: "High",
    message: "GPS signal lost. Vehicle has not responded for 15 minutes.",
    time: "25 mins ago"
  },
  {
    id: 4,
    vehicleId: "MH-02-CD-5678",
    driver: "Priya Nair",
    type: "Low Fuel",
    severity: "Medium",
    message: "Fuel level is below 15%. Recommend refuel stop soon.",
    time: "45 mins ago"
  },
  {
    id: 5,
    vehicleId: "GJ-05-IJ-7890",
    driver: "Kiran Patel",
    type: "Engine Warning",
    severity: "Medium",
    message: "Engine coolant temperature has exceeded normal range threshold.",
    time: "1 hour ago"
  },
  {
    id: 6,
    vehicleId: "TN-01-AB-1234",
    driver: "Rajesh Kumar",
    type: "Route Deviation",
    severity: "Low",
    message: "Vehicle deviated from primary route line. Recalculating trip.",
    time: "2 hours ago"
  }
];

export default dummyAlerts;
