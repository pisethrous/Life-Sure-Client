import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LatestBlogs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs/latest");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-16 bg-base-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral">Latest Blogs & Articles</h2>
        <p className="text-gray-500 mt-2">Stay informed and inspired with our expert articles</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
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
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;
