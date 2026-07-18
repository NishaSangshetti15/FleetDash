import { useState, useEffect } from "react";
import "../styles/dashboard.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardCards from "../components/dashboard/DashboardCards";
import LiveMap from "../components/map/LiveMap";
import VehicleTable from "../components/vehicles/VehicleTable";
import AlertPanel from "../components/alerts/AlertPanel";

import { getVehicles } from "../services/api";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVehicles() {
      try {
        setLoading(true);

        const data = await getVehicles();

        console.log("✅ Vehicles from API:", data);

        setVehicles(data);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching vehicles:", err);
        setError("Failed to fetch live vehicle telemetry.");
      } finally {
        setLoading(false);
      }
    }

    loadVehicles();
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
          <AlertPanel />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;