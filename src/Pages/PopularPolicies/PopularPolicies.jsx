import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PopularPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["popularPolicies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-policies");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto px-4 my-12">
    <div className="text-center mb-10">
  <h2 className="text-3xl md:text-5xl font-bold text-primary">
    Popular Policies
  </h2>
  <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
    Explore the most trusted and frequently chosen insurance plans by our customers. <br />
    Find the one that suits your needs best.
  </p>
</div>
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }}
  className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
>
  {policies.map((policy) => (
    <motion.div
      key={policy._id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden group transition-all duration-300 ease-in-out"
    >
      {/* Image */}
      <figure className="relative h-40 overflow-hidden">
        <motion.img
          src={policy.image}
          alt={policy.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Small overlay badge */}
        <span className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-2 py-1 rounded-md shadow">
          Popular
        </span>
      </figure>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {policy.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {policy.description.slice(0, 60)}...
        </p>

        {/* Buttons */}
        <div className="pt-3">
          <button
            onClick={() => navigate(`/policies/${policy._id}`)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-all duration-300"
          >
            See More <FaArrowRightLong className="text-xs" />
          </button>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

    </div>
  );
};

export default PopularPolicies;
