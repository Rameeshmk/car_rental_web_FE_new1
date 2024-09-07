import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const DealersEditCar = () => {
  const { id } = localStorage.getItem('carId'); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

   // States to manage edit mode and input values
   const [editField, setEditField] = useState(null);
   const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const dealerId = localStorage.getItem('dealerId'); 
        
        if (!dealerId) {
          throw new Error('Your Garrage is Empty');
        }

        const response = await axiosInstance({
          url: `/dealer/get-dealerscars/${dealerId}`,
          method: 'GET',
        });
       const data =response.data.data;
        setCar(response.data);
        setInputValues({
          name: response.data.name,
          make: response.data.make,
          price: response.data.price,
          model: response.data.model,
          fueltype: response.data.fueltype,
          capacity: response.data.capacity
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, []);

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await axiosInstance({
        url: `/dealer/update-car/${id}`, 
        method: 'PUT',
        data: inputValues, 
      });
      
      setCar({ ...car, ...inputValues });
      setEditField(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditField(null);
    setInputValues({
      name: car.name,
      make: car.make,
      price: car.price,
      model: car.model,
      fueltype: car.fueltype,
      capacity: car.capacity
    });
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className='flex flex-col md:flex-row p-4 md:p-8'>
      <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
        <img src={car.image} alt={car.name} className="w-full object-cover h-60 md:h-auto" />
      </div>
      <div className='w-full md:w-1/2 flex flex-col'>
        <div className='flex flex-col items-start mb-8'>
          <div className='w-full border-t-2 border-black my-4 md:my-6' />
          <div className="text-2xl md:text-3xl font-bold mb-4">Update Your Car's Data</div>
          <div className='w-full border-t-2 border-black my-4 md:my-6' />
        </div>
        <div className='flex flex-col'>
          {['name', 'make', 'price', 'model', 'fueltype', 'capacity'].map((field) => (
            <div className="mb-4" key={field}>
              <div className="flex flex-col md:flex-row items-start">
                {editField === field ? (
                  <>
                    <input
                      type="text"
                      name={field}
                      value={inputValues[field] || ''}
                      onChange={handleChange}
                      className="border px-2 py-1 w-full md:w-3/4 mb-2 md:mb-0"
                    />
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto mb-2 md:mb-0 md:ml-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto md:ml-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-black text-sm md:text-base mb-2 md:mb-0">
                      {field.charAt(0).toUpperCase() + field.slice(1)}: {car[field]}
                    </p>
                    <button
                      onClick={() => handleEdit(field)}
                      className="text-blue-500 underline"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default DealersEditCar;
