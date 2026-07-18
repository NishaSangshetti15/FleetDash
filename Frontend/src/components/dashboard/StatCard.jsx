// StatCard.jsx
// A reusable card component used in the statistics section at the top of the dashboard.
//
// Props:
//   title       - short label shown at the top (e.g. "Total Vehicles")
//   value       - the big number displayed in the center
//   description - small helper text shown below the number
//   icon        - an SVG element passed in from the parent
//   colorClass  - CSS class that sets the left border color ("blue", "green", "orange", "red")

import '../../styles/dashboard.css';

function StatCard({ title, value, description, icon, colorClass }) {
  return (
    <div className={`stat-card ${colorClass}`}>

      {/* Top row: label on the left, icon on the right */}
      <div className="stat-card-header">
        <span className="stat-label">{title}</span>
        <div className="stat-icon">{icon}</div>
      </div>

      {/* The main number — this is what draws the eye first */}
      <span className="stat-value">{value}</span>

      {/* Small helper text below the number */}
      <span className="stat-sub">{description}</span>

    </div>
  );
}

export default StatCard;
