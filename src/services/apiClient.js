import axios from "axios";
import { ENV } from "../config/env";

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// hon mnhat l token eza ken mawjoud (la yt2akdo menna bl backend)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ntna2ash shou l config hiye:
// l config asassiyan hiye object l request:

// {
//   url: "/pets",
//   method: "get",
//   headers: {...}
// }