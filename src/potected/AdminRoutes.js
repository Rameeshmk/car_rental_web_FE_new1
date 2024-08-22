import React from 'react'
import axios from 'axios'
import { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom';

const DealerRoutes = ({children}) => {
  const navigate = useNavigate();


    useEffect(() => {
 const checkUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/dealer/check-admin",
        {
          withCredentials: true,
        },
      );

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
