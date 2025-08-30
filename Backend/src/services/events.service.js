// src/services/events.service.js
import { pool } from "../config/db.js";

export async function createEvent(data) {
  if (!data.title || !data.date || !data.total_seats) {
    throw new Error("Title, date, and total_seats are required");
  }

  // Ensure available_seats defaults to total_seats if not provided
  const available_seats = data.available_seats ?? data.total_seats;

  const [result] = await pool.query(
    `INSERT INTO events (title, description, location, date, total_seats, available_seats, price, q)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.description || "",
      data.location || "",
      data.date,
      data.total_seats,
      available_seats,
      data.price || 0,
      data.q || null,
    ]
  );

  console.log(`Event created with ID ${result.insertId}`);
  return { id: result.insertId, ...data, available_seats };
}

export async function listEvents(filters) {
  let sql = "SELECT * FROM events ORDER BY date ASC";
  const [rows] = await pool.query(sql);

  console.log(`Fetched ${rows.length} events from DB`);
  return rows;
}

export async function getEvent(id) {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  if (!rows[0]) throw new Error("Event not found");
  return rows[0];
}

export async function updateEvent(id, data) {
  const available_seats = data.available_seats ?? data.total_seats;
  await pool.query(
    `UPDATE events SET title=?, description=?, location=?, date=?, total_seats=?, available_seats=?, price=?, q=? WHERE id=?`,
    [
      data.title,
      data.description || "",
      data.location || "",
      data.date,
      data.total_seats,
      available_seats,
      data.price || 0,
      data.q || null,
      id,
    ]
  );
  console.log(`Event updated with ID ${id}`);
  return { id, ...data, available_seats };
}

export async function deleteEvent(id) {
  await pool.query("DELETE FROM events WHERE id=?", [id]);
  console.log(`Event deleted with ID ${id}`);
}
