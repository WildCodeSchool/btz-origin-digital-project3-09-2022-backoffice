import axios from "axios";

// On met l'url principale de l'API dans une contante
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

export default axiosInstance;
