import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../config/axiosInstance';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance({
          url: `/order/allorders`,
          method: "GET",
        });
        const data = response.data.data;
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-6xl mt-52"> {error}</p>;

  return (
    <div className="p-6 md:p-12 lg:p-16 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Orders</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order ID: {order._id}</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Car Details</h3>
              <p className="text-lg text-gray-600">Car Name: {order.car.name}</p>
              <p className="text-lg text-gray-600">Make: {order.car.make}</p>
              <p className="text-lg text-gray-600">Fuel Type: {order.car.fueltype}</p>
              <p className="text-lg text-gray-600">Rent per Day: ₹{order.car.price}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Order Details</h3>
              <p className="text-lg text-gray-600">Start Date: {new Date(order.startDate).toLocaleDateString()}</p>
              <p className="text-lg text-gray-600">End Date: {new Date(order.endDate).toLocaleDateString()}</p>
              <p className="text-lg font-semibold text-gray-800">Total Days: {order.totalDays}</p>
              <p className="text-lg font-semibold text-gray-800">Total Amount: ₹{order.totalAmount}</p>
              <p className="text-lg font-semibold text-gray-800">Pickup Location: {order.pickupLocation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
