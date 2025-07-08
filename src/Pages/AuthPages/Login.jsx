import React from "react";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import loginImg from "../../assets/login.png";
import GoBack from "../../Components/Back/GoBack";
import { useForm } from "react-hook-form";
import useAuthContext from "../../Hooks/useAuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then((result) => {
       console.log(result.user);
        toast.success("Login successful!");
        navigate("/"); 
      })
      .catch((err) => {
        toast.error(err.message || "Login failed!");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card bg-base-100 w-full max-w-4xl shadow-2xl p-5 flex flex-col md:flex-row">
        <GoBack />

        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="font-bold text-4xl my-3 text-center text-accent">
            Login Now!
          </h1>
          <div className="card-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="fieldset space-y-3"
            >
              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button type="submit" className="btn btn-secondary mt-4 w-full">
                Login
              </button>

              <Link
                to="/auth/register"
                className="text-center text-sm mt-3 text-blue-500 block"
              >
                Don’t have an account? Register
              </Link>
            </form>

            <SocialLogin />
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
          <img className="w-[450px]" src={loginImg} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
