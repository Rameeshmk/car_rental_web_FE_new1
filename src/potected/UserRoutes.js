import React from 'react'
import axios from 'axios'
import { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';

const UserRoutes = ({children}) => {
  const navigate = useNavigate();


    useEffect(() => {
 const checkUser = async () => {
    try {
      const res = await axiosInstance({
        url: '/user/check-user',
        method: 'GET',
        withCredentials: true, // Ensure credentials are included
      });

      const data = res.data;
      console.log("res",data);
      
      
    } catch (error) {
      console.error("Error occurred while checking dealer:", error);
      navigate("/user/signin", { replace: true });
    }
  };
  checkUser();
}, []);

return children;
};
export default UserRoutes
