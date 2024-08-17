import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();

export default function Signin() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) =>{

    const res = await axios.post(
        "http://localhost:3000/api/v1/dealer/signin",
        data,
        {
          withCredentials: true,
        },
      );
      const resData = await res.data;
      if (resData.userRole === "dealer") {
       
        navigate("/dealer", { replace: true });
      }
       if (resData.userRole === "admin") {
       
        navigate("/admin", { replace: true });
      }
      
      
  } ;
  return (
    <div
    className="flex justify-center items-center h-screen bg-cover bg-center"
    style={{ backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg" }} 
  >

    <div className="flex justify-center items-center w-auto ">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 rounded-md border p-6"
    >
      <input
        {...register("email")}
        placeholder="email"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register("password")}
        placeholder="password"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
      <p>
        Instructor not created yet{" "}
        <Link to="/dealer/signup" className="text-blue-500 underline">
          Signup
        </Link>
      </p>
    </form>
    </div>
    </div>
  );
}
