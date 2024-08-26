import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import axios from 'axios';
import { axiosInstance } from '../config/axiosInstance';

function FindNow() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carType, setCarType] = useState('All Make');
  const [filteredCars, setFilteredCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCars, setShowCars] = useState(false);
  const [dateRange, setDateRange] = useState('');

  useEffect(() => {
    // Fetch car data from API when component mounts
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance({
          url:'/dealer/get-cars',
        method:"GET",
        }); 


         
         setAllCars(Array.isArray(response.data) ? response.data : []);
         setFilteredCars(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError('Failed to fetch car data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    // Update date range display when startDate or endDate changes
    if (startDate && endDate) {
      setDateRange(`${format(startDate, 'MMMM d, yyyy')} - ${format(endDate, 'MMMM d, yyyy')}`);
    } else {
      setDateRange('');
    }
  }, [startDate, endDate]);

  const handleFindItNow = () => {
    if (startDate && endDate) {
      alert(`Searching for ${carType} from ${format(startDate, 'MMMM d, yyyy')} to ${format(endDate, 'MMMM d, yyyy')}`);
      filterCars();
      setShowCars(true);
    } else {
      alert('Please select both pick-up and drop-off dates.');
    }
  };

  const filterCars = () => {
    if (carType === 'All Make') {
      setFilteredCars(allCars);
    } else {
      const lowerCaseCarType = carType.toLowerCase();
      const filtered = allCars.filter(car => car.model.toLowerCase() === lowerCaseCarType);
      setFilteredCars(filtered);
    }
  };

  
  const groupedCars = filteredCars.reduce((acc, car) => {
    if (!acc[car.model]) {
      acc[car.model] = [];
    }
    acc[car.model].push(car);
    return acc;
  }, {});

  return (
    <div>
      {/* Get Started Section */}
      <section id="get-started" className='flex gap-4 w-full mt-16'>
        <div className='block'>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select pick-up date"
            className="flex border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="MMMM d, yyyy"
          />
          <label className="block text-white text-lg font-medium mb-2">
            Pick-up Date
          </label>
        </div>

        <div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Select drop-off date"
            className="border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="MMMM d, yyyy"
          />
          <label className="block text-white text-lg font-medium mb-2">
            Drop-off Date
          </label>
        </div>

        {/* Display Selected Dates */}
        {dateRange && (
          <p className="mt-4 text-white">
            Selected Dates: {dateRange}
          </p>
        )}

        {/* Dropdown Menu */}
        <div className='block '>
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-29"
          >
            <option value="All Make">All Make</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Van">Van</option>
          </select>
          <label className="block text-gray-700 text-lg text-white  font-medium mb-2">
            Car Type
          </label>
        </div>

        {/* Find It Now Button */}
        <button
          onClick={handleFindItNow}
          className="bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 h-10 w-1/2"
        >
          Find It Now
        </button>
      </section>

      {/* Display Filtered Cars */}
      {showCars && (
        <section id="filtered-cars" className='mt-8'>
          <h2 className="text-xl font-semibold mb-4 text-center">Available Cars</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div>
              {Object.keys(groupedCars).length > 0 ? (
                Object.keys(groupedCars).map(make => (
                  <div key={make} className='mb-8'>
                    <h3 className="text-lg font-semibold text-center mb-4">{make}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-16">
                      {groupedCars[make].map(car => (
                        <div key={car.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden m-6">
                          <img src={car.image || 'https://via.placeholder.com/400x250'} alt={car.name} className="w-full h-52 object-cover p-6" />
                          <div className="p-4">
                            <h4 className="text-lg font-semibold">{car.model}</h4>
                            <p className="text-gray-700">{car.make || 'No description available'}</p>
                            
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No cars available for the selected criteria.</p>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default FindNow;
