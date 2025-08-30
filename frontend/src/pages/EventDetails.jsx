import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";

export default function EventDetails() {
  const { id } = useParams();
  const [ev, setEv] = useState(null);
  const [qty, setQty] = useState(1);
  const nav = useNavigate();

  async function load() {
    const { data } = await api.get(`/events/${id}`);
    setEv(data);
  }
  useEffect(() => { load(); }, [id]);

  if (!ev) return null;

  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(ev.location)}&output=embed`;

  return (
    <div className="container py-12">
      <Link to="/events" className="text-sm text-blue-600 hover:underline">← Back to events</Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Event Details Card */}
        <div className="card p-8 bg-white shadow-xl rounded-3xl border border-gray-200 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-pink-600">{ev.title}</h1>
            <p className="text-gray-700 mb-4">{ev.location} • {new Date(ev.date).toLocaleString()}</p>
            <p className="mb-4">{ev.description}</p>
            <p className="font-semibold text-lg mb-2 text-green-600">Price: ₹ {ev.price}</p>
            <p className="text-sm text-gray-600 mb-4">Available seats: {ev.available_seats}</p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="number"
              className="input w-32 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300"
              min={1}
              max={ev.available_seats}
              value={qty}
              onChange={e=>setQty(Number(e.target.value))}
            />
            <button
              onClick={() => nav(`/checkout/${id}?qty=${qty}`)}
              className="btn btn-primary px-6 py-2"
              disabled={!ev.available_seats}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

        {/* Map Card */}
        <div className="card rounded-3xl overflow-hidden shadow-xl border border-gray-200">
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
