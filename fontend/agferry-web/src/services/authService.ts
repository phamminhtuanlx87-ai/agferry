import api from "./api";

export const login = (username: string, password: string) => {
  return api.post("/Users/login", {
    username: username,
    password: password,
  });
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};