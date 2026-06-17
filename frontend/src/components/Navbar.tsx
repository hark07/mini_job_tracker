import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">
          JobTracker
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link
            to="/"
            className={`transition ${
              isActive("/")
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/add"
            className={`px-4 py-2 rounded-md transition ${
              isActive("/add")
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            + Add Job
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`block ${
              isActive("/")
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/add"
            onClick={() => setOpen(false)}
            className={`block px-3 py-2 rounded-md ${
              isActive("/add")
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            + Add Job
          </Link>

        </div>
      )}
    </nav>
  );
}