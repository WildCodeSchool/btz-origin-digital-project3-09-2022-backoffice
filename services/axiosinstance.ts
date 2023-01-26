import axios from "axios";

// On met l'url principale de l'API dans une contante
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "SERVER_URL",
  withCredentials: true,
});

export default axiosInstance;
