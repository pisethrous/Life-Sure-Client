import React from "react";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import news from "../../../assets/news.png"
const NewsletterForm = () => {
  const { register, handleSubmit, reset } = useForm();
const AxiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    try {
      const res = await AxiosSecure.post("/newsletter", data);
      if (res.data.insertedId) {
        Swal.fire("Thank you!", "You've subscribed successfully!", "success");
        reset();
      }
    } catch (err) {
      Swal.fire("Oops!", err.response?.data?.message || "Subscription failed", "error");
    }
  };

  return (
    <div className="bg-[#E2E7EE]  py-12 flex lg:flex-row flex-col-reverse items-center  justify-around ">
        <div >
            <h1 className="lg:text-5xl text-2xl text-primary text-center mb-2">Get Policy News</h1>
             <p className=" mb-6 text-md text-black opacity-70">
          Get simple tips, helpful blogs, and the latest policy updates straight <br />
          to your inbox. Stay informed and make smarter decisions.
        </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
                <label className="opacity-45 text-black" >Name:</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: true })}
            className="input input-bordered w-full "
          />
            <label className="opacity-45 text-black" >Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full "
          />
          <button type="submit"className="btn btn-outline btn-primary w-full">
            Subscribe
          </button>
        </form>
        </div>
        <div>
            <img width={400} src={news} alt="" />
        </div>
      
    </div>
  );
};

export default NewsletterForm;
