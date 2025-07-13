import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";

const AllPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(""); // debounced value
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  // 🔁 Debounce the search input
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 1000),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Fetch data
  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["policies", search, category],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies", {
        params: { search, category },
      });
      return res.data;
    },
  });

  // Paginate filtered results
  const totalPages = Math.ceil(policies.length / itemsPerPage);
  const currentItems = policies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-accent">
        Explore Insurance Policies
      </h1>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or category"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Categories</option>
          <option value="Term Life">Term Life</option>
          <option value="Senior">Senior</option>
          <option value="Whole Life">Whole Life</option>
          <option value="Child">Child</option>
        </select>
      </div>

      {/* 📋 Policy Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((policy) => (
          <motion.div
            key={policy._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card bg-white shadow-xl rounded-2xl overflow-hidden"
          >
            <figure className="h-48">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg">{policy.title}</h2>
              <p className="text-sm text-gray-500">{policy.category}</p>
              <p className="text-sm mt-2 line-clamp-2">{policy.description}</p>
              <div className="card-actions mt-4 justify-end">
                <button className="btn btn-outline btn-sm">View Details</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔢 Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className="btn btn-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default AllPolicies;
