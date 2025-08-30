import { useEffect } from "react";
import { io } from "socket.io-client";

let socket;
export function useSocket(onEventUpdated) {
  useEffect(() => {
    if (!socket) {
      socket = io(import.meta.env.VITE_API_URL || "http://localhost:4000", {
        transports: ["websocket"],
      });
    }
    socket.on("event:updated", onEventUpdated);
    return () => socket.off("event:updated", onEventUpdated);
  }, [onEventUpdated]);
}
