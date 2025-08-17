import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const MeetOurAgents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["featured-agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-agents");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-52">
        <Loading />
      </div>
    );

  const staticAgents = [
    {
      _id: "static-1",
      name: "Alice Johnson",
      photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
      experience: "5+ years",
      specialties: "Term Life, Health Insurance",
    },
    {
      _id: "static-2",
      name: "Bob Smith",
      photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
      experience: "3+ years",
      specialties: "Senior Plans, Retirement Plans",
    },
  ];

  const displayAgents = [...agents, ...staticAgents];

  return (
    <div className="my-12 px-4 md:px-8 lg:px-16 w-full mx-auto">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-5xl text-primary md:text-4xl font-bold">Meet Our Agents</h2>
        <p className="text-gray-600 mt-2">
          Your Trusted Partners in Navigating Your Insurance Journey
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        slidesPerView={4} // Default 4 slides
        spaceBetween={20}
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="pb-8"
      >
        {displayAgents.map((agent) => (
          <SwiperSlide key={agent._id} className="flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-4 text-center w-full max-w-[250px] transition-transform duration-300 hover:scale-105">
              <img
                src={agent.photoURL}
                alt={agent.name}
                className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full mb-4 transition-all duration-300 hover:grayscale filter"
              />
              <h3 className="text-lg md:text-xl font-semibold mb-1 text-black/80">{agent.name}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-1">
                🎯 {agent.experience || "3+ years of experience"}
              </p>
              <p className="text-sm md:text-base text-gray-500">
                🧠 {agent.specialties || "Term Life, Senior Plans"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MeetOurAgents;
