import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";

const PolicyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: policy, isLoading } = useQuery({
    queryKey: ["policy", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/policies/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={policy.image}
            alt={policy.title}
            className="rounded-xl w-full h-[400px] object-cover"
          />
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-accent">{policy.title}</h1>
          <p className="text-sm text-gray-600">{policy.category}</p>
          <hr className="my-2" />
          <p className="text-gray-700">{policy.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="font-semibold">Minimum Age:</p>
              <p>{policy.minAge} years</p>
            </div>
            <div>
              <p className="font-semibold">Maximum Age:</p>
              <p>{policy.maxAge} years</p>
            </div>
            <div>
              <p className="font-semibold">Coverage:</p>
              <p>{policy.coverage}</p>
            </div>
            <div>
              <p className="font-semibold">Duration:</p>
              <p>{policy.duration}</p>
            </div>
            <div>
              <p className="font-semibold">Base Premium:</p>
              <p>${policy.basePremium.toFixed(2)}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/quote/${policy._id}`)}
            >
              Get Quote
            </button>
            <button
              className="btn btn-outline btn-secondary hover:bg-secondary hover:text-white"
              onClick={() => navigate("/consultation")}
            >
              Book Agent Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
