import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuthContext from "../../../Hooks/useAuthContext";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import CreateBlogForm from "./CreateBlogForm";
import EditBlogForm from "./EditBlogForm";

const Blogs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?email=${user.email}`);
      return res.data;
    },
  });


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Blog?",
      text: "Are you sure you want to delete this blog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/blogs/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
        refetch();
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
        >
          ➕ Create Blog
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>summary</th>

              <th>Publish Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-12 h-12 rounded-md"
                  />
                </td>
                <td>{blog.title}</td>
                <td className="overflow-hidden whitespace-nowrap text-ellipsis max-w-40" >{blog.content}</td>

                <td>{new Date(blog.publishDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-xs btn-outline mr-2"
                    onClick={() => setEditingBlog(blog)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {(isAddModalOpen || editingBlog) && (
        <dialog open className="modal">
          <div className="modal-box max-w-3xl">
            {editingBlog ? (
              <EditBlogForm
                blog={editingBlog}
                onClose={() => setEditingBlog(null)}
                refetch={refetch}
              />
            ) : (
              <CreateBlogForm
                onClose={() => setIsAddModalOpen(false)}
                refetch={refetch}
              />
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingBlog(null);
              }}
            >
              close
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Blogs;
