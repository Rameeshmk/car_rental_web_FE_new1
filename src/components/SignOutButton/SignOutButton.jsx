

  import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';

const SignOutButton = () => {
  const navigate = useNavigate();

  
  
  const clearCookies = () => {
    const cookiesToClear = ['token', 'refreshToken'];
    cookiesToClear.forEach(cookieName => {
      // Clear cookies by setting expired date with domain and path
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.car-rental-be-1-ossf.onrender.com`;
    });
  };
  

const handleSignOut = async () => {
    try {
      
      await axiosInstance.post('/signout', {}, { withCredentials: true });

      clearCookies();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  

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




