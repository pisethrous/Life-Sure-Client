import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaQuoteLeft } from "react-icons/fa";
import "./SwipperCustom.css"; // Optional: custom styles
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviewData = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data.map((r) => ({
        id: r._id,
        user_photoURL: r.photo,
        userName: r.name,
        review: r.message,
      }));
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading reviews...</p>;

  return (
    <section className="py-10 bg-base-100 my-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-neutral">
          What our customers are saying
        </h2>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          We deliver across all of Bangladesh. Here’s what our happy customers
          have to say!
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        spaceBetween={20}
        navigation
        className="max-w-5xl mx-auto"
      >
        {reviewData.map((item) => (
          <SwiperSlide key={item.id} className="review-slide">
            <div className="bg-white shadow-xl px-6 py-8 rounded-xl text-center transition-all duration-300">
              <FaQuoteLeft className="text-2xl text-primary mb-4 opacity-30" />
              <p className="text-gray-700 mb-6 text-sm">{item.review}</p>
              <div className="flex flex-col items-center">
                <img
                  src={item.user_photoURL}
                  alt={item.userName}
                  className="w-14 h-14 rounded-full border-2 border-primary mb-2"
                />
                <p className="font-bold text-primary">{item.userName}</p>
                <p className="text-sm text-gray-500">Customer</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReviews;
