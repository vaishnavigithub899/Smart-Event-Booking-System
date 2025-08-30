import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          SmartEvents
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/events"
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-pink-100 transition font-medium"
          >
            Events
          </Link>

          {!token ? (
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100 transition font-medium"
            >
              Admin
            </Link>
          ) : (
            <>
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-green-100 transition font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  nav("/");
                }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-100 transition font-medium"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}

          {/* CTA */}
          <Link
            to="/events"
            className="ml-2 px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}