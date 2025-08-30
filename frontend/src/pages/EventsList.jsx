import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import EventCard from "../components/EventCard";
import Filters from "../components/Filters";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocketEvents";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const nav = useNavigate();

  const fetchList = useCallback(async () => {
    try {
      const { data } = await api.get("/events");

      // Ensure we always have an array
      let rows = Array.isArray(data) ? data : [];

      // Apply filters
      if (filters.q) {
        const q = filters.q.toLowerCase();
        rows = rows.filter(r =>
          (r.title || "").toLowerCase().includes(q) ||
          (r.description || "").toLowerCase().includes(q)
        );
      }
      if (filters.location) {
        const q = filters.location.toLowerCase();
        rows = rows.filter(r => (r.location || "").toLowerCase().includes(q));
      }
      if (filters.date) {
        rows = rows.filter(r => (r.date || "").slice(0, 10) === filters.date);
      }

      setEvents(rows);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setEvents([]); // fallback to empty array if fetch fails
    }
  }, [filters]);

  useSocket(fetchList);

  useEffect(() => { fetchList(); }, [fetchList]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events, Book Now For Better Experience</h1>
      <Filters onChange={setFilters} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Array.isArray(events) && events.map(ev => (
          <EventCard key={ev.id} ev={ev} onOpen={() => nav(`/events/${ev.id}`)} />
        ))}
        {(!Array.isArray(events) || events.length === 0) && (
          <p className="text-gray-500 col-span-full text-center mt-4">No events found.</p>
        )}
      </div>
    </div>
  );
}
