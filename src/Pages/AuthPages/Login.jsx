import React from "react";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";
import loginImg from "../../assets/login.png"
import GoBack from "../../Components/Back/GoBack";
const Login = () => {
  return (
    <div className="flex justify-center items-center ">
  
      <div className="card bg-base-100 w-full max-w-4xl shadow-2xl p-5 flex flex-col md:flex-row">
            <GoBack></GoBack>
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="font-bold text-4xl my-3 text-center text-accent">Login Now!</h1>
          <div className="card-body">
            <form className="fieldset">
              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
              {/* Password */}
              <label className="label mt-2">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                required
              />

              <button type="submit" className="btn btn-secondary mt-4 w-full">
                Login
              </button>

              <Link to="/auth/register" className="text-center text-sm mt-3 text-blue-500">
                Don’t have an account? Register
              </Link>
            </form>

            <SocialLogin />
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
          <img className=" w-[450px] " src={loginImg} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
