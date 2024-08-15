import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();

export default function UserSignup() {
  const navigate =useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try{
    const res = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      data,
      {
        withCredentials: true,
      },
    );
    console.log(res.data);
    if (res.data.message === "Signed successfully!") {
      navigate("/home", { replace: true });
    }
  } catch (error) {
    console.log(error);
  }
  };



  return (

    <div
    className="flex justify-center items-center h-screen bg-cover bg-center"
    style={{ backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg" }} // Add your image path here
  >
    
    <div className="flex justify-center items-center h-screen ">
       
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 rounded-md border p-6 w-96 "
    >
      <input
        {...register("firstName")}
        placeholder="first name"
        className="block w-full h-14 rounded-lg bg-transparent  border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <input
        {...register("lastName")}
        placeholder="last name"
        className="block w-full h-14  rounded-lg bg-transparent  border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <input
        {...register("email")}
        placeholder="email"
        className="block w-full h-14  rounded-lg bg-transparent  border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register("password")}
        placeholder="password"
        className="block w-full h-14  rounded-lg bg-transparent  border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" className="rounded-md bg-blue-500 py-1 text-white h-14 " />
      <p className="text-white">
        User already exist{" "}
        <Link to="/user/signin" className="text-blue-500 underline">
          Signin
        </Link>
      </p>
    </form>
    </div>
    </div>
  );
}

