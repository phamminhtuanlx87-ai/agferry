import api from "./api";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};


export const addProject = (donViChuQuan: string, tenCongTrinh: string, ngayTao: string, donVi:string, trangThai: string) => {
  return api.post("/Project/add", {
    donViChuQuan: donViChuQuan,
    tenCongTrinh: tenCongTrinh,
    ngayTao: ngayTao,
    donVi: donVi,
    trangThai: trangThai,
  });
};

export const getProjectList = async (year: number) => {
  return await api.get(`/getprojectlist/${year}`);
};

export const getProject = async (id:number) => {
  const repo = await api.get(`/getproject/${id}`);
  return repo.data;
};