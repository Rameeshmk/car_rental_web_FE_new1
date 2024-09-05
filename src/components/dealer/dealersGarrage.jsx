import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance({
          url: `/dealer/get-cars`,
          method: 'GET',
        });
       
        setCar(response.data);
        localStorage.setItem('dealerId', resData.dealerId); 
        sessionStorage.setItem("token",resData.token);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!car) return <p className="text-center text-gray-500">Car not found</p>;

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-8">
      <div className="flex-1 flex items-center justify-center lg:pr-8">
        <img src={car.image} alt={car.name} className="object-cover w-full lg:w-1/2 h-auto" />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{car.name}</h2>
        <p className="text-black">Make: {car.make}</p>
        <p className="text-black font-bold mt-2">₹{car.price}</p>
        <p className="text-black mt-2">Model: {car.model}</p>
        <p className="text-black">Fuel Type: {car.fueltype}</p>
        <p className="text-black">Capacity: {car.capacity}</p>
      </div>
    </div>
  );
};

export default CarDetails;
