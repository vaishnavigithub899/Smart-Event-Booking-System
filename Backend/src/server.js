import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
  }
});

io.on("connection", socket => {
  console.log("✅ Client connected:", socket.id);
  socket.on("disconnect", () => console.log("❌ Client disconnected:", socket.id));
});

export { io };

server.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
