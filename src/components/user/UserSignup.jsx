import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  })
  .required();

export default function UserSignup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);

      if (res.data.message === "Signed successfully!") {
        // Show success alert
        window.alert("Signup successfully!");

        // Redirect to home page after alert
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 3000); // Delay for 1000 milliseconds (1 second)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg)" }}
    >
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 rounded-md border p-6 w-96 bg-white"
        >
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="block w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="block w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          <input
            {...register("email")}
            placeholder="Email"
            className="block w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="block w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          <input
            type="submit"
            value="Submit"
            className="rounded-md bg-blue-500 py-2 text-white h-14 cursor-pointer"
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
