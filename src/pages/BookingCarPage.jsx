import axios from "axios";
import { useEffect, useState } from "react";


function BookingCarPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/dealer/get-cars",
        );
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
    event.preventDefault();
    console.log('Received carId in paymentHandler:', carId);
    const selectedCar = cars.find((car) => car._id === carId);
    
    if (!selectedCar) {
      console.error('Selected car not found');
      console.log(carId);
      console.log(cars);
    
      return;
    }

    
    const response = await axios.post(
      "http://localhost:3000/api/v1/payment/order",
      { amount: selectedCar.price },
    );
console.log("selected car price",selectedCar.price)
    const order = await response.data.data;
    console.log(order);
    
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Ram Codder",
      description: "Test Transaction",
      image: "https://i.ibb.co/5Y3m33n/test.png",
      order_id: order.id, 
      
     handler: async function (response) {
      alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
  
        const body = { ...response };
        

        const validateResponse = await axios.post(
          "http://localhost:3000/api/v1/payment/verify",
          body,
        );

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

 

    const rzp1 = new window.Razorpay(options);
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
          <div key={car._id} className="flex h-[300px] w-[600px]">
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
                  console.log('Button clicked with carId:', car._id); // Log the carId to ensure it's being passed
                  paymentHandler(event, car._id); // Call paymentHandler with the carId
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
