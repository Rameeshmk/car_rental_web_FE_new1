import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { format, differenceInDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosInstance } from '../../config/axiosInstance';

const pickupLocations = [
  'Kochi',
  'Thiruvananthapuram',
  'Kozhikode',
  'Thrissur',
  'Alappuzha',
  'Kannur',
  
];

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');

  // Set available
  const [isAvailable, setIsAvailable] = useState(true); // New state for availability
  const [availabilityError, setAvailabilityError] = useState(''); // New state for error messages

  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance({
          url: `/car/cars/${id}`,
          method: 'GET',
        });
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Check availability
  const checkAvailability = async () => {
    if (startDate && endDate) {
      try {
        const response = await axiosInstance({
          url: '/order/check-availability',
          method: 'POST',
          data: { car_id: id }, // Payload for the POST request
        });
        setIsAvailable(response.data.available);
        if (!response.data.available) {
          setAvailabilityError('Selected dates are not available. Please choose different dates.');
        } else {
          setAvailabilityError('');
        }
      } catch (error) {
        console.error('Error checking availability:', error);
        setAvailabilityError('Failed to check availability.');
      }
    }
  };

  useEffect(() => {
    checkAvailability();
  }, [startDate, endDate]);

  // Payment handler
  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!startDate || !endDate || !car || !pickupLocation) {
      alert('Please select both start and end dates and pickup location before proceeding.');
      return;
    }

    const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
    const rentPerDay = car.price || 0;
    const totalAmount = totalDays * rentPerDay;

    try {
      // Create an order on the backend
      const paymentResponse = await axiosInstance({
        url: '/payment/order',
        method: 'POST',
        data: { amount: totalAmount }, // Payload for the POST request
      });

      const order = paymentResponse.data.data;

      const options = {
        key: import.meta.env.VITE_SOME_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Ram Codder",
        description: "Test Transaction",
        image: "https://i.ibb.co/5Y3m33n/test.png",
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };

          // Verify payment
          await axiosInstance({
            url: '/payment/verify',
            method: 'POST',
            data: body, // Payload for the POST request
          });

          navigate('/users/ordersummary', {
            state: {
              order,
              car,
              startDate,
              endDate,
              totalDays,
              rentPerDay,
              totalAmount,
              pickupLocation,
              userId
            }
          });
        },
        prefill: {
          name: "RENTRY CARS",
          email: "anucoder@example.com",
          contact: "00000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
      });

      rzp1.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment.');
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!car) return <p className="text-center text-gray-500">Car not found</p>;

  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const rentPerDay = car.price || 0;
  const totalAmount = totalDays * rentPerDay;

  const isButtonDisabled = !(startDate && endDate && totalAmount > 0 && pickupLocation);

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-8">
      <div className="flex-1 flex items-center justify-center lg:pr-8">
        <img src={car.image} alt={car.name} className="object-cover w-full lg:w-1/2 h-auto" />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <div className="border-t-2 border-black flex-grow mx-4" />
          <div className="text-2xl">Car Info</div>
          <div className="border-t-2 border-black flex-grow mx-4" />
        </div>

        <div className=" mb-4 justify-end">
          <h2 className="text-xl font-bold">{car.name}</h2>
          <p className="text-black">Make: {car.make}</p>
          <p className="text-black font-bold mt-2">₹{car.price}</p>
          <p className="text-black mt-2">{car.model}</p>
          <p className="text-black">Fuel Type: {car.fueltype}</p>
          <p className="text-black">Capacity: {car.capacity}</p>
          <p className="text-white">UserId: {userId}</p>
        </div>

        <div className="flex items-center mb-4">
          <div className="border-t-2 border-black flex-grow mx-4" />
          <div className="text-2xl">Selected Time Slots</div>
          <div className="border-t-2 border-black flex-grow mx-4" />
        </div>

        <section id="get-started" className="mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select pick-up date"
                className="border border-red-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="MMMM d, yyyy"
              />
            </div>
            <div className="flex-1">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select drop-off date"
                className="border border-red-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {startDate && endDate && (
            <div className="flex justify-center mt-4">
              <p className="text-gray-600 border border-red-300 rounded-md p-2">
                Selected Dates: {format(startDate, 'MMMM d, yyyy')} - {format(endDate, 'MMMM d, yyyy')}
              </p>
            </div>
          )}
        </section>

        <section className="mb-4">
          <div className="flex justify-center">
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="border border-red-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Pickup Location</option>
              {pickupLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row justify-center gap-4 ">
          <div className="text-lg mb-2">
            <label className="block">TOTAL DAYS: {totalDays}</label>
            <label className="block text-white-700 text-lg font-medium">RENT PER DAY: ₹{rentPerDay}</label>
            <label className="block text-white-700 text-xl font-medium mt-2">TOTAL AMOUNT: ₹{totalAmount}</label>
          </div>
          </div>
          <div className='text-center mt-10'>
          <button
            onClick={paymentHandler}
            className={`rounded-lg px-4 py-2 text-white  ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={isButtonDisabled}
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;







{/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { format, differenceInDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosInstance } from '../../config/axiosInstance';

const pickupLocations = [
  'Kochi',
  'Thiruvananthapuram',
  'Kozhikode',
  'Thrissur',
  'Alappuzha',
  'Kannur',
  
];

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');

  //set available
  const [isAvailable, setIsAvailable] = useState(true); // New state for availability
  const [availabilityError, setAvailabilityError] = useState(''); // New state for error messages


  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response =await axiosInstance({
          url: `/car/cars/${id}`,
          method: 'GET',
        });
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

//// set availability

const checkAvailability = async () => {
  if (startDate && endDate) {
    try {
      const response =  await axiosInstance({
        url: '/order/check-availability',
        method: 'POST',
        data: { car_id: id }, // Payload for the POST request
      });
      setIsAvailable(response.data.available);
      if (!response.data.available) {
        setAvailabilityError('Selected dates are not available. Please choose different dates.');
      } else {
        setAvailabilityError('');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailabilityError('Failed to check availability.');
    }
  }
};

useEffect(() => {
  checkAvailability();
}, [startDate, endDate]);


///set availability






  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!startDate || !endDate || !car || !pickupLocation) {
      alert('Please select both start and end dates and pickup location before proceeding.');
      return;
    }

    const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
    const rentPerDay = car.price || 0;
    const totalAmount = totalDays * rentPerDay;

    try {
      // Create an order on the backend
      const paymentResponse =  await axiosInstance({
        url: '/payment/order',
        method: 'POST',
        data: { amount: totalAmount }, // Payload for the POST request
      });

      const order = paymentResponse.data.data;

      const options = {
        key: import.meta.env.VITE_SOME_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Ram Codder",
        description: "Test Transaction",
        image: "https://i.ibb.co/5Y3m33n/test.png",
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };

          // Verify payment
          await axiosInstance({

          url: '/payment/verify',
          method: 'POST',
          data: body, // Payload for the POST request
        });

          // Save order details
          //await axios.post('http://localhost:3000/api/v1/orders', {
            //order: order,
           //// car: car,
            //startDate: startDate,
           // endDate: endDate,
           // totalDays: totalDays,
            //rentPerDay: rentPerDay,
            //totalAmount: totalAmount,
           // pickupLocation: pickupLocation
         // });

          navigate('/users/ordersummary', {
            state: {
              order,
              car,
              startDate,
              endDate,
              totalDays,
              rentPerDay,
              totalAmount,
              pickupLocation,
              userId
              
              
            }
          });
        },
        prefill: {
          name: "RENTRY CARS",
          email: "anucoder@example.com",
          contact: "00000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
      });

      rzp1.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment.');
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!car) return <p className="text-center text-gray-500">Car not found</p>;

  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const rentPerDay = car.price || 0;
  const totalAmount = totalDays * rentPerDay;

  const isButtonDisabled = !(startDate && endDate && totalAmount > 0 && pickupLocation);

  return (
    <div className='flex'>
      <div className="mr-16 ml-24 mt-6">
        <img src={car.image} alt={car.name} className="object-cover " />
      </div>
      <div className='w-full ml-0 pl-0 justify-end items-end'>
        <div className='flex w-full pr-0 mr-0 mt-4 ml-10'>
          <div className="mt-4 pr-0 mr w-4/12 border-t-2 border-black my-4 mx-auto" />
          <div className="pr-0 mr-0 flex text-2xl pl-0">Car Info</div>
          <div className="pl-0 ml pr-10 mr-40 mt-4 w-3/12 border-t-2 border-black my-4 mx-auto" />
        </div>

        <div className='flex justify-end items-end mr-0'>
          <div className="">
            <h2 className="text-1xl font-bold ">{car.name}</h2>
            <p className="text-black ">Make: {car.make}</p>
            <p className="text-black  font-bold mt-2">₹{car.price}</p>
            <p className="text-black  mt-2">{car.model}</p>
            <p className="text-black ">Fuel Type: {car.fueltype}</p>
            <p className="text-black ">Capacity: {car.capacity}</p>
            <p className="text-white ">UserId: {userId}</p>
          </div>
        </div>

        <div className='flex w-full pr-0 mr-0 ml-10'>
          <div className="mt-4 pr-0  w-3/12 border-t-2 border-black my-4 mx-auto " />
          <div className="text-2xl ">Selected Time Slots</div>
          <div className="pl-0 ml pr-10 mr-40 mt-4 w-2/12 border-t-2 border-black my-4 mx-auto" />
        </div>

        <section id="get-started" className='block justify-center  gap-4 w-full mt-2 mr-16'>
          <div className='flex justify-center  gap-4 w-full'>
            <div className='flex pl-4 mr-10'>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select pick-up date"
                className="flex border w-58 border-red-300 p-2 rounded-md mb-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            <div className='flex'>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select drop-off date"
                className="border border-red-300 p-2 w-58 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-10"
                dateFormat="MMMM d, yyyy"
              />
            </div>
          </div>

          <div className=''>
            <div className='flex justify-end pr-52'>
              {startDate && endDate && (
                <p className="flex mt-4 text-gray-600 border border-red border-red-300 rounded-md mb-2 h-20 items-center justify-center px-10">
                  Selected Dates: {format(startDate, 'MMMM d, yyyy')} - {format(endDate, 'MMMM d, yyyy')}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className='mt-6'>
          <div className='flex justify-center ml-2 gap-4 w-full'>
            <div className='flex pl-20 mr-10'>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="border border-red-300 p-2 w-80 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Pickup Location</option>
                {pickupLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className='flex justify-end items-end'>
          <div className='block mr-40'>
            <label className="block text-lg mb-4 ml-10">
              TOTAL DAYS: {totalDays}
            </label>
            <label className="block text-white-700 text-lg font-medium text-lg mb-4">
              RENT PER DAY: ₹ {rentPerDay}
            </label>
            <label className="block text-white-700 text-xl font-medium mt-4">
              TOTAL AMOUNT: ₹ {totalAmount}
            </label>
            <button
              onClick={paymentHandler}
              className={`rounded-lg px-2 py-1 text-white mt-4 ml-6 w-36 h-12 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={isButtonDisabled}
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;*/}
