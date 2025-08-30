import { Router } from "express";
import {
  createEvent,
  listEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAdmin, createEvent);
router.get("/", listEvents);
router.get("/:id", getEvent);
router.put("/:id", requireAdmin, updateEvent);
router.delete("/:id", requireAdmin, deleteEvent);

export default router;
