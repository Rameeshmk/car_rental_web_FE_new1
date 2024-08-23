import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export default function CarListPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res= await axiosInstance({
          url:'/dealer/get-cars',
        method:"GET",
        }); 
        setCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Car List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-300"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-60 object-cover rounded-t-lg "
            />
            <div className="  mt-4">
              <h2 className="text-xl font-medium">{car.name}</h2>
              <p className="text-gray-600">{car.make}</p>
              <p className="text-gray-600">{car.model}</p>
              <p className="text-gray-600">{car.fueltype}</p>
              <p className="text-gray-600">{car.capacity}</p>
              <p className="text-gray-600">${car.price}</p>
            </div>
            <Link
              to={`/admin/edit/${car._id}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600"
            >
              Edit
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
}
