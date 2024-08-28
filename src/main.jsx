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
import UserRoutes from "./potected/UserRoutes.js"
import AdminRoutes from "./potected/AdminRoutes.js"
import EditCar from './components/car/EditCar.jsx';
import RemoveCar from "./components/car/RemoveCar.jsx"
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import FindNow from './pages/FindNow.jsx';
import OrderSummary from './pages/OrdersSummary.jsx';
import MyOrders from './pages/MyOrder.jsx';
import UserReviewForm from "./components/userreview/UserReviewForm.jsx"
import UserReviewList from "./components/userreview/UserReviewList.jsx"
import SignOutButton from './components/SignOutButton/SignOutButton.jsx';

const router = createBrowserRouter([
  {
    element:(
      <DealerRoutes>
      <HomeLayoutPages/>
      </DealerRoutes>
      
  ),
    children:[
     
      
     
     
      {
        path: "/dealer/Signup",
        element: <DealerSignup/>
      },
      {
        path: "/dealer/Signin",
        element: <DealerSignin/>
      },
     

      {
        path: "/admin/cars",
        element:<AdminRoutes> <DealersCarPage/></AdminRoutes>
      },
      {
        path: "/admin/dealers",
        element:<AdminRoutes> <DealerList/></AdminRoutes>
      },
      {
        path: "/admin/add-car",
        element:<AddCarPages/>
      },
      {
        path: "/dealer/",
        element: <DealerDashboard/>
      },
      {
        path:"/admin/updatecar",
        element:<AdminRoutes><UpdateCar/></AdminRoutes>
      },
      {
        path:"/admin/edit/:id",
        element:<AdminRoutes><EditCar/></AdminRoutes>
      },
      {
        path:"/admin/removeCar",
        element:<AdminRoutes><RemoveCar/></AdminRoutes>
      },
     
     
        
    ]

  },


{
     
element: <AdminRoutes> <AdminLayout/></AdminRoutes>,
children:[
  
  {
    path: "/admin",
    element: <AdminRoutes><AdminDashboard /></AdminRoutes>,
  },
 
 
  
 
],
},
{
  element:
   (<UserRoutes>
    <UserLayout />
    </UserRoutes>),
  children: [
   
    {
      path: "/home",
      element: <Homepage/>
    },

    {
      path: "/user/Signup",
      element: <UserSignup/>
    },
    {
      path: "/user/Signin",
      element: <UserSignin/>
    },
    {
      path: "/car/:id",

      element: <CarDetails/>
    }, 
  
  {
    path: "/bookingcar",
    element: <BookingCarPage/>
  },
  
  {
    path: "/users/myorders",
    element: <MyOrders/>
  },
  {
    path: "/users/ordersummary",
    element: <OrderSummary/>
  },
  {
    path: "/review",
    element: <UserReviewForm/>
  },
  

  
 
], 
},


{
  path: "/",
  element: <App/>
},
{
  path: "/find",
  element: <FindNow/>
},


{
  path: "/reviews",
  element: <UserReviewList/>
},
{
  path: "/user/contactus",
  element: <Contact/>
},
{
  path: "/user/aboutus",
  element: <About/>
},
{
  path: "/signout",
  element: <SignOutButton/>
},











    ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
  <RouterProvider router={router} />
  </ChakraProvider>
  </React.StrictMode>,
);
