

  import React from 'react';
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
  
      withCredentials:true,
      });

      
      sessionStorage.removeItem('token');
      localStorage.removeItem('userId');

      
     
  

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




