// src/pages/AboutUs.jsx
import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">About Us</h1>
        <p className="text-lg text-gray-600">Get to know more about our mission and team</p>
      </header>
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* Mission Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At Rentry Cars, our mission is to provide an exceptional car rental experience that
            exceeds your expectations. We are committed to offering a diverse fleet of vehicles,
            competitive rates, and outstanding customer service to ensure that every journey with us
            is a smooth and enjoyable one.
          </p>
        </section>
        
        {/* Team Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Team</h2>
          <p className="text-gray-600 leading-relaxed">
            Our team is passionate about cars and dedicated to providing you with the best rental
            experience possible. From our friendly customer service representatives to our expert
            maintenance staff, every member of our team plays a crucial role in ensuring your
            satisfaction.
          </p>
        </section>

        {/* Why Choose Us? Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">Wide selection of vehicles to suit your needs</li>
            <li className="mb-2">Transparent pricing with no hidden fees</li>
            <li className="mb-2">Convenient pickup and drop-off locations</li>
            <li className="mb-2">24/7 customer support</li>
          </ul>
        </section>

        {/* Cancellation Policy Notice Section */}
        <section className="bg-red-500 text-white p-4 rounded-lg border border-red-700 mb-6">
          <h3 className="text-xl font-semibold mb-2">Important Notice</h3>
          <p>
            Our car rental service currently does not provide a cancellation policy. We understand
            that this may be inconvenient, and we are actively working on implementing a cancellation
            policy to better serve you. This facility will be available soon. We appreciate your
            patience and understanding.
          </p>
        </section>
      </main>
      <footer className="mt-8 text-center">
        <p className="text-gray-500">© 2024 Rentry Cars. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
