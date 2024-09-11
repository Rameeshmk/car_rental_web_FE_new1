import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";

// Validation schema
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function Signin() {
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
        url: '/dealer/signin',
        method: 'post',
        data: data,
        withCredentials: true, 
      });
      const resData = res.data;
      localStorage.setItem("dealerId",resData.dealerId)
      sessionStorage.setItem("token",resData.token);
      if (resData.userRole === "dealer") {
        if (resData.isApproved === true) {
        navigate("/dealer", { replace: true });
      } else if (resData.isApproved === false) {
        alert("Your request is under admin's approval.");
      }
      } else if (resData.userRole === "admin") {
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      console.error('Error during signin:', error);
      alert("Dealer not Exist");
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
          <input type="submit" value="Signin" className="rounded-md bg-blue-500 py-2 text-white cursor-pointer hover:bg-blue-600" />
          <p className="text-white text-lg">
            Dealer not created yet{" "}
            <Link to="/dealer/signup" className="text-blue-500 underline text-lg">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
