import '../../styles/dashboard.css';
import '../../styles/vehicleTable.css';

// Helper function to map backend status values to CSS class names
const getStatusClass = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'running') return 'active';
  return s; // 'idle' or 'offline'
};

function VehicleTable({ vehicles = [], loading = false, error = null }) {
  return (
    <div className="section-card">
      
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-title-dot" />
          Vehicle Status Table
        </h2>
        <span className="section-tag">
          {loading ? 'Loading...' : error ? 'Error' : `${vehicles.length} ${vehicles.length === 1 ? 'vehicle' : 'vehicles'} registered`}
        </span>
      </div>

      {/* Table Container */}
      <div className="table-responsive">
        {loading ? (
          <div className="table-empty">Loading vehicle telemetry...</div>
        ) : error ? (
          <div className="table-empty" style={{ color: '#ef4444' }}>{error}</div>
        ) : vehicles.length === 0 ? (
          <div className="table-empty">No vehicles available</div>
        ) : (
          <table className="vehicle-table">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Driver Name</th>
                <th>Status</th>
                <th>Speed</th>
                <th>Fuel Level</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => {
                const statusClass = getStatusClass(vehicle.status);
                const vehicleName = vehicle.vehicleNumber || vehicle.name || vehicle.vehicleId || '—';
                const driverName = vehicle.driverName || vehicle.driver || 'Unknown';
                const speedText = vehicle.speed !== undefined ? `${vehicle.speed} km/h` : '—';
                const fuelText = vehicle.fuel !== undefined ? `${vehicle.fuel}%` : '—';
                
                const latVal = vehicle.currentLocation?.latitude !== undefined 
                  ? vehicle.currentLocation.latitude 
                  : (vehicle.latitude !== undefined ? vehicle.latitude : 0);
                  
                const lngVal = vehicle.currentLocation?.longitude !== undefined 
                  ? vehicle.currentLocation.longitude 
                  : (vehicle.longitude !== undefined ? vehicle.longitude : 0);

                const timeText = vehicle.lastUpdated || (vehicle.updatedAt ? new Date(vehicle.updatedAt).toLocaleTimeString() : '—');

                return (
                  <tr key={vehicle.vehicleId || vehicle.id || vehicleName}>
                    {/* Vehicle ID (Name/Plate) */}
                    <td style={{ fontWeight: 600 }}>{vehicleName}</td>
                    
                    {/* Driver Name */}
                    <td>{driverName}</td>
                    
                    {/* Status Badge */}
                    <td>
                      <span className={`status-badge ${statusClass}`}>
                        <span className="status-dot" />
                        {vehicle.status}
                      </span>
                    </td>
                    
                    {/* Speed */}
                    <td className="metric-value">{speedText}</td>
                    
                    {/* Fuel Level */}
                    <td className="metric-value">{fuelText}</td>
                    
                    {/* Coordinates */}
                    <td className="coordinate-value">{Number(latVal).toFixed(4)}</td>
                    <td className="coordinate-value">{Number(lngVal).toFixed(4)}</td>
                    
                    {/* Last Updated timestamp */}
                    <td style={{ color: 'var(--color-text-muted)' }}>{timeText}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default VehicleTable;
