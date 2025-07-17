import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import Loading from "../../Components/Loading/Loading";

const AgentApplicationForm = () => {
  const axiosSecure = useAxiosSecure();

const {user,isLoading} = useCurrentUser();
console.log(user.name,user.email,user.role);

  const [hasApplied, setHasApplied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isAdmin =user.role === "admin";
  const isButtonDisabled = isAdmin || hasApplied;

  const onSubmit = async (data) => {
    try {
      const application = {
        ...data,
        role: user.role,
        status: "pending",
        appliedAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/agent-applications", application);
      if (res.data.insertedId) {
        Swal.fire("Success", "Your agent application has been submitted!", "success");
        setHasApplied(true); // Disable button
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  if (
isLoading) return  <Loading></Loading>;

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
        Apply to Become an Agent
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            defaultValue={user.name }
            readOnly
            className="input input-bordered w-full"
            {...register("name")}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            defaultValue={user.email }
            readOnly
            className="input input-bordered w-full"
            {...register("email")}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
           
           
            className="input input-bordered w-full"
            {...register("phone")}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
          
     
            className="input input-bordered w-full"
            {...register("address")}
          />
        </div>

        {/* Motivation */}
        <div>
          <label className="block font-medium mb-1">
            Why do you want to become an agent?
          </label>
          <textarea
            {...register("message", { required: "This field is required" })}
            className="textarea textarea-bordered w-full"
            placeholder="Explain briefly"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isButtonDisabled}
        >
          {isAdmin
            ? "Admins can't apply"
            : hasApplied
            ? "Already Applied"
            : "Apply as Agent"}
        </button>
      </form>
    </div>
  );
};

export default AgentApplicationForm;
