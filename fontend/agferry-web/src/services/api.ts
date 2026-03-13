import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7211/api",
});

export default api;