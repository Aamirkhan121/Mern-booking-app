import { Link } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { useState, useEffect } from 'react';

const Header = ({ isAuthenticated, handleLogout }) => {
  const [user, setUser] = useState({
    name: localStorage.getItem('firstName'),
  });

  useEffect(() => {
    // Whenever the page reloads or the component mounts, fetch the latest user data from localStorage
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const storedEmail = localStorage.getItem('email');

    // Update state whenever the localStorage is changed
    setUser({
      name: storedFirstName,
      lastName: storedLastName,
      email: storedEmail,
    });
  }, [localStorage.getItem('firstName')]); // Dependency array makes sure it reruns when the firstName in localStorage changes

  return (
    <header className="sticky top-0 bg-blue-800 py-4 z-50 w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Website Logo or Name */}
        <span className="text-white text-xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Khanbooking.com
          </Link>
        </span>

        <div className="flex items-center space-x-3">
          <Link to="/profile" className="text-white hover:text-gray-300 flex items-center space-x-2">
            <FaCircleUser className="w-6 h-6 md:w-8 md:h-8" /> 
            <p className="text-white text-sm md:text-base text-center">{user.name}</p>
          </Link>

          {/* Profile Icon (always visible) */}
          {isAuthenticated ? (
            <>
              <Link to="/my-booking" className='text-white'>My Booking</Link>
              <Link to="/my-hotels" className='text-white'>My Hotels</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition ease-in-out duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              {/* Sign In Button */}
              <Link to="/sign-in">
                <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition ease-in-out duration-150">
                  Sign In
                </button>
              </Link>
              {/* Sign Up Button */}
              <Link to="/sign-up">
                <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition ease-in-out duration-150">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
