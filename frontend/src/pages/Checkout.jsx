import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import confetti from "canvas-confetti";

export default function Checkout() {
  const { id } = useParams();
  const [sp] = useSearchParams();
  const qty = Number(sp.get("qty") || 1);

  const [ev, setEv] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [paymentStatus, setPaymentStatus] = useState("");
  const nav = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch event details
  useEffect(() => {
    fetch(`${API_URL}/events/${id}`)
      .then(res => res.json())
      .then(data => setEv(data))
      .catch(console.error);
  }, [id]);

  const total = useMemo(() => (ev ? Number(ev.price) * qty : 0), [ev, qty]);

  async function submit() {
    if (!form.name || !form.email || !form.mobile) {
      return setPaymentStatus("Please fill all details");
    }

    setPaymentStatus(" payment SuccessFull");

    try {
      // 🕒 Fake delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 💳 Fake paymentResponse
      const fakePaymentResponse = {
        razorpay_payment_id: "fake_payment_" + Date.now(),
        razorpay_order_id: "fake_order_" + Date.now(),
        razorpay_signature: "fake_signature"
      };

      // ✅ Send booking to backend
      const bookingRes = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: Number(id),
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          quantity: qty,
          total_amount: total,
          ...fakePaymentResponse,
        }),
      });

      const bookingData = await bookingRes.json();

      // ✅ Show success first
      setPaymentStatus("Payment Successful 🎉");

      // 🎉 Fire confetti
      confetti({ particleCount: 160, spread: 75, origin: { y: 0.6 } });

      // ⏳ Small delay, then navigate
      setTimeout(() => {
        nav(`/success?bid=${bookingData.id}&amount=${bookingData.total_amount}&title=${encodeURIComponent(ev.title)}`);
      }, 1000);

    } catch (err) {
      setPaymentStatus("Booking failed.");
      console.error(err);
    }
  }

  if (!ev) return null;

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold">Your Details</h3>
          <div className="grid gap-3 mt-3">
            <input className="input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="input" placeholder="Mobile" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
          </div>
          <button
            disabled={paymentStatus === "Processing payment..."}
            className="btn btn-primary mt-4 w-full"
            onClick={submit}
          >
            {paymentStatus === "Processing payment..." ? "Please wait..." : `Pay ₹ ${total} & Book`}
          </button>
          {paymentStatus && <p className="mt-3 text-sm text-center text-gray-500">{paymentStatus}</p>}
        </div>

        <div className="card p-5">
          <h3 className="font-semibold">Summary</h3>
          <p className="mt-2">{ev.title}</p>
          <p className="text-sm text-gray-600">{ev.location} • {new Date(ev.date).toLocaleString()}</p>
          <p className="mt-3">Qty: <b>{qty}</b></p>
          <p>Price each: ₹ {ev.price}</p>
          <hr className="my-3" />
          <p className="text-lg font-semibold">Total: ₹ {total}</p>
        </div>
      </div>
    </div>
  );
}
