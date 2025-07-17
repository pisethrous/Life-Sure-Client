import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuthContext from "../../../Hooks/useAuthContext";
import uploadImageToImgbb from "../../../Hooks/uploadImageToImgbb";
import Swal from "sweetalert2";

const CreateBlogForm = ({ onClose, refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageUrl = await uploadImageToImgbb(imageFile);

      const blogData = {
        title: data.title,
        content: data.content,
        author: user.displayName || "Agent",
        authorEmail: user.email ,
        image: imageUrl,
        publishDate: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/blogs", blogData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Blog published successfully.", "success");
        refetch();
        reset();
        onClose();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create blog", "error");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Blog Title"
          className="input input-bordered w-full"
        />
        <textarea
          {...register("content", { required: true })}
          rows="6"
          placeholder="Blog Content"
          className="textarea textarea-bordered w-full"
        />
        <input
          {...register("image", { required: true })}
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
