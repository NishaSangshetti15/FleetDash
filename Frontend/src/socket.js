import { io } from "socket.io-client";

// Expose a reusable socket instance.
// autoConnect is set to false to prepare for Socket.io integration without connecting automatically yet.
const socket = io("http://localhost:5001", {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;