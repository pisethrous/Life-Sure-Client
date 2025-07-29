import axios from "axios";
import { useEffect, useMemo } from "react";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "https://assignment-12-server-xi-orpin.vercel.app/",
    });
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        console.log("🔐 Sending token to backend:", token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
