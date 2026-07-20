import { useEffect } from "react";
import socket from "../socket";

/**
 * useVehicleSocket Hook
 * 
 * Reusable hook to subscribe to live telemetry updates via Socket.io.
 * Currently in preparation phase: auto-connect and listeners are disabled.
 * 
 * @param {Function} onTelemetryUpdate - Callback function called when new vehicle data is received.
 */
function useVehicleSocket(onTelemetryUpdate) {
  useEffect(() => {
    // TODO: Connect the socket when this hook is active in the next phase
    // socket.connect();

    // TODO: Add socket listeners for live updates (e.g. "telemetry-update")
    // socket.on("telemetry-update", (data) => {
    //   if (onTelemetryUpdate) {
    //     onTelemetryUpdate(data);
    //   }
    // });

    // Clean up connections and listeners when component unmounts
    return () => {
      // TODO: Clean up event listeners and disconnect socket
      // socket.off("telemetry-update");
      // socket.disconnect();
    };
  }, [onTelemetryUpdate]);
}

export default useVehicleSocket;
