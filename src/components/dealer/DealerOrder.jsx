import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

const DealersOrder = () => {
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all cars
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

        const data = response.data;
        setCars(data);

        // Fetch orders for all cars
        fetchOrders(data.map(car => car._id));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCars();
  }, []);

  // Fetch orders for a list of car IDs
  const fetchOrders = async (carIds) => {
    try {
      const orderRequests = carIds.map(carId =>
        axiosInstance({
          url: `/order/orderss/${carId}`,
          method: 'GET',
        })
      );

      const responses = await Promise.all(orderRequests);
      const allOrders = responses.flatMap(response => response.data);
      setOrders(allOrders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-6xl mt-52">{error}</p>;

  // Get current date
  const currentDate = new Date();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        orders.map(order => {
          // Determine if the order is active or expired
          const isActive = new Date(order.endDate) >= currentDate;
          const status = isActive ? 'Active' : 'Expired';
          const statusClass = isActive ? 'text-green-600' : 'text-red-600';

          return (
            <div key={order._id} className="border-b mb-4 pb-4 justify-center items-center">
              <div className="p-6 md:p-12 lg:p-16 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
                <p className="text-lg text-gray-600">User ID: {order.userId}</p>
                <p className="text-lg text-gray-600">Order ID: {order._id}</p>

                <h2 className="text-2xl font-semibold text-gray-700">Order Details</h2>

                <p className="text-lg text-gray-600">Car Name: {order.car.name}</p>
                <p className="text-lg text-gray-600">Model: {order.car.model}</p>
                <p className="text-lg text-gray-600">Fuel Type: {order.car.fueltype}</p>
                <p className="text-lg text-gray-600">Rent per Day: ₹{order.car.price}</p>
                <p className="text-lg text-gray-600">Start Date: {new Date(order.startDate).toLocaleDateString()}</p>
                <p className="text-lg text-gray-600">End Date: {new Date(order.endDate).toLocaleDateString()}</p>
                <p className="text-lg font-semibold text-gray-800">Total Days: {order.totalDays}</p>
                <p className="text-lg font-semibold text-gray-800">Total Amount: ₹{order.totalAmount}</p>
                <p className="text-lg font-semibold text-gray-800">Pickup Location: {order.pickupLocation}</p>

                <p className={`text-xl font-semibold ${statusClass}`}>Status: {status}</p>
              </div>
            </div>
          );
        })
      )
      }
    </div>
  );
};

export default DealersOrder;









