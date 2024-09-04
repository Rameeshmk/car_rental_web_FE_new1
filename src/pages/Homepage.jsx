
import React, { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';


import DatePickers from '../components/datepicker/DatePickers';
import UsersCars from '../../src/components//car/UsersCars.jsx';
import FindNow from '../pages/FindNow.jsx';
import UserReviewForm from '../components/userreview/UserReviewForm.jsx';



const Homepage = () => {
  

  return (
    <div>
    <div className="relative overflow-hidden sm:mx-auto">
    
      <div className="absolute inset-0 -z-10 sm:mx-auto">
        <img
          src="https://img.lovepik.com/photo/48007/1912.jpg_wh860.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      
      <section className="relative flex items-center justify-center h-screen text-center bg-gray-800 bg-opacity-60 text-white">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Welcome to Our Car Rental Service</h1>
          <p className="text-lg sm:text-xl mb-6">Find the perfect car for your next adventure.</p>
        
          <h2 className="text-3xl font-bold mb-8">Ready to Rent Your Dream Car?</h2>

          <div>
            <FindNow/>
          </div>
          <div className='mt-8 mb-3'>
          <UserReviewForm/>
          </div>


        </div>
      </section>
    
     
    </div>

    <div>
    <h1 className="flex  my-14 text-white items-center justify-center bg-black text-4xl font-bold text-center mb-8">BOOK YOUR VEHICLES</h1>
  </div>
<div>
<h1 className="flex my-32 items-center justify-center bg-white text-2xl font-thin text-center mb-8">RELIABLE VEHICLE HIRE,AS LOW AS PRICE 23/DAY</h1>
</div>
  <div>
  <h1 className="flex  items-center justify-center bg-white text-6xl font-bold text-center mb-8">NEWEST RENTAL MODELS</h1>
  <div className="w-5/12 border-t border-gray-300 my-4 mx-auto "/>
  <div className="w-4/12 border-t border-gray-300 my-4 mx-auto " />
  </div>


  <div className="flex flex-col md:flex-row mt-32 mb-12 items-center justify-center">
  <div className="flex flex-wrap gap-16 p-4 w-full max-w-6xl mx-auto">
    <button className="px-6 py-2 text-black font-semibold rounded transition-colors duration-300 hover:text-white hover:bg-blue-700">
      <h4 className="text-sm md:text-base">SHOW ALL</h4>
    </button>
    <button className="px-6 py-2 text-black font-semibold rounded transition-colors duration-300 hover:text-white hover:bg-blue-700">
      <h6 className="text-sm md:text-base">VAN</h6>
    </button>
    <button className="px-6 py-2 text-black font-semibold rounded transition-colors duration-300 hover:text-white hover:bg-blue-700">
      <h6 className="text-sm md:text-base">SEDAN</h6>
    </button>
    <button className="px-6 py-2 text-black font-semibold rounded transition-colors duration-300 hover:text-white hover:bg-blue-700">
      <h6 className="text-sm md:text-base">HATCHBACK</h6>
    </button>
    <button className="px-6 py-2 text-black font-semibold rounded transition-colors duration-300 hover:text-white hover:bg-blue-700">
      <h6 className="text-sm md:text-base">SUV</h6>
    </button>
  <div className='gap-'>
    <button className="px-6  py-2 bg-red-100 text-black font-semibold rounded transition-colors duration-300 hover:text-white hover:bg-blue-700">
      ALL MODELS
    </button>
    </div>
    </div>
  
</div>




    <div className='lg:mx-40 sm:mx-auto'>
<UsersCars/>

</div>
    </div>
    
  );
};




export default Homepage;

