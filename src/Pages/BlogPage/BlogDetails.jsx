import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import moment from "moment";

import { useQuery } from "@tanstack/react-query";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (isError || !blog)
    return <p className="text-center mt-10">Failed to load blog.</p>;

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-xl shadow-md">
      {/* Top layout: Image + Author */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full md:w-1/2 h-72 object-cover rounded-lg"
        />
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={blog.authorImage || "https://i.ibb.co/z4scJgP/user.png"}
              alt={blog.author}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">{blog.author}</p>
              <p className="text-sm text-gray-500">
                {moment(blog.publishDate).format("MMMM Do, YYYY")}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            ✍️ Author: {blog.authorEmail}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            📈 Total Visits: {blog.totalVisit}
          </div>
          
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* Blog content */}
      <div className="prose max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
        {blog.content}
      </div>
      <div className="mt-8 ">
            <button
              onClick={() => navigate("/blogs")}
              className="btn btn-outline btn-secondary "
            >
              ← Back to Blogs
            </button>
          </div>

      {/* Bottom divider */}
      <hr className="mt-12 border-dashed border-gray-300" />
    </div>
  );
};

export default BlogDetails;
