import { pool } from "../config/db.js";

export async function createEvent(data) {
  if (!data.title || !data.date || !data.total_seats) {
    throw new Error("Title, date, and total_seats are required");
  }

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

  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [result.insertId]);
  return rows[0];
}

export async function listEvents() {
  const [rows] = await pool.query("SELECT * FROM events ORDER BY date ASC");
  return rows;
}

export async function getEvent(id) {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  return rows[0] || null;
}

export async function updateEvent(id, data) {
  const available_seats = data.available_seats ?? data.total_seats;

  const [result] = await pool.query(
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

  if (result.affectedRows === 0) return null;

  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  return rows[0];
}

export async function deleteEvent(id) {
  const [result] = await pool.query("DELETE FROM events WHERE id=?", [id]);
  return result.affectedRows > 0;
}
