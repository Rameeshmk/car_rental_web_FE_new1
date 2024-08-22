// src/SignOutButton.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Optionally, make a request to the server to invalidate tokens
      await axios.post("http://localhost:3000/api/v1/signout");

      // Remove token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      // Remove cookies
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

      // Redirect to login or home page
      navigate('/');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className="px-4 py-2 text-lg font-semibold bg-red-500 rounded-lg transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50">
      SIGN OUT
    </button>
  );
};

export default SignOutButton;
