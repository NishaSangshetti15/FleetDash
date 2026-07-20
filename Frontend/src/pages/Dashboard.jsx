import { useState, useEffect } from "react";
import "../styles/dashboard.css";

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
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial load when the component mounts
    async function loadData() {
      try {
        setLoading(true);

        // Fetching vehicles from the REST API
        const data = await getVehicles();
        console.log("✅ Vehicles from API (Initial):", data);
        setVehicles(data);

        // Setting initial alerts from dummy data
        setAlerts(dummyAlerts);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching vehicles:", err);
        setError("Failed to fetch live vehicle telemetry.");
      } finally {
        setLoading(false);
      }
    }

    loadData();

    // Polling every 5 seconds to get the latest vehicle telemetry
    const intervalId = setInterval(async () => {
      try {
        const data = await getVehicles();
        console.log("✅ Vehicles from API (Poll):", data);
        setVehicles(data);
        // Clear error if the poll succeeds
        setError(null);
      } catch (err) {
        // Log the error but continue polling on the next interval
        // Do not overwrite already displayed vehicle data with empty data
        console.error("❌ Error fetching vehicles during polling:", err);
      }
    }, 5000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-area">
        {/* Navbar */}
        <Navbar />

        <main className="page-content">
          {/* Page Header */}
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

          {/* Dashboard Cards */}
          <DashboardCards
            vehicles={vehicles}
            loading={loading}
            error={error}
            alerts={alerts}
          />

          {/* Live Map */}
          <LiveMap
            vehicles={vehicles}
          />

          {/* Vehicle Table */}
          <VehicleTable
            vehicles={vehicles}
            loading={loading}
            error={error}
          />

          {/* Alert Panel */}
          <AlertPanel
            alerts={alerts}
          />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;