// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function DealersCarPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/dealer/get-cars`);
            setCars(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setLoading(false);
        }
    };

    const removeCar = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:3000/api/v1/dealer/delete-cars/${id}`);
            fetchCars(); 
        } catch (error) {
            console.error('Error removing car:', error);
        }
    };

    return (
        
        <div className="p-4 sm">
            <h1 className="text-3xl font-bold text-center mb-4">Car Gallery</h1>
            <div className="flex justify-end">
        <Link to="/dealer/add-cars">
          <button className="p-4 text-2xl font-semibold shadow-lg shadow-blue-500 hover:scale-105">
            ADD CARS
          </button>
        </Link>
      </div>
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                
                <div className="flex flex-wrap justify-center gap-4">
                    {cars.map(car => (
                        <div key={car._id} className="border rounded-lg p-4 w-60 text-center shadow-md">
                            <img src={car.image} alt={car.name} className="w-full h-32 object-cover mb-2" />
                            <div className="text-lg font-semibold mb-2">{car.name}</div>
                            <button
                                onClick={() => removeCar(car._id)}
                                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DealersCarPage;
