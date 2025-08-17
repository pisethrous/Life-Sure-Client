import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
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
   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 mx-auto px-4 my-12">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-primary">{blog.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {blog.content.slice(0, 90)}...
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{blog.author}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(blog.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button onClick={() => handleReadMore(blog._id)}
                 
                  className="text-sm text-primary hover:underline"
                >
                  Read more →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
  );
};

export default BlogList;
