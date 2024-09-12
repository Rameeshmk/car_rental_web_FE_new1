import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";

// Validation schema
const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
    mobile: yup.string().min(10, "mobile number must be at least 10 numbers").max(10, "mobile number must not be more than least 10 numbers").required("mobile is required"),
  })
  .required();

export default function UserSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance({
        url: '/user/signup', 
        method: 'POST',      
        data: data,         
        withCredentials: true, 
      });
      console.log(res.data);

      if (res.data.message === "Signed successfully!") {
        window.alert("Signup successfully!, Please Sign in Again");

        setTimeout(() => {
          navigate("/user/signin", { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buttonStyle = (path) =>
    `py-2 px-4 rounded-lg shadow ${
      currentPath === path ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
    }`;

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg)" }}
    >
      {/* Navigation Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Link to="/user/signin">
          <button className={buttonStyle('/user/signin')}>Signin</button>
        </Link>
        <Link to="/user/signup">
          <button className={buttonStyle('/user/signup')}>Signup</button>
        </Link>
      </div>

      {/* Signup Form */}
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 rounded-md border p-6 w-96 bg-transferent bg-opacity-80"
        >
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="block w-full h-14 rounded-lg border bg-opacity-80 border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="block w-full h-14 rounded-lg border bg-opacity-80 border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          <input
            {...register("mobile")}
            placeholder="Mobile Number"
            className="block w-full h-14 rounded-lg border bg-opacity-80 border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.mobile && <p className="text-red-500">{errors.mobile.message} </p>}
          <input
            {...register("email")}
            placeholder="Email"
            className="block w-full h-14 rounded-lg border bg-opacity-80 border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="block w-full h-14 rounded-lg border bg-opacity-80 border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          <input
            type="submit"
            value="Submit"
            className="rounded-md bg-blue-500 py-2 text-white h-14 cursor-pointer hover:bg-blue-600"
          />
          <p className="text-gray-700">
            User already exists{" "}
            <Link to="/user/signin" className="text-blue-500 underline">
              Signin
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
