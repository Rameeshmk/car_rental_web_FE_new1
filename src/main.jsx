import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import App from './App.jsx'
import './index.css'
import UserSignup from './components/user/UserSignup.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import UserSignin from './components/user/UserSignin.jsx';
import Homepage from './pages/Homepage.jsx';
import HomeLayoutPages from './components/layouts/HomeLayoutPages.jsx';
import UserLayout from "./components/layouts/UserLayout.jsx";
import DealerRoutes from './potected/DealerRoutes.jsx';
import AdminLayout from './components/layouts/AdminLayout.jsx';
import DealerSignin from "./components/dealer/DealerSignin.jsx"
import DealerSignup from "./components/dealer/DealerSignup.jsx";

import BookingCarPage from './pages/BookingCarPage.jsx';
import CarDetails from './components/car/CarDetails.jsx';
import DealersCarPage from './pages/DealersCarPage.jsx';
import DealerList from './pages/DealerList.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import AdminDashboard from "./components/admin/AdminDashboard.jsx"
import UpdateCar from './components/car/UpdateCar.jsx';
import DealerDashboard from './components/dealer/DealerDashboard.jsx';
import AddCarPages from './pages/AddCarPages.jsx';

const router = createBrowserRouter([
  {
    element:(
      <DealerRoutes>
      <HomeLayoutPages/>
      </DealerRoutes>
      
  ),
    children:[
      {
        path: "/",
        element: <App/>
      },
      
      {
        path: "/home",
        element: <Homepage/>
      },
     
      {
        path: "/dealer/Signup",
        element: <DealerSignup/>
      },
      {
        path: "/dealer/Signin",
        element: <DealerSignin/>
      },
      {
        path: "/user/Signup",
        element: <UserSignup/>
      },
      {
        path: "/user/Signin",
        element: <UserSignin/>
      },
     
        
    ]

  },


{
     
element: <AdminLayout/>,
children:[
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
 
  {
    path: "/admin/cars",
    element: <DealersCarPage/>
  },
  {
    path: "/admin/dealers",
    element: <DealerList/>
  },
  {
    path: "/admin/add-car",
    element: <AddCarPages/>
  },
  {
    path: "/dealer/",
    element: <DealerDashboard/>
  },
 
],
},
{
  element: <UserLayout />,
  children: [
   
  
{
  path: "/car/:id",
  element: <CarDetails/>
},    

  
  {
    path: "/bookingcar",
    element: <BookingCarPage/>
  },
  {
    path: "/user/Signin",
    element: <UserSignin/>
  },
 
],

  
},


{
  path:"/updatecar",
  element:<UpdateCar/>
},


    ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
  <RouterProvider router={router} />
  </ChakraProvider>
  </React.StrictMode>,
);
