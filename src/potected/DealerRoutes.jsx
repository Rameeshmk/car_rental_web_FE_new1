import React from 'react'
import axios from 'axios'
import { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';

const DealerRoutes = ({children}) => {
  const navigate = useNavigate();


    useEffect(() => {
 const checkUser = async () => {
    try {
      const res = await axiosInstance({
        url: '/dealer/check-dealer',
        method: 'GET',
        withCredentials: true, 
      });

      const data = res.data;
      console.log("res",data);
      
      
    } catch (error) {
      console.error("Error occurred while checking dealer:", error);
      navigate("/dealer/signin", { replace: true });
    }
  };
  checkUser();
}, []);

return children;
};
export default DealerRoutes
