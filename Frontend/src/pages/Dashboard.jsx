import { useState, useEffect } from 'react';
import '../styles/dashboard.css';

import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import DashboardCards from '../components/dashboard/DashboardCards';
import LiveMap from '../components/map/LiveMap';
import VehicleTable from '../components/vehicles/VehicleTable';
import AlertPanel from '../components/alerts/AlertPanel';

import { getVehicles } from '../services/api';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vehicle telemetry from API when component mounts
  useEffect(() => {
    async function loadVehicles() {
      try {
        setLoading(true);
        const data = await getVehicles();
        setVehicles(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to fetch live vehicle telemetry.");
      } finally {
        setLoading(false);
      }
    }
    loadVehicles();
  }, []);

  return (
    // Outer wrapper: sidebar (fixed left) + main area (right)
    <div className="app-layout">

      {/* Fixed left sidebar with navigation */}
      <Sidebar />

      {/* Main content area: navbar on top, page content below */}
      <div className="main-area">

        {/* Sticky top navbar */}
        <Navbar />

        {/* Scrollable page content */}
        <main className="page-content">

          {/* Page heading */}
          <div className="page-header">
            <div>
              <h1 className="page-heading">Dashboard</h1>
              <p className="page-subheading">Fleet telemetry overview</p>
            </div>
            <span className="page-header-badge">Live View</span>
          </div>

          {/* Summary metric cards (Total Vehicles, Active, Offline, Alerts) */}
          <DashboardCards vehicles={vehicles} loading={loading} error={error} />

          {/* Live map section */}
          <LiveMap />

          {/* Vehicle list section */}
          <VehicleTable vehicles={vehicles} loading={loading} error={error} />

          {/* Recent alerts section */}
          <AlertPanel />

        </main>
      </div>

    </div>
  );
}

export default Dashboard;
