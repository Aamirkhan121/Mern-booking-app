import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useSearchParams} from "react-router-dom"

const PaymentSuccessful = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };
  const searchQuery=useSearchParams()[0]
  console.log(searchQuery.get("reference"))
  const referenceNum=searchQuery.get("reference")

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p>Reference No.{referenceNum}</p>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your payment. Your transaction was completed successfully.
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={handleHomeRedirect}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
