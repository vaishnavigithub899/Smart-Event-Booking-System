import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";

export default function EventDetails() {
  const { id } = useParams();
  const [ev, setEv] = useState(null);
  const [qty, setQty] = useState(1);
  const nav = useNavigate();

  async function load() {
    try {
      const { data } = await api.get(`/events/${id}`);
      setEv(data);
    } catch (err) {
      console.error("Failed to load event", err);
    }
  }

  useEffect(() => { load(); }, [id]);

  if (!ev) return <p className="text-center py-10 text-gray-500">Loading event...</p>;

  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(ev.location)}&output=embed`;

  return (
    <div className="container py-12">
      {/* Back link */}
      <Link 
        to="/events" 
        className="inline-block mb-6 text-sm font-medium text-indigo-600 hover:underline"
      >
        ← Back to Events
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left Side - Event Info */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">{ev.title}</h1>
          <p className="text-gray-500 mb-4">
            {ev.location} • {new Date(ev.date).toLocaleString()}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">{ev.description}</p>

          <div className="space-y-2 mb-6">
            <p className="text-lg font-semibold text-green-600">₹ {ev.price}</p>
            <p className="text-sm text-gray-600">
              Available Seats: {ev.available_seats}
            </p>
          </div>

          {/* Quantity + Checkout */}
          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              max={ev.available_seats}
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => nav(`/checkout/${id}?qty=${qty}`)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={!ev.available_seats}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <iframe
            title="map"
            src={mapsUrl}
            className="w-full h-full min-h-[400px]"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
