import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white w-64">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/addroom" className="block py-2 px-4 rounded hover:bg-gray-700">
            Maintenance
            </Link>
          </li>
          <li>
            <Link to="/admin/booking" className="block py-2 px-4 rounded hover:bg-gray-700">
              Bookings
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className="block py-2 px-4 rounded hover:bg-gray-700">
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
