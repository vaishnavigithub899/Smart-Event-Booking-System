import { motion } from "framer-motion";

export default function EventCard({ ev, onOpen }) {
  const soldOut = Number(ev.available_seats) <= 0;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="card p-5 cursor-pointer rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition-all"
      onClick={onOpen}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg md:text-xl font-semibold text-black">{ev.title}</h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            soldOut
              ? "bg-red-200 text-red-800"
              : "bg-emerald-200 text-emerald-800"
          }`}
        >
          {soldOut ? "Sold Out" : `${ev.available_seats} left`}
        </span>
      </div>

      <p className="text-sm md:text-base text-gray-900 mt-2">
        {ev.location} • {new Date(ev.date).toLocaleString()}
      </p>

      <p className="mt-3 text-gray-800 line-clamp-4">{ev.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg md:text-xl font-bold text-black">₹ {ev.price}</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            soldOut ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
          }`}
          disabled={soldOut}
        >
          {soldOut ? "Unavailable" : "Book Now"}
        </motion.button>
      </div>
    </motion.div>
  );
}
