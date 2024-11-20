import React from 'react';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        {/* FAQ Section */}
        <div className="space-y-6">
          
          {/* Question 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">How do I make a hotel booking?</h3>
            <p className="text-gray-600">
              To book a hotel, simply navigate to our "Book a Room" page, select your desired dates, and follow the instructions to confirm your booking.
            </p>
          </div>

          {/* Question 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Can I cancel or modify my booking?</h3>
            <p className="text-gray-600">
              Yes, you can modify or cancel your booking by contacting our support team or by visiting the "Manage My Booking" section. Please note that cancellation policies may vary depending on the hotel.
            </p>
          </div>

          {/* Question 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">What payment methods are accepted?</h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and other secure online payment methods. You can select your preferred payment option during the booking process.
            </p>
          </div>

          {/* Question 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Is there a fee for making a booking?</h3>
            <p className="text-gray-600">
              No, there is no additional fee for making a booking through our platform. However, some hotels may have their own service fees which will be clearly mentioned during the booking process.
            </p>
          </div>

          {/* Question 5 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Do I need to pay in advance?</h3>
            <p className="text-gray-600">
              Most of our hotels require payment at the time of booking, but some may allow you to pay upon arrival. The payment conditions will be outlined during the booking process.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;
