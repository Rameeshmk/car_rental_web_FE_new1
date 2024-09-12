import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
//import axios from 'axios';
import { axiosInstance } from '../config/axiosInstance';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { state } = location;

  useEffect(() => {
    const sendOrderSummary = async () => {
      if (state) {
        try {
           await axiosInstance({
            url: '/order/orders',
            method: 'POST',
            data: {
              userId: state.userId,
              mobile:state.mobile,
              carId:state.carId,
              car: state.car,
              startDate: state.startDate,
              endDate: state.endDate,
              totalDays: state.totalDays,
              rentPerDay: state.rentPerDay,
              totalAmount: state.totalAmount,
              pickupLocation: state.pickupLocation,
            },
          });
        } catch (error) {
          console.error('Error saving order summary:', error);
        }
      }
    };

    sendOrderSummary();
  }, [state]);

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-red-500 text-xl">Order details not found.</p>
      </div>
    );
  }

  const { car, startDate, endDate, totalDays, rentPerDay, totalAmount, pickupLocation, userId,carId,mobile } = state;

  return (
    <div className="relative p-6 md:p-12 lg:p-16 max-w-4xl mx-auto shadow-lg rounded-lg">
      <button
        onClick={() => navigate('/home')} 
        className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
      >
        Go Back to Home
      </button>

      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Order Summary</h1>

      <p className="text-lg font-semibold text-gray-800">Your order is under process, we will contact at your moble number:{mobile} soon!</p>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Car Details</h2>
        <div className="flex flex-col md:flex-row items-center">
          <img src={car.image} alt={car.name} className="w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0 md:mr-8" />
          <div className="flex flex-col">
            <p className="text-xl font-semibold text-gray-800">Car Name: {car.name}</p>
            <p className="text-lg text-gray-600">Make: {car.make}</p>
            <p className="text-lg text-gray-600">Model: {car.model}</p>
            <p className="text-lg text-gray-600">Fuel Type: {car.fueltype}</p>
            <p className="text-lg text-gray-600">Capacity: {car.capacity}</p>
            
            <p className="text-lg font-semibold text-gray-800">Rent per Day: ₹ {car.price}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Booking Details</h2>
        <div className="space-y-2">
          <p className="text-lg text-gray-600">Start Date: {format(new Date(startDate), 'MMMM d, yyyy')}</p>
          <p className="text-lg text-gray-600">End Date: {format(new Date(endDate), 'MMMM d, yyyy')}</p>
          <p className="text-lg font-semibold text-gray-800">Total Days: {totalDays}</p>
          <p className="text-lg font-semibold text-gray-800">Total Amount: ₹ {totalAmount}</p>
          <p className="text-lg font-semibold text-gray-800">ID:  {userId}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pickup Location</h2>
        <p className="text-lg font-semibold text-gray-800 bg-gray-100 p-4 rounded-lg">
          {pickupLocation || 'Pickup location not provided'}
        </p>
      </div>
      <p className="text-lg font-semibold text-gray-800">Your order is under process, we will contact at your moble number:{mobile} soon!</p>
    </div>
  );
};

export default OrderSummary;
