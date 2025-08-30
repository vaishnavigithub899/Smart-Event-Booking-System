// src/app.js
import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ---------------------------
// Normal JSON parsing (other routes)
// ---------------------------
app.use(express.json());

// ✅ Routes
app.use("/events", eventsRouter);
app.use("/bookings", bookingsRouter);
app.use("/", authRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ message: "🚀 Smart Event Booking API running" });
});

export default app;
