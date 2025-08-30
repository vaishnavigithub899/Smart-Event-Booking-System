import { pool } from "../config/db.js";

export async function listBookings() {
  const [rows] = await pool.query("SELECT * FROM bookings ORDER BY booking_date DESC");
  return rows;
}
