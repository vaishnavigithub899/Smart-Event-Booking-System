import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">SmartEvents</h2>
          <p className="text-sm">
            Your one-stop platform for hassle-free event booking.  
            Smart, secure & seamless.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/events" className="hover:text-purple-400">Events</Link></li>
            <li><Link to="/admin/login" className="hover:text-purple-400">Admin</Link></li>
            <li><Link to="/admin" className="hover:text-purple-400">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p>Email: support@smartevents.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Gwalior, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} SmartEvents. All Rights Reserved.
      </div>
    </footer>
  );
}
