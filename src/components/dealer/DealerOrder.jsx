import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';

const DealersOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const dealerId = localStorage.getItem('dealerId');
        
        if (!dealerId) {
          throw new Error('Your Garage is Empty');
        }

        const response = await axiosInstance({
          url: `/dealer/get-dealerscars/${dealerId}`,
          method: 'GET',
        });
        setCars(response.data);
        const data = response.data; // Assuming the data is in response.data.data
        if (data.length > 0) {
          const carId = data[0]._id; // Get the ID of the first car or modify as needed
          localStorage.setItem('carId', carId); 
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const carId = localStorage.getItem('carId'); 
        
        if (!carId) {
          throw new Error('No car ID found');
        }

        const response = await axiosInstance({
          url: `/order/orders/${carId}`,
          method: 'GET',
        });

        const data = response.data.data;
        setOrders(data);
        console.log("Fetched Orders:", data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-6xl mt-52">{error}</p>;

  return (
    <div className="p-6 md:p-12 lg:p-16 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Your Orders</h1>
      
      <ul>
        {orders.length > 0 ? (
          orders.map(order => (
            <li key={order._id} className="border-b mb-4 pb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">Car Details</h2>
                <img src={order.car.image} alt={order.car.name} className="w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0 md:mr-8" />
                <p className="text-lg text-gray-600">Car Name: {order.car.name}</p>
                <p className="text-lg text-gray-600">Make: {order.car.make}</p>
                <p className="text-lg text-gray-600">Model: {order.car.model}</p>
                <p className="text-lg text-gray-600">Fuel Type: {order.car.fueltype}</p>
                <p className="text-lg text-gray-600">Capacity: {order.car.capacity}</p>
                <p className="text-lg text-gray-600">Rent per Day: ₹{order.car.price}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">Order Details</h2>
                <p className="text-lg text-gray-600">Start Date: {new Date(order.startDate).toLocaleDateString()}</p>
                <p className="text-lg text-gray-600">End Date: {new Date(order.endDate).toLocaleDateString()}</p>
                <p className="text-lg font-semibold text-gray-800">Total Days: {order.totalDays}</p>
                <p className="text-lg font-semibold text-gray-800">Total Amount: ₹{order.totalAmount}</p>
                <p className="text-lg font-semibold text-gray-800">Pickup Location: {order.pickupLocation}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found</p>
        )}
      </ul>
    </div>
  );
};

export default DealersOrder;
