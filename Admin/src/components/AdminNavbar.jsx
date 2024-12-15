import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-gray-800 text-white w-full fixed top-0 left-0 z-10">
      <div className="container mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold">Admin Panel</h1>

        {/* Hamburger Menu for Small Screens */}
        <button
          className="text-white text-xl md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-gray-800 md:flex space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-0 transition-all duration-300 ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <Link
              to="/"
              className="block md:inline py-2 px-4 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addroom"
              className="block md:inline py-2 px-4 rounded hover:bg-gray-700"
            >
              Maintenance
            </Link>
          </li>
          <li>
            <Link
              to="/admin/booking"
              className="block md:inline py-2 px-4 rounded hover:bg-gray-700"
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block md:inline py-2 px-4 rounded hover:bg-gray-700"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/reports"
              className="block md:inline py-2 px-4 rounded hover:bg-gray-700"
            >
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
