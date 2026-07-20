import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "../../styles/dashboard.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Component to move the map when coordinates change
function ChangeMapView({ center }) {
  const map = useMap();

  map.setView(center, 15);

  return null;
}

function LiveMap({ vehicles = [] }) {
  const defaultCenter = [18.5204, 73.8567];

  const firstVehicle = vehicles[0];

  const center =
    firstVehicle?.currentLocation
      ? [
          firstVehicle.currentLocation.latitude,
          firstVehicle.currentLocation.longitude,
        ]
      : defaultCenter;

  return (
    <div className="section-card">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-title-dot" />
          Live Fleet Map
        </h2>

        <span className="section-tag">Real-time</span>
      </div>

      <MapContainer
        center={center}
        zoom={15}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <ChangeMapView center={center} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vehicles.map((vehicle) => {
          const latitude = vehicle.currentLocation?.latitude;
          const longitude = vehicle.currentLocation?.longitude;

          if (latitude == null || longitude == null) return null;

          return (
            <Marker
              key={vehicle._id}
              position={[latitude, longitude]}
            >
              <Popup>
                <div>
                  <h3>{vehicle.vehicleId}</h3>

                  <p>
                    <strong>Driver:</strong> {vehicle.driverName}
                  </p>

                  <p>
                    <strong>Status:</strong> {vehicle.status}
                  </p>

                  <p>
                    <strong>Latitude:</strong> {latitude}
                  </p>

                  <p>
                    <strong>Longitude:</strong> {longitude}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default LiveMap;