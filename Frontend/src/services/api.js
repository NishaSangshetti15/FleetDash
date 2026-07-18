// api.js
// This file will contain all HTTP requests to the backend REST API.
// For example: fetching vehicle data, trip history, alerts, etc.
// We will use the fetch() API or axios here when the backend is ready.
//
// For now, this file is just a placeholder with a sample function structure.

const BASE_URL = 'http://localhost:5001/api'; // backend URL (to be configured later)

// Example function — will be filled in when the backend is connected
async function getVehicles() {
  const response = await fetch(`${BASE_URL}/vehicles`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const result = await response.json();
  
  // The backend returns { success: true, count: X, data: [...] }
  if (result && result.success && Array.isArray(result.data)) {
    return result.data;
  }
  
  throw new Error("Invalid response format from server");
}

export { getVehicles };
