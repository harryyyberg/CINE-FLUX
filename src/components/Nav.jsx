import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Menu, X } from "lucide-react";

const Nav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Movies" },
    { to: "/watchlist", label: "Watchlist" },
    { to: "/watched", label: "Watched" },
  ];

  return (
    <nav className="w-full bg-rose-800 shadow-lg fixed top-0 left-0 z-20">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Film className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            MovieHub
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-4 md:space-x-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm sm:text-base md:text-lg transition ${
                location.pathname === link.to
                  ? "text-white border-b-2 border-rose-300 pb-1"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="sm:hidden bg-rose-700 px-4 pb-4 flex flex-col space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)} // close on click
              className={`text-base transition ${
                location.pathname === link.to
                  ? "text-white border-b-2 border-rose-300 pb-1"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
