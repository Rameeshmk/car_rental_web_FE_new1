import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const DealersGarrage = () => {
  const { id } = useParams(); 
  const [cars, setCars] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCarId, setEditCarId] = useState(null);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const dealerId = localStorage.getItem('dealerId');
        
        if (!dealerId) {
          throw new Error('Your Garrage is Empty');
        }

        const response = await axiosInstance({
          url: `/dealer/get-dealerscars/${dealerId}`,
          method: 'GET',
        });
        
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleEditClick = (car) => {
    setEditCarId(car._id);
    setInputValues({
      name: car.name,
      make: car.make,
      price: car.price,
      model: car.model,
      fueltype: car.fueltype,
      capacity: car.capacity
    });
  };

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (carId) => {
    try {
      await axiosInstance({
        url: `/dealer/update-car/${carId}`,
        method: 'PUT',
        data: inputValues
      });

      setCars(cars.map(car => (car._id === carId ? { ...car, ...inputValues } : car)));
      setEditCarId(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditCarId(null);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      {cars.map((car) => (
        <div key={car._id} className="flex flex-col lg:flex-row p-4 gap-8 mb-4 border border-gray-300 rounded-lg shadow-md">
          <div className="flex-1 flex items-center justify-center lg:pr-8">
            <img src={car.image} alt={car.name} className="object-cover w-full lg:w-1/5 h-auto" />
          </div>
          <div className="flex-1">
            {editCarId === car._id ? (
              <div>
                <h2 className="text-2xl font-bold">Edit Car</h2>
                <div className="mb-4">
                  <label className="block mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={inputValues.name}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Make:</label>
                  <input
                    type="text"
                    name="make"
                    value={inputValues.make}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={inputValues.price}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Model:</label>
                  <input
                    type="text"
                    name="model"
                    value={inputValues.model}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Fuel Type:</label>
                  <input
                    type="text"
                    name="fueltype"
                    value={inputValues.fueltype}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Capacity:</label>
                  <input
                    type="number"
                    name="capacity"
                    value={inputValues.capacity}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full"
                  />
                </div>
                <button
                  onClick={() => handleSave(car._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold">{car.name}</h2>
                <p className="text-black">Make: {car.make}</p>
                <p className="text-black font-bold mt-2">Rent Per Day ₹{car.price}</p>
                <p className="text-black mt-2">Model: {car.model}</p>
                <p className="text-black">Fuel Type: {car.fueltype}</p>
                <p className="text-black">Capacity: {car.capacity}</p>
                <button
                  onClick={() => handleEditClick(car)}
                  className="text-blue-500 underline mt-2"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealersGarrage;





