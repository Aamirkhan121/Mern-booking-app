// import React, { useState } from 'react';
// import axios from "axios"

// const API_BASE_URL="http://localhost:4000"

// const Booking = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     checkInDate: '',
//     checkOutDate: '',
//     guests: 1,
//     roomType: 'standard'
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   const handleSubmit =async (e) => {
//     e.preventDefault();
//     try {
//         const response=await axios.post(`${API_BASE_URL}/api/bookings`, formData);
//         if (response.status===201) {
//             alert("Booking Successfully")
//         }
//     } catch (error) {
//         console.error('There was an error saving the booking:', error);
//         alert('Failed to save booking');
//     }
//     console.log('Booking details:', formData);
//     alert('Booking successful!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center mb-6">Book Your Stay</h2>
        
//         <form onSubmit={handleSubmit}>
//           {/* Full Name */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
//             <input 
//               id="name"
//               type="text" 
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleChange}
//               required 
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
//             <input 
//               id="email"
//               type="email" 
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required 
//             />
//           </div>

//           {/* Check-in Date */}
//           <div className="mb-4">
//             <label htmlFor="checkInDate" className="block text-gray-700 font-bold mb-2">Check-in Date</label>
//             <input 
//               id="checkInDate"
//               type="date" 
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={formData.checkInDate}
//               onChange={handleChange}
//               required 
//             />
//           </div>

//           {/* Check-out Date */}
//           <div className="mb-4">
//             <label htmlFor="checkOutDate" className="block text-gray-700 font-bold mb-2">Check-out Date</label>
//             <input 
//               id="checkOutDate"
//               type="date" 
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={formData.checkOutDate}
//               onChange={handleChange}
//               required 
//             />
//           </div>

//           {/* Number of Guests */}
//           <div className="mb-4">
//             <label htmlFor="guests" className="block text-gray-700 font-bold mb-2">Number of Guests</label>
//             <input 
//               id="guests"
//               type="number" 
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={formData.guests}
//               onChange={handleChange}
//               min={1}
//               required 
//             />
//           </div>

//           {/* Room Type */}
//           <div className="mb-6">
//             <label htmlFor="roomType" className="block text-gray-700 font-bold mb-2">Room Type</label>
//             <select 
//               id="roomType"
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={formData.roomType}
//               onChange={handleChange}
//             >
//               <option value="standard">Standard</option>
//               <option value="deluxe">Deluxe</option>
//               <option value="suite">Suite</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
//             Confirm Booking
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Booking;
