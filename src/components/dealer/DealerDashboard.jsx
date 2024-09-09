import React from 'react';
import { Link } from 'react-router-dom';

const DealerDashboard = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg')" }} // Your car background image URL
    >
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 p-4">
       
      <h1 className="text-3xl font-bold text-white mb-8 md:text-4xl lg:text-5xl">
            WELCOME TO DEALER DASHBOARD
          </h1>
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:flex-wrap md:gap-6 md:justify-center">
          <Link to="/admin/add-car">
            <button className="w-full sm:w-48 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              ADD CAR
            </button>
          </Link>

          <Link to="/dealer/DealersGarrage">
            <button className="w-full sm:w-48 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500">
              YOUR GARRAGE
            </button>
          </Link>
          <Link to="/dealer/dealerEditCar">
            <button className="w-full sm:w-48 bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500">
              EDIT YOUR CAR
            </button>
          </Link>
          <Link to="/dealer/dealersOrder">
            <button className="w-full sm:w-48 bg-pink-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500">
              DEALINGS
            </button>
          </Link>


        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
