// src/controllers/auth.controller.js
import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    // ✅ Correct column names (your DB must have users table with email + password_hash + role)
    const [rows] = await pool.query("SELECT id, email, password_hash, role FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) {
      console.log(`Login failed: User not found for email ${email}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.password_hash) {
      console.error(`DB error: password_hash missing for user ${email}`);
      return res.status(500).json({ message: "Server error" });
    }

    // ✅ bcrypt compare
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for ${email}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ JWT token
    const token = signToken({ id: user.id, role: user.role });

    // ✅ Send secure response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      id: user.id
    });

  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
