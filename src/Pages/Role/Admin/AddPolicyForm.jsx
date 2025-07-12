import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import uploadImageToImgbb from "../../../Hooks/uploadImageToImgbb";
import toast from "react-hot-toast";


const AddPolicyForm = ({ onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ Upload image to imgbb
      const imageFile = data.image[0];
      const imageUrl = await uploadImageToImgbb(imageFile);

      const newPolicy = {
        title: data.title,
        category: data.category,
        description: data.description,
        minAge: parseInt(data.minAge),
        maxAge: parseInt(data.maxAge),
        coverage: data.coverage,
        duration: data.duration,
        basePremium: parseFloat(data.basePremium),
        image: imageUrl,
      };

      // ✅ Post to backend
      const res = await axiosSecure.post("/policies", newPolicy);
      if (res.data.insertedId) {
        refetch(); // refetch policies
          toast.success("policies has been added successful!");
        reset();   // clear form
        onClose(); // close modal
      }
    } catch (err) {
      console.error("Error submitting policy:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Title */}
      <div className="form-control">
        <label className="label">Policy Title</label>
        <input
          type="text"
          className="input input-bordered"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Category */}
      <div className="form-control">
        <label className="label">Category</label>
        <select
          className="select select-bordered"
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
      <div className="form-control">
        <label className="label">Description</label>
        <textarea
          className="textarea textarea-bordered"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Min & Max Age */}
      <div className="flex gap-4">
        <div className="form-control w-full">
          <label className="label">Minimum Age</label>
          <input
            type="number"
            className="input input-bordered"
            {...register("minAge", { required: "Min age is required" })}
          />
          {errors.minAge && <p className="text-red-500 text-sm">{errors.minAge.message}</p>}
        </div>
        <div className="form-control w-full">
          <label className="label">Maximum Age</label>
          <input
            type="number"
            className="input input-bordered"
            {...register("maxAge", { required: "Max age is required" })}
          />
          {errors.maxAge && <p className="text-red-500 text-sm">{errors.maxAge.message}</p>}
        </div>
      </div>

      {/* Coverage */}
      <div className="form-control">
        <label className="label">Coverage Range</label>
        <input
          type="text"
          className="input input-bordered"
          {...register("coverage", { required: "Coverage is required" })}
        />
        {errors.coverage && <p className="text-red-500 text-sm">{errors.coverage.message}</p>}
      </div>

      {/* Duration */}
      <div className="form-control">
        <label className="label">Duration Options</label>
        <input
          type="text"
          className="input input-bordered"
          placeholder="e.g. 10, 20, 30 years"
          {...register("duration", { required: "Duration is required" })}
        />
        {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
      </div>

      {/* Base Premium */}
      <div className="form-control">
        <label className="label">Base Premium Rate ($)</label>
        <input
          type="number"
          step="0.01"
          className="input input-bordered"
          {...register("basePremium", { required: "Base premium is required" })}
        />
        {errors.basePremium && <p className="text-red-500 text-sm">{errors.basePremium.message}</p>}
      </div>

      {/* Image */}
      <div className="form-control">
        <label className="label">Policy Image</label>
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered"
          {...register("image", { required: "Image is required" })}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add Policy
        </button>
      </div>
    </form>
  );
};

export default AddPolicyForm;
