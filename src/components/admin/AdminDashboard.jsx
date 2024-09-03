import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg')" }} // Your car background image URL
    >
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="mb-12 text-3xl font-bold text-white">
          WELCOME TO ADMIN DASHBOARD
        </h1>
        
        <div className="flex gap-6">
          <Link to="/admin/add-car">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              ADD CARS
            </button>
          </Link>
          
          <Link to="/admin/dealers">
            <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500">
              DEALERS
            </button>
          </Link>
          
          <Link to="/admin/cars">
            <button className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500">
              CARS
            </button>
          </Link>

          <Link to="/admin/updatecar">
            <button className="bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500">
              UPDATE CAR
            </button>
          </Link>

          <Link to="/admin/removeCar">
            <button className="bg-pink-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500">
              REMOVE CAR
            </button>
          </Link>

          <Link to="/allorders">
            <button className="bg-orange-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500">
              CHECK ORDERS
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
