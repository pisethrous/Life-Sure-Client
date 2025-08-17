import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

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
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );

  // Static fallback / enrichment data
  const staticAgents = [
    {
      _id: "static-1",
      name: "Alice Johnson",
      photoURL:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&h=400&w=400",
      experience: "5+ years",
      specialties: "Term Life, Health Insurance",
    },
    {
      _id: "static-2",
      name: "Bob Smith",
      photoURL:
        "https://images.unsplash.com/photo-1603415526960-f85b5ff79b49?crop=entropy&cs=tinysrgb&fit=max&h=400&w=400",
      experience: "3+ years",
      specialties: "Senior Plans, Retirement Plans",
    },
  ];

  // Merge dynamic + static data
  const displayAgents = [...agents, ...staticAgents];

  return (
    <div className="my-12 px-4 md:px-8 lg:px-16 w-full mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Meet Our Agents</h2>
        <p className="text-gray-600 mt-2">
          Your Trusted Partners in Navigating Your Insurance Journey
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {displayAgents.map((agent) => (
          <SwiperSlide
            key={agent._id}
            className="flex flex-col items-center justify-center max-w-xs md:max-w-sm bg-white rounded-xl shadow-lg p-4"
          >
            <img
              src={agent.photoURL}
              alt={agent.name}
              className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-1">
              {agent.name}
            </h3>
            <p className="text-sm md:text-base text-center text-gray-600 mb-1">
              🎯 {agent.experience || "3+ years of experience"}
            </p>
            <p className="text-sm md:text-base text-center text-gray-500">
              🧠 Specialties: {agent.specialties || "Term Life, Senior Plans"}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MeetOurAgents;
