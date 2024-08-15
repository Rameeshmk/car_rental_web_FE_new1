// src/components/CarDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { format, differenceInDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/car/cars/${id}`);
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!car) return <p className="text-center text-gray-500">Car not found</p>;

  // Calculate total days
  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;

  // Calculate total amount
  const rentPerDay = car.price || 2000; // Use car's price if available, otherwise default to 2000
  const totalAmount = totalDays * rentPerDay;

  return (
    <div className='flex'>
      <div className="mr-20 ml-32 mt-20">
        <img src={car.image} alt={car.name} className="object-cover" />
      </div>
      <div className='w-full ml-0 pl-0 justify-end items-end'>
        <div className='flex w-full pr-0 mr-0 mt-10'>
          <div className="mt-6 pr-0 mr-0 w-3/12 border-t border-black border-gray-300 my-4 mx-auto" />
          <div className="pr-0 mr-0 flex text-4xl pl-0">Car Info</div>
          <div className="pl-0 ml-0 pr-10 mr-40 mt-6 w-3/12 border-t border-black border-gray-300 my-4 mx-auto" />
        </div>

        <div className='flex justify-end items-end mr-40'>
          <div className="">
            <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
            <p className="text-gray-600">Make: {car.make}</p>
            <p className="text-gray-900 font-bold mt-2">${car.price}</p>
            <p className="text-gray-700 mt-4">{car.model}</p>
            <p className="text-gray-600">Fuel Type: {car.fueltype}</p>
            <p className="text-gray-600">Capacity: {car.capacity}</p>
          </div>
        </div>

        <div className='flex w-full pr-0 mr-0'>
          <div className="mt-6 pr-0 mr-0 w-2/12 border-t border-black border-gray-300 my-4 mx-auto" />
          <div className="text-4xl">Selected Time Slots</div>
          <div className="pl-0 ml-0 pr-10 mr-40 mt-6 w-2/12 border-t border-black border-gray-300 my-4 mx-auto" />
        </div>

        <section id="get-started" className='block justify-center ml-10 gap-4 w-full mt-6'>
          <div className='flex justify-center ml-2 gap-4 w-full'>
            <div className='flex pl-20 mr-10'>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select pick-up date"
                className="flex border w-80 border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            <div className='flex'>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select drop-off date"
                className="border border-gray-300 p-2 w-80 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="MMMM d, yyyy"
              />
            </div>
          </div>

          <div className=''>
            <div className='flex justify-end pr-52'>
              {startDate && endDate && (
                <p className="flex mt-4 text-gray-600 border border-red border-red-300 rounded-md mb-4 h-20 items-center justify-center px-10">
                  Selected Dates: {format(startDate, 'MMMM d, yyyy')} - {format(endDate, 'MMMM d, yyyy')}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className='flex justify-end items-end'>
          <div className='block mr-40'>
            <label className="block text-lg mb-6">
              Total Days: {totalDays}
            </label>
            <label className="block text-white-700 text-sm font-medium text-lg mb-6">
              Rent Per Day: {rentPerDay} rs
            </label>
            <label className="block text-white-700 text-xl font-medium mt-14">
              Total Amount: {totalAmount} RS
            </label>
            <button
                onClick={(event) =>{
                  console.log('Button clicked with carId:', car._id);    
                  paymentHandler(event, car._id); 
                }}
                className="rounded-lg bg-blue-500 px-2 py-1 text-white mt-6 "
              >
                Pay now
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
