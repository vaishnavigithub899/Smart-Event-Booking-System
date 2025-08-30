// src/middleware/requireAdmin.js
import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("No token provided in Authorization header");
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // ✅ safer than replace
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload || payload.role !== "admin") {
      console.warn("Access denied: user is not admin");
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    // ✅ attach user info
    req.user = payload;
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
