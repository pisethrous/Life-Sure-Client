import React from "react";
import { Link, useNavigate } from "react-router"; // ✅ fixed import
import { useForm } from "react-hook-form";
import registerImg from "../../assets/register.png";
import GoBack from "../../Components/Back/GoBack";
import SocialLogin from "./SocialLogin";
import { toast } from "react-hot-toast";

// 🔌 Custom hooks
import useAuthContext from "../../Hooks/useAuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import uploadImageToImgbb from "../../Hooks/uploadImageToImgbb";

const Register = () => {
  const { createUser, updateUser } = useAuthContext(); // Firebase context
  const axiosSecure = useAxiosSecure(); // Axios instance
  const navigate = useNavigate(); // For navigation

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, photo } = data;
    const imageFile = photo[0];

  

    createUser(email, password)
      .then((result) => {
        toast.success("✅ Firebase user created");
        console.log("👤 Firebase user:", result.user);
        return uploadImageToImgbb(imageFile);
      })
      .then((photoURL) => {

        return updateUser(name, photoURL).then(() => {
          const userInfo = {
            name,
            email,
            photoURL,
            role: "customer",
            lastLogin: new Date().toISOString(),
          };
    
          return axiosSecure.post("/users", userInfo);
        });
      })
      .then((res) => {
      

        if (res.data.insertedId) {
          toast.success("🎉 Registration complete!");
          console.log("✅ User inserted into DB");
          reset();
          navigate("/");
        } else if (res.data.message === "User already exists") {
          toast.success("⚠️ User already exists, redirecting...");
          navigate("/");
        } else {
          throw new Error("❌ User not saved in DB");
        }
      })
      .catch((err) => {
        console.error("⛔ Registration failed:", err);
        toast.error(err.message || "Something went wrong!");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card bg-base-100 w-full max-w-4xl shadow-2xl p-5 flex flex-col md:flex-row">
        <GoBack />

        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="font-bold text-4xl my-3 text-center text-accent">Register Now!</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-3">

              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
                placeholder="Enter Your Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              {/* Photo Upload */}
              <label className="label">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Photo is required" })}
                className="file-input file-input-bordered w-full"
              />
              {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                placeholder="Enter Your Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters",
                  },
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                    message: "Must include number, lowercase and uppercase",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              {/* Link + Button */}
              <Link to="/auth/login" className="text-blue-500 text-sm mt-2 block">
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
