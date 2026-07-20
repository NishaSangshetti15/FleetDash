import { useState, useEffect } from "react";

import "../styles/dashboard.css";
import socket from "../socket";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardCards from "../components/dashboard/DashboardCards";
import LiveMap from "../components/map/LiveMap";
import VehicleTable from "../components/vehicles/VehicleTable";
import AlertPanel from "../components/alerts/AlertPanel";

import { getVehicles } from "../services/api";
import dummyAlerts from "../data/dummyAlerts";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [alerts] = useState(dummyAlerts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load vehicles from backend
  const loadVehicles = async () => {
    try {
      const data = await getVehicles();

      console.log("✅ Vehicles:", data);

      setVehicles(data);
      setError(null);
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();

    // Connect Socket
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Socket Connected:", socket.id);
    });

    // Listen to every socket event (Debug)
    socket.onAny((event, data) => {
      console.log("📨 Event Received:", event, data);
    });

    // Live telemetry update
    socket.on("telemetry-update", (telemetry) => {
      console.log("📡 Live Telemetry:", telemetry);

      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          if (vehicle.vehicleId !== telemetry.vehicleId) {
            return vehicle;
          }

          return {
            ...vehicle,
            currentLocation: {
              latitude: telemetry.latitude,
              longitude: telemetry.longitude,
            },
            speed: telemetry.speed,
            fuel: telemetry.fuel,
            updatedAt: telemetry.timestamp,
          };
        })
      );
    });

    return () => {
      socket.off("telemetry-update");
      socket.offAny();
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-heading">Dashboard</h1>
              <p className="page-subheading">
                Fleet telemetry overview
              </p>
            </div>

            <span className="page-header-badge">
              Live View
            </span>
          </div>

          <DashboardCards
            vehicles={vehicles}
            loading={loading}
            error={error}
            alerts={alerts}
          />

          <LiveMap vehicles={vehicles} />

          <VehicleTable
            vehicles={vehicles}
            loading={loading}
            error={error}
          />

          <AlertPanel alerts={alerts} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;