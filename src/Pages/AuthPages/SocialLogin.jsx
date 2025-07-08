import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router";

import { toast } from "react-hot-toast";
import useAuthContext from "../../Hooks/useAuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { continueWithGoogle } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleSocial = async () => {
    try {
      const result = await continueWithGoogle();
      const user = result.user;

      // construct user object
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "customer",
        lastLogin: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId) {
        toast.success("🎉 Registered with Google!");
      } else if (res.data.message === "User already exists") {
        toast.success("👋 Welcome back!");
      }

      navigate(from);
    } catch (err) {
      console.error("⛔ Google login failed:", err);
      toast.error("Google login failed");
    }
  };

  return (
    <div>
      <div className="flex w-full flex-col">
        <div className="divider">OR</div>
      </div>

      <button onClick={handleSocial} className="btn btn-accent text-white w-full">
        <FcGoogle /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
