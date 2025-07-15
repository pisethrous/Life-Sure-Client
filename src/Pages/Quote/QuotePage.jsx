import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const QuotePage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Fetch the policy using TanStack Query
  const {
    data: policy,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["policy", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/policies/${id}`);
      return res.data;
    },
    enabled: !!id, // Prevent query from running if ID is undefined
  });

  const onSubmit = (data) => {
    const { age, gender, coverageAmount, duration, smoker } = data;

    const basePremium = policy?.basePremium || 100;
    const ageFactor = parseInt(age) * 2;
    const coverageFactor = parseFloat(coverageAmount) * 0.01;
    const durationFactor = parseInt(duration) * 10;
    const smokerFactor = smoker === "yes" ? 500 : 0;

    const monthlyPremium =
      basePremium + ageFactor + coverageFactor + durationFactor + smokerFactor;
    const annualPremium = monthlyPremium * 12;

    Swal.fire({
      title: "Estimated Premium",
      html: `
        <div class="text-left">
          <p><strong>Monthly Premium:</strong> ৳ ${monthlyPremium.toFixed(
            2
          )}</p>
          <p><strong>Annual Premium:</strong> ৳ ${annualPremium.toFixed(2)}</p>
          <hr class="my-2"/>
          <p class="text-sm">
            <strong>Breakdown:</strong><br/>
            Base Premium: ৳ ${basePremium}<br/>
            Age Factor (৳ 2 × ${age}): ৳ ${ageFactor}<br/>
            Coverage Factor (৳ 0.01 × ${coverageAmount}): ৳ ${coverageFactor.toFixed(
        2
      )}<br/>
            Duration Factor (৳ 10 × ${duration}): ৳ ${durationFactor}<br/>
            Smoker Penalty: ৳ ${smokerFactor}
          </p>
        </div>
      `,
      confirmButtonText: "OK",
    });
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load policy: {error.message}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 shadow rounded-xl my-12">
      {/* Progress Bar */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Step 1 of 3</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div className="bg-secondary h-2 rounded-full animate-pulse w-1/3"></div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-accent mb-6">
     Start Your Quote: Find Your Ideal Policy
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 "
      >
        {/* Age */}
        <div>
          <label className="label">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: 18 })}
            className="input input-bordered w-full"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="label">Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        {/* Coverage Amount */}
        <div>
          <label className="label">Coverage Amount (৳ )</label>
          <input
            type="number"
            {...register("coverageAmount", {
              required: "Coverage is required",
              min: 50000,
            })}
            className="input input-bordered w-full"
            placeholder="e.g. 2000000"
          />
          {errors.coverageAmount && (
            <p className="text-red-500 text-sm">
              {errors.coverageAmount.message}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="label">Duration (Years)</label>
          <input
            type="number"
            {...register("duration", {
              required: "Duration is required",
              min: 1,
            })}
            className="input input-bordered w-full"
            placeholder="e.g. 20"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
        </div>

        {/* Smoker */}
        <div>
          <label className="label">Are you a smoker?</label>
          <select
            {...register("smoker", {
              required: "Please select your smoking status",
            })}
            className="select select-bordered w-full"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.smoker && (
            <p className="text-red-500 text-sm">{errors.smoker.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-between items-center pt-4">
          <button type="submit" className="btn btn-secondary w-full">
            Get Estimate Premium
          </button>
        </div>
      </form>
      <div className="flex justify-between items-center pt-4">
        
            <button onClick={()=>navigate(`/application/${policy._id}`)} className="btn btn-outline btn-primary hover:bg-primary hover:text-white w-full">
              Apply For policy
            </button>
    
      </div>
    </div>
  );
};

export default QuotePage;
