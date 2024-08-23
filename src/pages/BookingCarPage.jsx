import axios from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";


function BookingCarPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await axiosInstance({
         url: "/dealer/get-cars",
         method:"GET",
      });
        const data = await res.data;
        console.log(data);
        setCars(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCars();
  }, []);

  const paymentHandler = async (event, carId) => {
   
    console.log('Received carId in paymentHandler:', carId);
    const selectedCar = cars.find((car) => car._id === carId);
    
    
    

    
    const response = await axiosInstance({
      url: '/payment/order',
      method: 'POST',
      data: { amount: selectedCar.price }, 
    });
console.log("selected car price",selectedCar.price);
       console.log(response);
    const order = await response.data.data;
    console.log(order);
    
    
    const option = {
      key: import.meta.env.VITE_SOME_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Ram Codder",
      description: "Test Transaction",
      image: "https://i.ibb.co/5Y3m33n/test.png",
      order_id: order.id, 
      
     handler: async function (response) {
      alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
  
        const body = { ...response };
        

         await axiosInstance({
          url: '/payment/verify',
          method: 'POST',
          data: body, 
        });
        const jsonResponse = await validateResponse;

        console.log("jsonResponse", jsonResponse);
      },
      prefill: {
        name: "Ram Coder",
        email: "ramcoder@example.com",
        contact: "00000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

 

    const rzp1 = new window.Razorpay(option);
    console.log(error)

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-3 px-4">
        {cars.map((car, index) => (
          <div key={index} className="flex h-[300px] w-[600px]">
            <section>
              <img
                src={car.image}
                alt="car image"
                className="w-[200px] border-none bg-center"
              />
            </section>
            <section className="space-y-4 px-3">
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="font-light text-gray-500">{car.make}</p>
              
              <button
                onClick={(event) =>{
                  console.log('Button clicked with carId:', car._id); 
                  paymentHandler(event, car._id); 
                }}
                className="rounded-lg bg-blue-500 px-2 py-1 text-white"
              >
                Pay now
              </button>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}

export default BookingCarPage;
