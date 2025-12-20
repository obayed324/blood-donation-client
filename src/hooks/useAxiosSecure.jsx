import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://blood-donation-server-mu.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const req = axiosSecure.interceptors.request.use(config => {
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    const res = axiosSecure.interceptors.response.use(
      res => res,
      err => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logOut().then(() => navigate("/login"));
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(req);
      axiosSecure.interceptors.response.eject(res);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
