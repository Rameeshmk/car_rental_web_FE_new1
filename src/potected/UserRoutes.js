import React from 'react'
import axios from 'axios'
import { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom';

const UserRoutes = ({children}) => {
  const navigate = useNavigate();


    useEffect(() => {
 const checkUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/check-user",
        {
          withCredentials: true,
        },
      );

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
