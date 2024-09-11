import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function Signup() {
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
        url: '/dealer/signup',
        method: 'POST', 
        data: data, 
        withCredentials: true, 
      });
      console.log(res.data);
      if (res.data.message === "Signup successful, awaiting admin approval!") {
        window.alert("Signup successfully! Please wait For Admin's Approval");
        setTimeout(() => {
          navigate("/dealer/signin", { replace: true });
        }, 2000); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buttonStyle = (path) => 
    `py-2 px-4 rounded-lg shadow ${currentPath === path ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`;

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg)" }}>
      <div className="absolute top-4 right-4 flex gap-2">
        <Link to="/dealer/signin">
          <button className={buttonStyle('/dealer/signin')}>Signin</button>
        </Link>
        <Link to="/dealer/signup">
          <button className={buttonStyle('/dealer/signup')}>Signup</button>
        </Link>
      </div>
      
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 rounded-md border p-6 bg-transferent shadow-lg"
        >
          <input
            {...register("name")}
            placeholder="Name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <input
            {...register("email")}
            placeholder="Email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          <input type="submit" value="Signup" className="rounded-md bg-blue-500 py-2 text-white cursor-pointer hover:bg-blue-600" />
          <p className="text-gray-700 text-lg">
            Already have an account?{" "}
            <Link to="/dealer/signin" className="text-blue-500 underline text-lg">
              Signin
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
