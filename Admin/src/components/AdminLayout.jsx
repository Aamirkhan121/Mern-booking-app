import React from 'react';
import AdminNavbar from './AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="pt-16 flex-1 bg-gray-100 p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
