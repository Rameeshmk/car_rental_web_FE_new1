import React from 'react';
import { Link } from 'react-router-dom';

const DealerDashboard = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg')" }} // Your car background image URL
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-8">
            WELCOME TO DEALER DASHBOARD
          </h1>
          <Link to="/admin/add-car">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              ADD CAR
            </button>
          </Link>

          <Link to="/3">
            <button className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              YOUR GARRAGE
            </button>
          </Link>
          <Link to="/4">
            <button className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              EDIT YOUR CAR
            </button>
          </Link>
          <Link to="/5">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              DEALINGS
            </button>
          </Link>


        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
