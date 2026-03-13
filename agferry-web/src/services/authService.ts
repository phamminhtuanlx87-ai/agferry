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

export const register = (username: string, password: string, email: string, fullname:string, roleID: number) => {
  return api.post("/Users/register", {
    username: username,
    password: password,
    email: email,
    fullname: fullname,
    roleID: roleID,
  });
};