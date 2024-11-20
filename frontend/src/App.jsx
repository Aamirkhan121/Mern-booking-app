import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
// import Booking from './pages/Booking';
import Footer from './components/Footer';
import FAQ from './pages/FAQ';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import ProtectRoute from './components/ProtectRoute';
// import { ImSpinner9 } from "react-icons/im";
import ProfileUpdate from './components/ProfileUpdate';
// import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './components/HomeScreen';
import BookingScreen from './components/BookingScreen';
import PaymentSuccessful from './pages/PaymentSuccessful';
import MyBookings from './pages/MyBooking';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false)
    }
    setLoading(false)
  }, []);

  const handleLogin = async() => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    // localStorage.setItem('email',email)
  };

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('isVerified');
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('email');
    localStorage.removeItem("expirationTime");
    
    setIsAuthenticated(false);
    // Update authentication state in the app
  };
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Layout isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/book' element={<Booking />} /> */}
        <Route path='/faq' element={<FAQ />} />
        <Route path='/sign-in' element={<SignIn handleLogin={handleLogin} />} />
        <Route path='/sign-up' element={<SignUp handleLogin={handleLogin} />} />
        <Route path='/verifyemail' element={<VerifyEmail />} />
        <Route path='/paymentsuccess' element={<PaymentSuccessful />} />
          <Route path='/homescreen' element={<HomeScreen />} />
          <Route path='/book/:roomid' element={<ProtectRoute isAuthenticated={isAuthenticated}>
            <BookingScreen/>
          </ProtectRoute> }/>
          <Route path='/my-booking' element={<ProtectRoute isAuthenticated={isAuthenticated}>
            <MyBookings/>
          </ProtectRoute> }/>

        <Route path='/profile' element={<ProtectRoute isAuthenticated={isAuthenticated}>
          <Profile />
          </ProtectRoute>} />
          <Route path='/profileupdate' element={<ProfileUpdate/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;



