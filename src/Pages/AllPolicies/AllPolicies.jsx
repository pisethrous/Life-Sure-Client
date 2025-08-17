import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";

const AllPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 800),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["policies", search, category],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies", {
        params: { search, category },
      });
      return res.data;
    },
  });

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
    <div className="px-4 py-10 w-11/12 mx-auto">
      <h1 className="lg:text-5xl text-2xl  font-extrabold text-center text-primary mb-8">
        🔍 Explore Insurance Policies
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full md:w-1/2 focus:outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          <option value="Term Life">Term Life</option>
          <option value="Senior">Senior</option>
          <option value="Whole Life">Whole Life</option>
          <option value="Child">Child</option>
        </select>
      </div>

      {/* Policies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((policy, i) => (
          <motion.div
            key={policy._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative group"
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </figure>

            <div className="card-body relative">
              <h2 className="card-title text-primary text-lg font-semibold">
                {policy.title}
              </h2>
              <p className="text-sm text-gray-600  line-clamp-2">
                {policy.description.slice(0, 60)}....
              </p>

              <div className="card-actions ">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/policies/${policy._id}`)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-all duration-300"
                >
                  View Details <FaArrowRightLong className="text-xs" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-2">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm btn-outline"
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
