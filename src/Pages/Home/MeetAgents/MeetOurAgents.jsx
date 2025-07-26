import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";

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

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="my-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-bold ">Meet Our Agents</h2>
          <p >Your Trusted Partners in Navigating Your Insurance Journey</p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {agents.map((agent) => (
          <SwiperSlide
            key={agent._id}
            className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white p-4"
          >
            <img
              src={agent.photoURL}
              alt={agent.name}
              className="w-full h-48 object-contain rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-1">
              {agent.name}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-1">
              🎯 3+ years of experience
            </p>
            <p className="text-sm text-center text-gray-500">
              🧠 Specialties: Term Life, Senior Plans
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MeetOurAgents;
