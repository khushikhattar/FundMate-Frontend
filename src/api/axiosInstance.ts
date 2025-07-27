import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3131/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "http://localhost:3131/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );
        return axiosInstance(originalRequest);
      } catch (err) {
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
