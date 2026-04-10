import api from "./api";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export interface AddProjectRequest {
    tenCongTrinh: string;
    ngayTao: string; // Backend dùng DateOnly, gửi chuỗi YYYY-MM-DD là chuẩn
    donViChuQuan: string;
    maHieuGiaiDoan: string;
    // Thêm các trường khác nếu cần, nhưng Backend hiện tại chỉ cần các trường trên
}
export const addProject = (data: AddProjectRequest) => {
 return api.post("/addproject", data);
};
export interface StagePayload {
    id?: number; // Có thể có hoặc không khi thêm mới
    congTrinhId: number;
    maHieuGiaiDoan: string;
    maHieuDonVi: string;
    ngayThucHien?: string;
    tongGiaTri?: number;
    chiPhiXayDung?: number;
    soNgayTcPgv?: string;
    ngayHoanThanh?: string;
    soNgayTcThucTe?: string;
    linkFile?: string;
}
export const addStage = (data: StagePayload) => {
  // Gửi trực tiếp 'data', không bọc trong { data }
  return api.post("/addstage", data); 
};


export const getProjectList = async (year: number) => {
  return await api.get(`/getprojectlist/${year}`);
};

export const getProject = async (id:number) => {
  const repo = await api.get(`/getproject/${id}`);
  return repo.data;
};