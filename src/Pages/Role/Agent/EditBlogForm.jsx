import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import uploadImageToImgbb from "../../../Hooks/uploadImageToImgbb";
import Swal from "sweetalert2";
import useAuthContext from "../../../Hooks/useAuthContext";

const EditBlogForm = ({ blog, onClose, refetch }) => {
  const { user } = useAuthContext();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: blog.title,
      content: blog.content,
    },
  });

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      let imageUrl = blog.image;
      if (data.image?.length) {
        imageUrl = await uploadImageToImgbb(data.image[0]);
      }

      const updatedBlog = {
        title: data.title,
        content: data.content,
        image: imageUrl,
        authorEmail:user.email
      };

      const res = await axiosSecure.put(`/blogs/${blog._id}`, updatedBlog);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Blog updated successfully.", "success");
        refetch();
        onClose();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update blog", "error");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
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
          {...register("image")}
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogForm;
