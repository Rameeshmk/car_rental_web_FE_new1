// src/LandingPage.jsx
import React, { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import CarImages from '../components/car/CarImages';
import DatePickers from '../components/datepicker/DatePickers';
import UserReview from '../components/userreview/UserReview';

const LandingPage = () => {
  

  return (
    <div>
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://mrwallpaper.com/images/hd/limitless-blue-supercar-1hu8l1n6ydmqzeht.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Welcome Message */}
      <section className="relative flex items-center justify-center h-screen text-center bg-gray-800 bg-opacity-60 text-white">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Welcome to Our Car Rental Service</h1>
          <p className="text-lg sm:text-xl mb-6">Find the perfect car for your next adventure.</p>
         { /*<a href="#get-started" className="bg-blue-500 text-white px-6 py-3 rounded-md shadow hover:bg-blue-600">Get Started</a>*/}
          <h2 className="text-3xl font-bold mb-8">Ready to Rent Your Dream Car?</h2>

          <div>
            <DatePickers/>
          </div>


        </div>
      </section>
    
     
    </div>

    <div>
<CarImages/>
<UserReview/>
</div>
    </div>
    
  );
};




export default LandingPage;

