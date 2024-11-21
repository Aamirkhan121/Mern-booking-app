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
<<<<<<< HEAD
     <header className=" z-99 sticky top-0 bg-blue-800 py-3 z-50 w-full shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 md:px-8">
=======
     <header className="sticky top-0 bg-blue-800 py-3 z-50 w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
>>>>>>> d9fa73de00d1a5d511431826dc15cd31cd89367d
        {/* Website Logo or Name */}
        <span className="text-white text-xl font-bold">
          <Link to="/" className="hover:text-gray-300 text-[15px] ml-[-12px]">
            Khanbooking.com
          </Link>
        </span>

        {/* Responsive Navigation Menu */}
        <div className="flex items-center space-x-4">
          <Link
            to="/profile"
            className="text-white hover:text-gray-300 flex items-center space-x-2"
          >
            <FaCircleUser className="w-6 h-6 md:w-8 md:h-8" />
            <p className="text-sm md:text-base text-center truncate">
              {user.name || 'Guest'}
            </p>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Links visible only when authenticated */}
              <Link
                to="/my-booking"
                className="text-white hover:text-gray-300 text-sm md:text-base"
              >
                My Booking
              </Link>
<<<<<<< HEAD
=======
              <Link
                to="/my-hotels"
                className="text-white hover:text-gray-300 text-sm md:text-base"
              >
                My Hotels
              </Link>
>>>>>>> d9fa73de00d1a5d511431826dc15cd31cd89367d
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 text-sm md:text-base rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-150"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
<<<<<<< HEAD
=======
              {/* Sign In and Sign Up Buttons */}
              <Link to="/sign-in">
                <button className="bg-blue-600 text-white font-bold py-2 px-6 text-sm md:text-base rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150">
                  Sign In
                </button>
              </Link>
>>>>>>> d9fa73de00d1a5d511431826dc15cd31cd89367d
              <Link to="/sign-up">
                <button className="bg-green-600 text-white font-bold py-2 px-6 text-sm md:text-base rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-150">
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
