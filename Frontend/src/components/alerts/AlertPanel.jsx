// AlertPanel.jsx
// Displays recent telemetry alerts using data received through props.

import '../../styles/dashboard.css';
import '../../styles/alertPanel.css';

function AlertPanel({ alerts = [] }) {
  return (
    <div className="section-card">

      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-title-dot" style={{ backgroundColor: '#ef4444' }} />
          Recent Alerts
        </h2>
        <span className="section-tag">
          {alerts.length} Active {alerts.length === 1 ? 'alert' : 'alerts'}
        </span>
      </div>

      {/* Alert List Container */}
      <div className="alert-list">
        {alerts.length === 0 ? (
          <div className="alert-empty">No recent alerts.</div>
        ) : (
          alerts.map((alert) => (
            <div className="alert-item" key={alert.id}>
              
              {/* Left Side: Telemetry details */}
              <div className="alert-content-left">
                <div className="alert-meta">
                  <span className="alert-vehicle">{alert.vehicleId}</span>
                  <span className="alert-meta-dot" />
                  <span className="alert-driver">{alert.driver}</span>
                  <span className="alert-meta-dot" />
                  <span className="alert-type">{alert.type}</span>
                </div>
                <p className="alert-message">{alert.message}</p>
              </div>

              {/* Right Side: Metadata and priority badge */}
              <div className="alert-content-right">
                <span className={`severity-badge ${alert.severity.toLowerCase()}`}>
                  {alert.severity}
                </span>
                <span className="alert-time">{alert.time}</span>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default AlertPanel;
