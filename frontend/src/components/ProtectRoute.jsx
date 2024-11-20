// ProtectRoute.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProtectRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Display a message if the user is not logged in
    return (
      <>
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <h2>User is not logged in</h2>
        <p>Please log in to access this page.</p>
        <Link
            to="/sign-up"
            className="text-blue-500 hover:underline"
            style={{ fontWeight: 'bold', fontSize: '16px' }}
          >
            Go to Sign-Up Page
          </Link>
      </div>
      </>
    );
  }
  // Render the children if the user is authenticated
  return children;
};

export default ProtectRoute;

