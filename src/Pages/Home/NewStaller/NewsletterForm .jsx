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
    <div className="bg-accent text-white my-12 mx-auto p-6 flex lg:flex-row flex-col-reverse items-center gap-10 justify-center ">
        <div >
            <h1 className="text-2xl text-center">Get Policy News</h1>
            <p className="mb-4 text-center"> Simple tips, helpful blogs, and the latest policies to increase your interest.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
                <label >Name:</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: true })}
            className="input input-bordered w-full text-black"
          />
            <label >Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full text-black"
          />
          <button type="submit" className="btn btn-secondary w-full">
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
