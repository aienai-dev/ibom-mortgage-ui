import axios from "axios";

// const { decrypt } = useEncrypt();

const axiosInstance = axios.create({
  baseURL: "https://ibom-mortgage-api.fly.dev",
  timeout: 10000,
  headers: {},
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., add auth token)
    const token = localStorage.getItem("access_token"); // or from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access - redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
