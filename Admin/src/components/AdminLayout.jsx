import React from 'react';
import AdminNavbar from './AdminNavbar';


const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <div className="w-64 bg-gray-800 text-white fixed top-0 left-0 h-full">
      <AdminNavbar />
      </div>

      {/* Main content area */}
      <div className="ml-64 flex-1 overflow-y-auto bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
