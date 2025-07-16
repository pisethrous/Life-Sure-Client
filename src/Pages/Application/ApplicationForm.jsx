import React from "react";
import { useForm, Controller } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Select from "react-select";
import useAuthContext from "../../Hooks/useAuthContext";
import { useLocation } from "react-router";

const relationships = [
  { value: "Spouse", label: "Spouse" },
  { value: "Child", label: "Child" },
  { value: "Parent", label: "Parent" },
  { value: "Sibling", label: "Sibling" },
  { value: "Other", label: "Other" },
];

const healthConditions = [
  "Diabetes",
  "Heart Disease",
  "High Blood Pressure",
  "Cancer",
  "Asthma",
  "Liver Disease",
  "Kidney Disease",
  "Thyroid Disorder",
  "Depression",
  "Arthritis",
];

const ApplicationForm = () => {
  const axiosSecure = useAxiosSecure();
const {user}=useAuthContext();
const {state}=useLocation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const applicationData = {
      ...data,
      policy_name:state,
      status: "Pending",
      
    };

    try {
      const res = await axiosSecure.post("/applications", applicationData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Application submitted successfully!", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit application", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Step 2 of 3</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div className="bg-secondary h-2 rounded-full w-2/3"></div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-accent mb-6">Begin Your Journey to Protection</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 shadow rounded-xl">
        {/* Personal Info */}
        <fieldset>
          <legend className="text-lg font-semibold mb-2">Personal Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input {...register("name", { required: true })} defaultValue={user?.displayName} readOnly className="input input-bordered w-full" />
             
            </div>
            <div>
              <label className="label">Email</label>
              <input {...register("email", { required: true })} defaultValue={user?.email} readOnly className="input input-bordered w-full" />
            
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input {...register("phone", { required: true })} className="input input-bordered w-full" />
              {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
            </div>
            <div>
              <label className="label">Date of Birth</label>
              <input type="date" {...register("dob", { required: true })} className="input input-bordered w-full" />
              {errors.dob && <p className="text-red-500 text-sm">Date of Birth is required</p>}
            </div>
            <div>
              <label className="label">Address</label>
              <input {...register("address", { required: true })} className="input input-bordered w-full" />
              {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
            </div>
            <div>
              <label className="label">NID/SSN</label>
              <input {...register("nid", { required: true })} className="input input-bordered w-full" />
              {errors.nid && <p className="text-red-500 text-sm">NID/SSN is required</p>}
            </div>
          </div>
        </fieldset>

        {/* Nominee Info */}
        <fieldset>
          <legend className="text-lg font-semibold mb-2">Nominee Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Nominee Name</label>
              <input {...register("nomineeName", { required: true })} className="input input-bordered w-full" />
              {errors.nomineeName && <p className="text-red-500 text-sm">Nominee name is required</p>}
            </div>
            <div>
              <label className="label">Relationship</label>
              <Controller
                name="relationship"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} options={relationships} className="w-full" />
                )}
              />
              {errors.relationship && <p className="text-red-500 text-sm">Relationship is required</p>}
            </div>
            <div className="md:col-span-2">
              <label className="label">Nominee NID</label>
              <input {...register("nomineeNid", { required: true })} className="input input-bordered w-full" />
              {errors.nomineeNid && <p className="text-red-500 text-sm">Nominee NID is required</p>}
            </div>
          </div>
        </fieldset>

        {/* Health Disclosure */}
        <fieldset>
          <legend className="text-lg font-semibold mb-2">Health Disclosure</legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {healthConditions.map((condition) => (
              <label key={condition} className="flex gap-2 items-center">
                <input type="checkbox" {...register(`health.${condition}`)} className="checkbox" />
                {condition}
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-secondary text-white w-full mt-4">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
