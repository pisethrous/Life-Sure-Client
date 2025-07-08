import React from "react";
import { Link } from "react-router"; 
import SocialLogin from "./SocialLogin";
import registerImg from "../../assets/register.png"; 
import GoBack from "../../Components/Back/GoBack";

const Register = () => {
  return (
    <div className="flex justify-center items-center  ">
      <div className="card bg-base-100 w-full max-w-4xl shadow-2xl p-5 flex flex-col md:flex-row">
         <GoBack></GoBack>
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="font-bold text-4xl my-3 text-center text-accent">Register Now!</h1>
          <div className="card-body">
            <form className="fieldset">

              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Enter Your Name"
              />

              {/* Photo URL */}
              <label className="label mt-2">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input input-bordered w-full"
                placeholder="Enter Your Photo URL"
              />

              {/* Email */}
              <label className="label mt-2">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter Your Email"
                required
              />

              {/* Password */}
              <label className="label mt-2">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Enter Password"
                required
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, include number, lowercase and uppercase letters"
              />

              {/* Link + Button */}
              <Link to="/auth/login" className="text-blue-500 text-sm mt-3 block">
                Already have an account? Login
              </Link>

              <button type="submit" className="btn btn-secondary mt-4 w-full">
                Register
              </button>
            </form>

            <SocialLogin />
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
          <img src={registerImg} alt="Register Visual" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Register;
