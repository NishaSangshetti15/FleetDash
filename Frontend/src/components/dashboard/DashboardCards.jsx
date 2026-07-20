// DashboardCards.jsx
// Calculates summary statistics from the vehicle data and renders four StatCards.
// When the backend is ready, replace dummyVehicles with real API data here.

import StatCard from './StatCard';
import '../../styles/dashboard.css';

// ── Inline SVG icons ─────────────────────────────────────────────────
// Simple icons that visually match each card's meaning.
// Using inline SVGs keeps us dependency-free.

function IconTotal() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 4v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconActive() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function IconOffline() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}

function IconAlerts() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────
function DashboardCards({ vehicles = [], loading = false, error = null, alerts = [] }) {
  
  // Calculate statistics from the API response
  // If loading, show "...". If error, show "—"
  const totalVehicles = loading ? '...' : error ? '—' : vehicles.length;
  
  const activeVehicles = loading
    ? '...'
    : error
    ? '—'
    : vehicles.filter(
        (v) => (v.status || '').toLowerCase() === 'active' || (v.status || '').toLowerCase() === 'running'
      ).length;

  const offlineVehicles = loading
    ? '...'
    : error
    ? '—'
    : vehicles.filter(
        (v) => (v.status || '').toLowerCase() === 'offline'
      ).length;

  // Calculate alerts dynamically from the alerts prop
  const alertsToday = loading ? '...' : error ? '—' : alerts.length;

  const cards = [
    {
      title: 'Total Vehicles',
      value: totalVehicles,
      description: 'Registered in fleet',
      icon: <IconTotal />,
      colorClass: 'blue',
    },
    {
      title: 'Active Now',
      value: activeVehicles,
      description: 'Currently on route',
      icon: <IconActive />,
      colorClass: 'green',
    },
    {
      title: 'Offline',
      value: offlineVehicles,
      description: 'Not responding',
      icon: <IconOffline />,
      colorClass: 'orange',
    },
    {
      title: 'Alerts Today',
      value: alertsToday,
      description: 'Require attention',
      icon: <IconAlerts />,
      colorClass: 'red',
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          colorClass={card.colorClass}
        />
      ))}
    </div>
  );
}

export default DashboardCards;
