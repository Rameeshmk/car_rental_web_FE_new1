
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickers from 'react-datepicker';
import { format } from 'date-fns';

function DatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carType, setCarType] = useState('All Make');

  const handleFindItNow = () => {
    alert(`Searching for ${carType} from ${format(startDate, 'MMMM d, yyyy')} to ${format(endDate, 'MMMM d, yyyy')}`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Get Started Section */}
      <section id="get-started" className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
        {/* Pick-up Date */}
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">Pick-up Date</label>
          <DatePickers
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select pick-up date"
            className="block w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="MMMM d, yyyy"
          />
        </div>

        {/* Drop-off Date */}
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">Drop-off Date</label>
          <DatePickers
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Select drop-off date"
            className="block w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="MMMM d, yyyy"
          />
        </div>

        {/* Car Type Dropdown */}
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-medium mb-2">Car Type</label>
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="block w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="All Make">All Make</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>
      </section>

      {/* Selected Dates Display */}
      {startDate && endDate && (
        <p className="mt-4 text-gray-600">
          Selected Dates: {format(startDate, 'MMMM d, yyyy')} - {format(endDate, 'MMMM d, yyyy')}
        </p>
      )}

      {/* Find It Now Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleFindItNow}
          className="bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 py-2 px-4 w-full sm:w-1/2 md:w-1/4"
        >
          Find It Now
        </button>
      </div>
    </div>
  );
}

export default DatePicker;






{/*import React from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import  { useState } from 'react';
import DatePickers from 'react-datepicker';
import { format } from 'date-fns';





function DatePicker() {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carType, setCarType] = useState('All Make');

  const handleFindItNow = () => {
    alert(`Searching for ${carType} from ${format(startDate, 'MMMM d, yyyy')} to ${format(endDate, 'MMMM d, yyyy')}`);
  };

  return (
    <div>
           {/* Get Started Section */}
          {/*} <section id="get-started" className='flex  gap-4 w-full'>
             <div className='block'>             
              <DatePickers
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select pick-up date"
                className="flex border  border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="MMMM d, yyyy"
              />
              <label className="block text-white-700 text-sm font-medium mb-2">
                Pick-up Date
              </label>
              </div>

              <div>
             
              <DatePickers
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select drop-off date"
                className="border  border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="MMMM d, yyyy"
              />
               <label className="block text-white-700 text-sm font-medium mb-2">
                Drop-off Date
              </label>
              </div>
              {startDate && endDate && (
                <p className="mt-4 text-gray-600">
                  Selected Dates: {format(startDate, 'MMMM d, yyyy')} - {format(endDate, 'MMMM d, yyyy')}
                </p>
              )}

           
               {/* Dropdown Menu */}
              {/*} <div className='block'>              
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="border  border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-29"
              >
                <option value="All make">All Make</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Convertible">Hatchback</option>
                </select>
                <label className="block text-white-700 text-sm font-medium mb-2">
                Car Type
              </label>
                </div>

                 {/* Find It Now Button */}
              {/*<button
                onClick={handleFindItNow}
                className="bg-blue-500  text-white  rounded-md shadow hover:bg-blue-600  h-10 w-1/2"
              >
                Find It Now
              </button>     
      </section>
    </div>
  )
}

export default DatePicker;*/}
