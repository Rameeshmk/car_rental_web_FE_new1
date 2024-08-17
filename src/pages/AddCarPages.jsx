import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    make: yup.string().required(),
    price: yup.string(),
    capacity: yup.string(),
    dealerEmail: yup.string().required(),
    image: yup.mixed().required(),
    model: yup.string().required(),
    fueltype: yup.string().required(),
  })
  .required();

export default function AddCarPages() {
  const [dealer, setDealer] = useState([]);

  useEffect(() => {
    const dealerList = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/dealer/get-dealers");
      const data = await res.data;
      console.log(data);
      setDealer(data);
    };
    dealerList();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const requestBody = {
      name: data.name,
      make: data.make,
      model: data.model,
      fueltype: data.fueltype,
      capacity: data.capacity,
      price: data.price,
      dealerEmail: data.dealerEmail,
      image: data.image[0]
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/dealer/add-cars",
        requestBody,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg')" }}>
      
      <div className="flex h-screen items-center justify-center bg-black bg-opacity-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 rounded-lg border p-6 w-4/5 md:w-1/2 lg:w-1/3 bg-white shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Add Your Car Here</h1>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <input
            {...register("make")}
            type="text"
            placeholder="Make"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.make && <p className="text-red-500 text-sm">{errors.make.message}</p>}
          <input
            {...register("model")}
            type="text"
            placeholder="Model"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
          <input
            {...register("fueltype")}
            type="text"
            placeholder="Fuel Type"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.fueltype && <p className="text-red-500 text-sm">{errors.fueltype.message}</p>}
          <input
            {...register("capacity")}
            type="text"
            placeholder="Capacity"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
          <input
            {...register("price")}
            type="text"
            placeholder="Price"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          <input
            {...register("image")}
            type="file"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          <select
            {...register("dealerEmail")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            {dealer.map((dealer, index) => (
              <option key={index} value={dealer.email}>
                {dealer.email}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-blue-500 py-2 text-white cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
