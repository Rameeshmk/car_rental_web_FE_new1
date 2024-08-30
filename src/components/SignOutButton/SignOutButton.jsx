

  {/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';

const SignOutButton = () => {
  const navigate = useNavigate();

const handleSignOut = async () => {
    try {
      
      await axiosInstance({
        url:"/signout",
      method:"POST",
      });

      
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

export default SignOutButton;  */}




import React from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const SignOutButton = () => {
  const navigate = useNavigate();

  const clearAllCookies = () => {
    // Define the domain
    const domain = 'car-rental-be-1-ossf.onrender.com';
    
    // Extract all cookies
    const cookies = document.cookie.split(';');

    // Clear cookies by setting them to an expired date with path and domain
    cookies.forEach(cookie => {
      const [name] = cookie.split('=');
      const trimmedName = name.trim();
      
      // Clear cookies with the specified domain and path
      document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
      document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  };

  const handleSignOut = async () => {
    try {
      // Perform the sign-out request
      await axiosInstance({
        url: '/signout',
        method: 'POST',
      });

      // Remove token and userId from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      // Clear all cookies
      clearAllCookies();

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-lg font-semibold bg-red-500 rounded-lg transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
    >
      SIGN OUT
    </button>
  );
};

export default SignOutButton;
