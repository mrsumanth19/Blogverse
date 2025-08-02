import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // ← properly logs out using AuthContext
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center font-[Outfit]">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          BlogVerse
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
            Home
          </Link>
          <Link to="/blogs" className="text-gray-700 hover:text-indigo-600 transition">
            Blogs
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-indigo-600 transition">
                Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none text-gray-700 hover:text-indigo-600"
              >
                <FaUserCircle className="text-2xl" />
                <span>{user.name || user.username}</span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
