// LiveMap.jsx
// Section card that will display the live vehicle map.
// For now it renders a styled placeholder container.
// A real map (e.g. using Leaflet) will be plugged in here later.

import '../../styles/dashboard.css';

function LiveMap() {
  return (
    <div className="section-card">

      {/* Section header row */}
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-title-dot" />
          Live Fleet Map
        </h2>
        <span className="section-tag">Real-time</span>
      </div>

      {/* Placeholder — map component goes here in the next phase */}
      <div className="section-placeholder placeholder-map">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <span>Live map will be displayed here</span>
      </div>

    </div>
  );
}

export default LiveMap;
