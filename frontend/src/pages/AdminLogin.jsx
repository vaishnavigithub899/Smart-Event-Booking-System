import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault(); // ✅ prevent form refresh
    setError(""); 

    try {
      const { data } = await api.post("/login", { email, password }); 
      // ✅ Make sure backend route prefix matches ("/auth/login")

      if (data?.token && data?.role === "admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id); // ✅ Save id also
        nav("/admin"); 
      } else {
        setError("You are not authorized as admin.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials or server error.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Admin Login
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input rounded-xl border border-gray-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input rounded-xl border border-gray-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary w-full rounded-xl py-3 font-semibold bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
          >
            Login
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
