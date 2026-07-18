// App.jsx
// This is the root component of the FleetDash application.
// Its only job is to render the main Dashboard page.
// As the app grows, routing (React Router) will be added here
// to switch between different pages.

import Dashboard from './pages/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;
