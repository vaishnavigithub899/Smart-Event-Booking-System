import { useEffect, useState } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "", description: "", location: "",
    date: "", total_seats: 50, available_seats: 50, price: 499
  });
  const [bookings, setBookings] = useState([]);
  const [hasBookingsApi, setHasBookingsApi] = useState(true);
  const [status, setStatus] = useState("");

  async function loadEvents() {
    const token = localStorage.getItem("token");
    try {
      const { data } = await api.get("/events", { headers: { Authorization: `Bearer ${token}` } });
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load events:", err);
      setEvents([]);
    }
  }

  async function tryLoadBookings() {
    const token = localStorage.getItem("token");
    try {
      const { data } = await api.get("/bookings", { headers: { Authorization: `Bearer ${token}` } });
      setBookings(Array.isArray(data) ? data : []);
      setHasBookingsApi(true);
    } catch (err) {
      console.warn("Bookings API not available:", err);
      setHasBookingsApi(false);
    }
  }

  useEffect(() => { loadEvents(); tryLoadBookings(); }, []);

  function startEdit(ev) {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      description: ev.description,
      location: ev.location,
      date: ev.date?.slice(0,16),
      total_seats: ev.total_seats,
      available_seats: ev.available_seats,
      price: ev.price
    });
  }

  async function save() {
    const token = localStorage.getItem("token");
    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, form, { headers: { Authorization: `Bearer ${token}` } });
        setStatus("🎉 Event updated!");
      } else {
        await api.post("/events", form, { headers: { Authorization: `Bearer ${token}` } });
        setStatus("🎉 Event created!");
      }

      // Reload events & reset form
      loadEvents();
      setEditingId(null);
      setForm({ title:"", description:"", location:"", date:"", total_seats:50, available_seats:50, price:499 });

      // Clear status after 2s
      setTimeout(() => setStatus(""), 2000);

    } catch(err) {
      console.error(err);
      setStatus("❌ Failed to save event");
    }
  }

  async function remove(id) {
    if (!confirm("Delete this event?")) return;
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      loadEvents();
      setStatus("🗑️ Event deleted!");
      setTimeout(() => setStatus(""), 2000);
    } catch(err) {
      console.error(err);
      setStatus("❌ Failed to delete event");
    }
  }

  return (
    <div className="container py-12">
      {/* Dashboard Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-10 text-center tracking-wide uppercase text-gray-900"
      >
        🎤 Admin Dashboard
      </motion.h1>

      <div className="md:flex gap-10">
        {/* Event Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 flex-shrink-0 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)] transition-shadow"
        >
          <h2 className="text-2xl font-bold mb-5 uppercase tracking-wider">
            {editingId ? "🎶 Edit Event" : "🔥 Create Event"}
          </h2>

          {status && <p className="text-green-600 font-medium mb-2">{status}</p>}

          <div className="flex flex-col gap-4">
            <input className="input rounded-xl focus:ring-2 focus:ring-black/60" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
            <textarea className="input rounded-xl h-24 focus:ring-2 focus:ring-black/60" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
            <input className="input rounded-xl focus:ring-2 focus:ring-black/60" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/>
            <input className="input rounded-xl focus:ring-2 focus:ring-black/60" type="datetime-local" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
            <div className="grid grid-cols-3 gap-3">
              <input className="input rounded-xl" type="number" placeholder="Total seats" value={form.total_seats} onChange={e=>setForm({...form, total_seats:Number(e.target.value)})}/>
              <input className="input rounded-xl" type="number" placeholder="Available" value={form.available_seats} onChange={e=>setForm({...form, available_seats:Number(e.target.value)})}/>
              <input className="input rounded-xl" type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})}/>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={save}
                className="btn btn-primary flex-1 text-lg py-2 hover:scale-105 transition-transform"
              >
                {editingId ? "Update 🎧" : "Create 🎵"}
              </button>

              {editingId && (
                <button
                  className="btn flex-1 py-2 hover:scale-105 transition-transform"
                  onClick={()=>{
                    setEditingId(null);
                    setForm({ title:"", description:"", location:"", date:"", total_seats:50, available_seats:50, price:499 });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 flex-1 overflow-y-auto max-h-[70vh]"
        >
          <h2 className="text-2xl font-bold mb-5 uppercase tracking-wider">🎟️ Events</h2>
          {events.length === 0 ? <p className="text-gray-500 text-center mt-6 italic">No events yet.</p> :
          <ul className="divide-y">
            {events.map(ev=>(
              <li key={ev.id} className="py-4 flex items-start justify-between gap-4 hover:bg-gray-50 rounded-lg px-3 transition">
                <div>
                  <div className="font-semibold text-lg">{ev.title}</div>
                  <div className="text-sm text-gray-600">
                    📍 {ev.location} • {new Date(ev.date).toLocaleString()} • 💰 ₹{ev.price} • 🎫 Left: {ev.available_seats}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-sm hover:scale-105" onClick={()=>startEdit(ev)}>Edit</button>
                  <button className="btn btn-sm hover:scale-105" onClick={()=>remove(ev.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>}
        </motion.div>
      </div>

      {/* Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 mt-10 overflow-x-auto"
      >
        <h2 className="text-2xl font-bold mb-5 uppercase tracking-wider">📑 Bookings</h2>
        {!hasBookingsApi ? (
          <p className="text-gray-600 text-sm italic">
            The backend doesn’t expose <code>GET /bookings</code> yet. Track via seat counts.
          </p>
        ) : (
          <table className="min-w-full text-sm table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Event</th>
                <th className="p-2">Name</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b=>(
                <tr key={b.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-2">{b.id}</td>
                  <td className="p-2">{b.event_id}</td>
                  <td className="p-2">{b.name}</td>
                  <td className="p-2">{b.quantity}</td>
                  <td className="p-2">₹{b.total_amount}</td>
                  <td className="p-2">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
