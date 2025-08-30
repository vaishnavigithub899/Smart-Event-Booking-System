import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Success() {
  const [sp] = useSearchParams();
  const [qr, setQr] = useState("");
  const bid = sp.get("bid");
  const amount = sp.get("amount");
  const title = decodeURIComponent(sp.get("title") || "Event");

  const payload = useMemo(() => JSON.stringify({
    booking_id: bid,
    event: title,
    amount,
  }), [bid, amount, title]);

  useEffect(() => {
    QRCode.toDataURL(payload).then(setQr);

    // 🎊 Confetti fire on load
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, [payload]);

  return (
    <div className="container py-10 text-center">
      {/* ✅ Animated Tick */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 bg-green-100 w-24 h-24 flex items-center justify-center rounded-full"
      >
        <span className="text-4xl">✅</span>
      </motion.div>

      {/* 🎉 Booking confirmed text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-green-700"
      >
        Payment Successful 🎉
      </motion.h1>

      <p className="mt-2 text-gray-600">Booking ID: {bid}</p>
      <p className="mt-1">Amount Paid: ₹ {amount}</p>
      <p className="mt-1 font-medium">Event: {title}</p>

      {qr && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-col items-center"
        >
          <img src={qr} alt="ticket qr" className="w-48 h-48 border rounded-xl shadow" />
          <a
            href={qr}
            download={`ticket_${bid}.png`}
            className="btn btn-primary mt-3"
          >
            Download Ticket (QR)
          </a>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8"
      >
        <Link to="/events" className="btn">
          Book More
        </Link>
      </motion.div>
    </div>
  );
}
