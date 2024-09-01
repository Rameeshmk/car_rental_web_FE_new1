import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";

// Validation schema
const schema = yup
  .object({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  })
  .required();

export default function UserSignin() {
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
        url: '/user/signin',
        method: 'POST', 
        data: data, 
        withCredentials: true, 
      });
      const resData = res.data;
      console.log("Response Data:", resData);

      if (resData.message === "Logged in!") {
        localStorage.setItem('userId', resData.userId); 
        
        navigate("/home", { replace: true });
      } else {
        window.alert("User not exists");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const buttonStyle = (path) =>
    `py-2 px-4 rounded-lg shadow ${
      currentPath === path ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
    }`;

  return (
    <div className="relative h-screen bg-cover bg-center"
         style={{ backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg)" }}>
    
      <div className="absolute top-4 right-4 flex gap-2">
        <Link to="/user/signin">
          <button className={buttonStyle('/user/signin')}>Signin</button>
        </Link>
        <Link to="/user/signup">
          <button className={buttonStyle('/user/signup')}>Signup</button>
        </Link>
      </div>

    
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 rounded-md border p-6 w-96 h-auto bg-transferent bg-opacity-80"
        >
          <input
            {...register("email")}
            placeholder="Email"
            className="block w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-lg focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="block w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-lg focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

          <input
            type="submit"
            value="Submit"
            className="rounded-md bg-blue-500 py-2 text-white cursor-pointer hover:bg-blue-600 transition-transform transform ease-in hover:scale-105"
          />

          <p className="text-white text-lg">
            User not created yet{" "}
            <Link to="/user/signup" className="text-blue-500 underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
