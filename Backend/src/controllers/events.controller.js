// src/controllers/events.controller.js
import * as eventService from "../services/events.service.js";
import { io } from "../server.js"; // global socket instance

// ---------------------------
// Create Event
// ---------------------------
export async function createEvent(req, res) {
  try {
    const result = await eventService.createEvent(req.body);

    // 🔔 Notify all connected clients
    io.emit("events:updated");

    res.status(201).json(result);
  } catch (err) {
    console.error("CreateEvent Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

// ---------------------------
// List Events
// ---------------------------
export async function listEvents(req, res) {
  try {
    const result = await eventService.listEvents(req.query);
    res.json(result);
  } catch (err) {
    console.error("ListEvents Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

// ---------------------------
// Get Single Event
// ---------------------------
export async function getEvent(req, res) {
  try {
    const result = await eventService.getEvent(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(result);
  } catch (err) {
    console.error("GetEvent Error:", err.message);
    res.status(404).json({ message: err.message });
  }
}

// ---------------------------
// Update Event
// ---------------------------
export async function updateEvent(req, res) {
  try {
    const result = await eventService.updateEvent(req.params.id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🔔 Notify clients
    io.emit("events:updated");

    res.json(result);
  } catch (err) {
    console.error("UpdateEvent Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

// ---------------------------
// Delete Event
// ---------------------------
export async function deleteEvent(req, res) {
  try {
    const deleted = await eventService.deleteEvent(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🔔 Notify clients
    io.emit("events:updated");

    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error("DeleteEvent Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}
