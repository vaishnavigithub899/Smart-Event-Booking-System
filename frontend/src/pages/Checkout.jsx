import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function Checkout() {
  const { id } = useParams();
  const [sp] = useSearchParams();
  const qty = Number(sp.get("qty") || 1);

  const [ev, setEv] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const total = useMemo(() => (ev ? Number(ev.price) * qty : 0), [ev, qty]);

  // Fake fetch event details
  useEffect(() => {
    // Replace this with your actual event or just fake data
    setEv({
      id,
      title: "Awesome Event",
      price: 500,
      location: "New Delhi",
      date: new Date().toISOString(),
    });
  }, [id]);

  function submit() {
    if (!form.name || !form.email || !form.mobile) {
      return setStatus("⚠️ Please fill all details");
    }

    setLoading(true);
    setStatus("⏳ Saving your booking...");

    // Simulate successful booking after 1.2s
    setTimeout(() => {
      const fakeBookingId = Math.floor(Math.random() * 1000000);
      setStatus("✅ Booking Confirmed!");
      setLoading(false);

      // Redirect to success page
      setTimeout(() => {
        nav(
          `/success?bid=${fakeBookingId}&amount=${total}&title=${encodeURIComponent(ev.title)}`
        );
      }, 800);
    }, 1200);
  }

  if (!ev) return null;

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Checkout
        </h1>
        <p className="text-gray-500">Complete your booking below</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* User Details */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🎟️ Your Details</h2>
          <div className="grid gap-4">
            <input
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-400"
              placeholder="Full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-400"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-400"
              placeholder="Mobile"
              value={form.mobile}
              onChange={e => setForm({ ...form, mobile: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            onClick={submit}
            className={`mt-6 w-full py-3 rounded-2xl font-bold text-white transition-all 
              ${loading ? "bg-gray-400" : "bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 shadow-lg shadow-pink-300/50"}`}
          >
            {loading ? "Processing..." : `Book for ₹${total}`}
          </button>

          {status && (
            <p className="mt-4 text-center text-sm font-medium text-gray-600">
              {status}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📋 Order Summary</h2>
          <p className="text-lg font-bold">{ev.title}</p>
          <p className="text-sm text-gray-600">
            {ev.location} • {new Date(ev.date).toLocaleString()}
          </p>
          <div className="mt-4 space-y-2">
            <p>Qty: <b>{qty}</b></p>
            <p>Price each: ₹{ev.price}</p>
            <hr className="my-3" />
            <p className="text-lg font-bold text-green-600">Total: ₹{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
