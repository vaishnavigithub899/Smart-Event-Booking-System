// src/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
});

// TEST CONNECTION
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("MySQL connected successfully!");
    conn.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
  }
})();
