import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : ["http://localhost:5173"], // frontend URL allow
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ JSON parsing
app.use(express.json());

// ✅ Routes
app.use("/events", eventsRouter);
app.use("/bookings", bookingsRouter);
app.use("/", authRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ message: "🚀 Smart Event Booking API running" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

export const handler = serverless(app);
