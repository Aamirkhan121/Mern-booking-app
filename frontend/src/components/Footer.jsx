import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    {/* About Section */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">About Us</h3>
                        <p className="text-gray-400">
                            Welcome to our hotel booking platform, where comfort and convenience meet affordability.
                            We offer a seamless and secure booking experience, connecting you to the best accommodations worldwide.
                            Whether for business or leisure, we ensure a memorable stay tailored to your needs.
                            Trust us to make your travel experience stress-free and enjoyable.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2">
                                <a href="/about" className="text-gray-400 hover:text-white">About</a>
                            </li>
                            <li className="mb-2">
                                <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
                            </li>
                            <li className="mb-2">
                                <a href="/faq" className="text-gray-400 hover:text-white">FAQ</a>
                            </li>
                            <li className="mb-2">
                                <a href="/booking" className="text-gray-400 hover:text-white">Book a Room</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul>
                            <li className="mb-2">
                                <a href="tel:+91 7369041570" className="text-gray-400 hover:text-white">Phone: +123-456-7890</a>
                            </li>
                            <li className="mb-2">
                                <a href="mailto:mdaamirkhan759@gmail.com" className="text-gray-400 hover:text-white">Email: info@hotelbooking.com</a>
                            </li>
                            <li className="mb-2">
                                <p className="text-gray-400">123 Hotel Lane, City, Country</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-center text-gray-500 mt-8">
                    <p>&copy; {new Date().getFullYear()} Hotel Booking. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
