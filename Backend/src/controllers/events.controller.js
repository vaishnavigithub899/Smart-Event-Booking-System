import * as eventService from "../services/events.service.js";
import { io } from "../server.js";

export async function createEvent(req, res) {
  try {
    const event = await eventService.createEvent(req.body);
    io.emit("events:updated");
    res.status(201).json(event);
  } catch (err) {
    console.error("CreateEvent Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function listEvents(req, res) {
  try {
    const events = await eventService.listEvents();
    res.json(events);
  } catch (err) {
    console.error("ListEvents Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function getEvent(req, res) {
  try {
    const event = await eventService.getEvent(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("GetEvent Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function updateEvent(req, res) {
  try {
    const updated = await eventService.updateEvent(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Event not found" });
    io.emit("events:updated");
    res.json(updated);
  } catch (err) {
    console.error("UpdateEvent Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function deleteEvent(req, res) {
  try {
    const deleted = await eventService.deleteEvent(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    io.emit("events:updated");
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("DeleteEvent Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}
