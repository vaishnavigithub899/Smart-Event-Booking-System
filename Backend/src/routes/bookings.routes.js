import { Router } from "express";
import { createBooking, listBookings } from "../controllers/bookings.controller.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
router.post("/", createBooking);
router.get("/", requireAdmin, listBookings);

export default router;

