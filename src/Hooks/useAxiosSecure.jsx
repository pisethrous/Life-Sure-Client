import axios from "axios";
import { useEffect } from "react";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // your backend base URL
    withCredentials: true,            // allows sending cookies (for JWT later)
  });

  // Optional: you can add interceptors here for token headers
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        console.error("Axios error:", err.response?.data || err.message);
        return Promise.reject(err);
      }
    );
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
