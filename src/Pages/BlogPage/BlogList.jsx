import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import moment from "moment";
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import toast from "react-hot-toast";

const BlogList = () => {
  const axiosSecure = useAxiosSecure();
const navigate = useNavigate();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
  });

  const handleReadMore = async (id) => {
  try {
    await axiosSecure.patch(`/blogs/${id}/visit`);
    navigate(`/blogs/${id}`);
  } catch (err) {
    toast.error("Failed to update view count");
    navigate(`/blogs/${id}`); // Still navigate even if patch fails
  }
};


  if (isLoading) return <Loading />;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto my-16">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="card bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full p-2 h-48 rounded-md object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {blog.content.length > 120
                ? blog.content.slice(0, 120) + "..."
                : blog.content}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">{blog.author}</span>
            
            </div>
            <p className="text-xs text-gray-400 mb-2">
              Published: {moment(blog.publishDate).format("MMM D, YYYY")}
            </p>
            <p className="text-sm mb-2">Total Visit: {blog.totalVisit}</p>
            <button
            
                onClick={() => handleReadMore(blog._id)}
              className="btn btn-sm btn-secondary text-white w-full"
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
