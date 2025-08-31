// src/pages/EventsList.jsx
import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocketEvents";
import { motion } from "framer-motion";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const nav = useNavigate();

  const fetchList = useCallback(async () => {
    try {
      const { data } = await api.get("/events");
      let rows = Array.isArray(data) ? data : [];

      // Filters
      if (filters.q) {
        const q = filters.q.toLowerCase();
        rows = rows.filter(
          (r) =>
            (r.title || "").toLowerCase().includes(q) ||
            (r.description || "").toLowerCase().includes(q)
        );
      }
      if (filters.location) {
        const q = filters.location.toLowerCase();
        rows = rows.filter((r) =>
          (r.location || "").toLowerCase().includes(q)
        );
      }
      if (filters.date) {
        rows = rows.filter((r) => (r.date || "").slice(0, 10) === filters.date);
      }

      setEvents(rows);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setEvents([]);
    }
  }, [filters]);

  useSocket(fetchList);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-lg">
        🎶 Upcoming Music Events
      </h1>

      {/* Filters */}
      <div className="mb-8 flex justify-center">
        {/* Agar tumhara Filters component ready hai toh use karo, warna simple input */}
        {/* Example placeholder */}
        {/* <Filters onChange={setFilters} /> */}
        <input
          type="text"
          placeholder="Search events..."
          className="px-4 py-2 rounded-xl w-1/2 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(events) &&
          events.map((ev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 hover:scale-105 transition-transform"
              onClick={() => nav(`/events/${ev.id}`)}
            >
              <h2 className="text-2xl font-semibold mb-3 text-pink-400 drop-shadow-md">
                {ev.title}
              </h2>
              <p className="mb-4 text-gray-200">{ev.description}</p>
              <div className="text-sm text-gray-300 mb-4">
                📍 {ev.location} <br />
                📅 {new Date(ev.date).toLocaleString()} <br />
                🎟️ Price: ₹{ev.price} <br />
                🎫 Seats Left: {ev.available_seats}/{ev.total_seats}
              </div>
              <button className="w-full py-2 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-colors">
                Book Now
              </button>
            </motion.div>
          ))}

        {(!Array.isArray(events) || events.length === 0) && (
          <p className="text-gray-400 col-span-full text-center text-lg mt-4">
            No events found 🎧
          </p>
        )}
      </div>
    </div>
  );
}
