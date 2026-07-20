import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import { useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "../../styles/dashboard.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LiveMap({ vehicles = [] }) {
  const defaultCenter = [18.5204, 73.8567];

  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (vehicles.length === 0) return;

    const first = vehicles[0];

    if (!first.currentLocation) return;

    mapRef.current.setView(
      [
        first.currentLocation.latitude,
        first.currentLocation.longitude,
      ],
      13
    );
  }, [vehicles]);

  return (
    <div className="section-card">

      <div className="section-header">
        <h2 className="section-title">
          <span className="section-title-dot" />
          Live Fleet Map
        </h2>

        <span className="section-tag">
          Real-time
        </span>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        whenCreated={(map) => (mapRef.current = map)}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vehicles.map((vehicle) => {
          const latitude = vehicle.currentLocation?.latitude;
          const longitude = vehicle.currentLocation?.longitude;

          if (latitude == null || longitude == null) {
            return null;
          }

          return (
            <Marker
              key={vehicle.vehicleId}
              position={[latitude, longitude]}
            >
              <Popup>

                <h3>{vehicle.vehicleId}</h3>

                <p>
                  <strong>Driver:</strong>{" "}
                  {vehicle.driverName}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {vehicle.status}
                </p>

                <p>
                  <strong>Speed:</strong>{" "}
                  {vehicle.speed ?? 0} km/h
                </p>

                <p>
                  <strong>Fuel:</strong>{" "}
                  {vehicle.fuel ?? 0}%
                </p>

                <p>
                  <strong>Latitude:</strong>{" "}
                  {latitude}
                </p>

                <p>
                  <strong>Longitude:</strong>{" "}
                  {longitude}
                </p>

              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

    </div>
  );
}

export default LiveMap;