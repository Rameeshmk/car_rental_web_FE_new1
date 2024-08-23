import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const UsersCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    // Fetch car data from the API
    const fetchCars = async () => {
      try {
        const response = await axiosInstance({
          url: '/car/car-data',
          method: 'GET',
          params: {
              page: currentPage,
              limit: itemsPerPage,
          }
      });
        setCars(response.data.cars); 
        setTotalPages(response.data.totalPages); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600">Make: {car.make}</p>
              
              <Link
  to={`/car/${car._id}`}
  className="mt-4 inline-block px-4 py-2 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-transform transform hover:scale-105"
>
  Read More
</Link>

            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4 mb-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l"
        >
          Previous
        </button>

        <span className="px-4 py-2 bg-gray-200 text-gray-800">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersCars;
