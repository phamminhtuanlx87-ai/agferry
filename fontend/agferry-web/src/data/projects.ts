
export interface Project {
  id: number;
  name: string;
  depart: string;
  dateCreate: Date;
  dateStart: Date;
  totalEstimate: number;
  constructionCosts: number;
  status: number;
}
export const projects: Project[] = [
  {
    id: 1,
    name: "Sửa chữa trên đà B21 (AG-24038)",
    depart: "P.Kỹ thuật - Vật tư",
    dateCreate: new Date("2026-01-09"),
    dateStart: new Date("2026-01-20"),
    totalEstimate: 729464000,
    constructionCosts: 612464000,
    status: 1,
  },
  {
    id: 2,
    name: "Bảo dưỡng tàu 302",
    depart: "P.Khai thác",
    dateCreate: new Date("2026-02-01"),
    dateStart: new Date("2026-02-10"),
    totalEstimate: 520000000,
    constructionCosts: 430000000,
    status: 2,
  },
  {
    id: 3,
    name: "Đóng mới tàu 4500T",
    depart: "P.Thiết kế",
    dateCreate: new Date("2026-03-15"),
    dateStart: new Date("2026-03-25"),
    totalEstimate: 1200000000,
    constructionCosts: 950000000,
    status: 3,
  },
  {
    id: 4,
    name: "Đóng mới tàu 4500T",
    depart: "P.Thiết kế",
    dateCreate: new Date("2026-03-15"),
    dateStart: new Date("2026-03-25"),
    totalEstimate: 1200000000,
    constructionCosts: 950000000,
    status: 8,
  },
  {
    id: 5,
    name: "Đóng mới tàu 4500T",
    depart: "P.Thiết kế",
    dateCreate: new Date("2026-03-15"),
    dateStart: new Date("2026-03-25"),
    totalEstimate: 1200000000,
    constructionCosts: 950000000,
    status: 3,
  },
  {
    id: 6,
    name: "Đóng mới tàu 4500T",
    depart: "P.Thiết kế",
    dateCreate: new Date("2026-03-15"),
    dateStart: new Date("2026-03-25"),
    totalEstimate: 1200000000,
    constructionCosts: 950000000,
    status: 3,
  },
];