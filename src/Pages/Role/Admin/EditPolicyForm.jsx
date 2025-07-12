import React from "react";
import { useForm } from "react-hook-form";


import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import uploadImageToImgbb from "../../../Hooks/uploadImageToImgbb";

const EditPolicyForm = ({ policy, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: policy.title,
      category: policy.category,
      description: policy.description,
      minAge: policy.minAge,
      maxAge: policy.maxAge,
      coverage: policy.coverage,
      duration: policy.duration,
      basePremium: policy.basePremium,
    },
  });

  const onSubmit = async (data) => {
    try {
      let imageUrl = policy.image;

      // If user uploads a new image
      if (data.image?.[0]) {
        imageUrl = await uploadImageToImgbb(data.image[0]);
      }

      const updatedPolicy = {
        ...data,
        minAge: parseInt(data.minAge),
        maxAge: parseInt(data.maxAge),
        basePremium: parseFloat(data.basePremium),
        image: imageUrl,
      };

      const res = await axiosSecure.patch(`/policies/${policy._id}`, updatedPolicy);

      if (res.data.modifiedCount > 0) {
        toast.success("✅ Policy updated successfully!");
        refetch();
        onClose();
      }
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6 text-center">✏️ Edit Policy</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="label">Policy Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            className="select select-bordered w-full"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            <option value="Term Life">Term Life</option>
            <option value="Senior">Senior</option>
            <option value="Whole Life">Whole Life</option>
            <option value="Child">Child</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            rows={3}
            className="textarea textarea-bordered w-full"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Age Range */}
        <div className="flex gap-4">
          <div className="w-full">
            <label className="label">Minimum Age</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("minAge", { required: "Minimum age is required" })}
            />
            {errors.minAge && <p className="text-red-500 text-sm">{errors.minAge.message}</p>}
          </div>
          <div className="w-full">
            <label className="label">Maximum Age</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("maxAge", { required: "Maximum age is required" })}
            />
            {errors.maxAge && <p className="text-red-500 text-sm">{errors.maxAge.message}</p>}
          </div>
        </div>

        {/* Coverage */}
        <div>
          <label className="label">Coverage Range</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("coverage", { required: "Coverage is required" })}
          />
          {errors.coverage && <p className="text-red-500 text-sm">{errors.coverage.message}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="label">Duration Options</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("duration", { required: "Duration is required" })}
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
        </div>

        {/* Base Premium */}
        <div>
          <label className="label">Base Premium Rate ($)</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            {...register("basePremium", { required: "Base premium is required" })}
          />
          {errors.basePremium && <p className="text-red-500 text-sm">{errors.basePremium.message}</p>}
        </div>

        {/* Optional Image Upload */}
        <div>
          <label className="label">Change Policy Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("image")}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPolicyForm;
