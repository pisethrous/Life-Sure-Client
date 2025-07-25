import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🔥 Popular Policies
      </h2>

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
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {policies.map((policy) => (
          <motion.div
            key={policy._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out relative"
          >
            <figure className="h-48 overflow-hidden">
              <motion.img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </figure>

            {/* Category Badge */}
            <span className="absolute top-3 right-3 bg-accent text-white text-xs font-semibold py-1 px-3 rounded-full shadow-md">
              {policy.category}
            </span>

            <div className="p-5 space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{policy.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {policy.description}
              </p>
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Coverage:</span> {policy.coverage}
                </p>
                <p>
                  <span className="font-medium">Duration:</span> {policy.duration}
                </p>
                <p>
                  <span className="font-medium">Popularity:</span> {policy.purchaseCount} purchases
                </p>
              </div>
              <button
                onClick={() => navigate(`/policies/${policy._id}`)}
                className="btn w-full mt-3 bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-transform duration-200 ease-in-out"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PopularPolicies;
