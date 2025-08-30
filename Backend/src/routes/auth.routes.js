// src/routes/auth.routes.js
import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router();

// ✅ Login route
router.post("/login", login);

// ✅ (Optional but recommended) - health check route
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Auth service running" });
});

export default router;
