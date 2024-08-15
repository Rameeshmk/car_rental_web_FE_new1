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
      const res = await axios.get(
        "http://localhost:3000/api/v1/dealer/get-dealers",
        
      );
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
      model:data.model,
      fueltype: data.fueltype,
      capacity:data.capacity,
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
    <div className="flex h-screen w-screen items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6 w-2/5 "
      >
        <input
          {...register("name")}
          type="text"
          placeholder="name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          {...register("make")}
          type="text"
          placeholder="make"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.make && <p>{errors.make.message}</p>}
        <input
          {...register("model")}
          type="text"
          placeholder="model"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.model && <p>{errors.model.message}</p>}
        <input
          {...register("fueltype")}
          type="text"
          placeholder="fueltype"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.fueltype && <p>{errors.fueltype.message}</p>}
        <input
          {...register("capacity")}
          type="text"
          placeholder="capacity"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.capacity && <p>{errors.capacity.message}</p>}
        <input
          {...register("price")}
          type="text"
          placeholder="price"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <input
          {...register("image")}
          type="file"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.image && <p>{errors.image.message}</p>}
        <select  {...register("dealerEmail")}>
          {dealer.map((dealer, index) => (
            <option key={index} value={dealer.email}>
              {dealer.email}
            </option>
          ))}
        </select>
        <input
          type="submit"
          className="rounded-md bg-blue-500 py-1 text-white"
        />
      </form>
    </div>
  );
}
