import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        className="h-[85vh] bg-[url('https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=1600&auto=format&fit=crop')] 
        bg-center bg-cover bg-fixed flex items-center relative"
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
          >
            Book <span className="text-pink-400">Experiences</span>.  
            Not Just Seats.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/90 max-w-2xl mx-auto mt-6 text-lg"
          >
            Discover concerts, workshops, sports, and more — with real-time seat
            availability and a seamless booking journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/events"
              className="mt-8 inline-block px-8 py-4 text-lg font-semibold text-white 
              bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg 
              hover:scale-105 hover:shadow-2xl transition-transform"
            >
              Explore Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-b from-white to-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why <span className="text-pink-600">SmartEvents?</span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Seats",
                desc: "Check availability instantly and never miss out.",
              },
              {
                title: "Smooth Checkout",
                desc: "Pay securely with a fast, user-friendly experience.",
              },
              {
                title: "Admin Controls",
                desc: "Manage events, bookings, and reports in one place.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-pink-200 
                hover:-translate-y-1 transition-all"
              >
                <h3 className="font-semibold text-xl text-gray-900">{f.title}</h3>
                <p className="text-gray-600 mt-3">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600"
            alt="Event Crowd"
            className="rounded-2xl shadow-xl"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">Your Event. Your Way.</h2>
            <p className="text-gray-600 mb-6">
              SmartEvents is built to make your booking journey effortless. From
              concerts to conferences, we ensure a smooth, reliable, and
              enjoyable experience.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-4xl font-extrabold text-pink-600">500+</h3>
                <p className="text-gray-500">Events hosted</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-pink-600">50K+</h3>
                <p className="text-gray-500">Tickets booked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular <span className="text-pink-600">Events</span>
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
              "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group rounded-2xl overflow-hidden shadow-lg"
              >
                <img src={src} alt="Event" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Loved by <span className="text-pink-600">Users</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Aarav Patel",
                quote:
                  "Booking my concert tickets was so easy with SmartEvents. Loved the smooth checkout!",
              },
              {
                name: "Priya Sharma",
                quote:
                  "I hosted a workshop and the admin dashboard gave me total control. Brilliant platform!",
              },
              {
                name: "Rohan Mehta",
                quote:
                  "Real-time seat availability saved me from FOMO. This is the future of event booking.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg"
              >
                <p className="text-gray-700 italic">"{t.quote}"</p>
                <h4 className="mt-4 font-semibold text-pink-600">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center">
        <h2 className="text-4xl font-bold">Ready to Experience More?</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Join SmartEvents today and book your next adventure in just a few clicks.
        </p>
        <Link
          to="/events"
          className="mt-8 inline-block px-10 py-4 text-lg font-semibold bg-white text-pink-600 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-white text-center">
        <p>© {new Date().getFullYear()} SmartEvents. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
