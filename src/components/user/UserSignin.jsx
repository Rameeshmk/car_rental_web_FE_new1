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

export default function UserSignin() {
  const navigate= useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) =>{
    try{
    const res = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      data,
      {
        withCredentials: true,
      },
    );
    const resData = await res.data;
    console.log("Response Data:", resData);
    if (resData.message === "Logged in!") {

      navigate("/home", { replace: true });
    }else{
      window.alert("User not Exists");
    }
    

      ;
    
  }catch (error) {
    console.error("Error during sign in:", error);
    
    
  }
};
   

  return (
    <div>
    <div
    className="flex justify-center items-center h-screen bg-cover bg-center"
    style={{ backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg" }} // Add your image path here
  >

    <div className="flex justify-center items-center w-auto ">
    <form
    
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 rounded-md border p-6 w-96 "
    >
      
      <input
        {...register("email")}
        placeholder="email"
        className="block w-full h-14 rounded-lg border bg-transparent border-gray-300 bg-whit-50 px-2 py-1.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
      <input
        {...register("password")}
        placeholder="password"
        className="block w-full h-14 rounded-lg border bg-transparent border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <input type="Submit" className="rounded-md bg-blue-500 py-1 text-white ease-in hover:scale-105 hover:transition-all hover:delay-150" />
      <p className="text-white">
        User not created yet{" "}
        <Link to="/user/signup" className="text-blue-500 underline">
          Signup
        </Link>
      </p>
      
    </form>
    </div>
    </div>
    </div>
  );
}