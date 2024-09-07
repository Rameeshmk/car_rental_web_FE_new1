import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const DealersGarrage = () => {
  const { id } = useParams(); // Get the car ID from the URL (if needed)
  const [cars, setCars] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const dealerId = localStorage.getItem('dealerId');
        
        if (!dealerId) {
          throw new Error('Your Garrage is Empty');
        }

        const response = await axiosInstance({
          url: `/dealer/get-dealerscars/${dealerId}`,
          method: 'GET',
        });
        const data = response.data.data; // Assuming the data is in response.data.data
        setCars(response.data);
        console.log(response.data);
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  

  return (
    <div className="p-4">
      {cars &&
      cars.map((car) => (
        <div key={car._id} className="flex flex-col lg:flex-row p-4 gap-8 mb-4 border border-gray-300 rounded-lg shadow-md">
          <div className="flex-1 flex items-center justify-center lg:pr-8">
            <img src={car.image} alt={car.name} className="object-cover w-full lg:w-1/5 h-auto" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{car.name}</h2>
            <p className="text-black">Make: {car.make}</p>
            <p className="text-black font-bold mt-2">Rent Per Day ₹{car.price}</p>
            <p className="text-black mt-2">Model: {car.model}</p>
            <p className="text-black">Fuel Type: {car.fueltype}</p>
            <p className="text-black">Capacity: {car.capacity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealersGarrage;









