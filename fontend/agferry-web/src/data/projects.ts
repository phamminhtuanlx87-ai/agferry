
export interface Project {
  id: number;
  name: string;
  depart: string;
  dateCreate: Date;
  dateStart: Date;
  totalEstimate?: number;
  verifyTheEstimate?: number;
  estimatesArise?: number;
  verifyestimatesArise?: number;
  settlement?: number;
  status: number;
}
export const projects: Project[] = [
  {
    id: 1,
    name: "Sửa chữa trên đà B21 (AG-24038)",
    depart: "P.Đầu tư",
    dateCreate: new Date("2026-01-09"),
    dateStart: new Date("2026-01-20"),
    totalEstimate: 7294000000,
    verifyTheEstimate: 7280000000,
    estimatesArise: -175000000,
    verifyestimatesArise: -180000000,
    settlement: 6280000000,
    status: 8,
  },
  {
    id: 2,
    name: "Sửa chữa trên đà A05 (AG-24038)",
    depart: "P.Kỹ thuật - Vật tư",
    dateCreate: new Date("2026-01-09"),
    dateStart: new Date("2026-01-20"),
    totalEstimate: 1294000000,
    verifyTheEstimate: 1280000000,
    estimatesArise: 0,
    verifyestimatesArise: 0,
    status: 5,
  },
  {
    id: 3,
    name: "Sửa chữa trên đà A06 (AG-24038)",
    depart: "P.XN Cơ khí",
    dateCreate: new Date("2026-01-09"),
    dateStart: new Date("2026-01-20"),
    totalEstimate: 6294000000,
    verifyTheEstimate: 6280000000,
    estimatesArise: 0,
    verifyestimatesArise: 0,
    status: 4,
  },
  {
    id: 4,
    name: "Sửa chữa trên đà Ponton (AG-24038)",
    depart: "P.Đầu tư",
    dateCreate: new Date("2026-01-09"),
    dateStart: new Date("2026-01-20"),
    totalEstimate: 7294000000,
    verifyTheEstimate: 7280000000,
    estimatesArise: -175000000,
    verifyestimatesArise: -180000000,
    settlement: 956794135,
    status: 8,
  },
  {
    id: 5,
    name: "Sửa chữa trên đà B21 (AG-24038)",
    depart: "P.Kỹ thuật - Vật tư",
    dateCreate: new Date("2026-01-09"),
    dateStart: new Date("2026-01-20"),
    totalEstimate: 7294000000,
    verifyTheEstimate: 7280000000,
    estimatesArise: -175000000,
    verifyestimatesArise: -180000000,
    status: 1,
  },
  {
    id: 6,
    name: "Sửa chữa trên đà B21 (AG-24038)",
    depart: "P.Kỹ thuật - Vật tư",
    dateCreate: new Date("2026-01-09"),
    dateStart: new Date("2026-01-20"),
    totalEstimate: 7294000000,
    verifyTheEstimate: 7280000000,
    estimatesArise: -175000000,
    verifyestimatesArise: -180000000,
    status: 1,
  },
  {
    id: 7,
    name: "Sửa chữa trên đà B21 (AG-24038)",
    depart: "P.Kỹ thuật - Vật tư",
    dateCreate: new Date("2026-01-09"),
    dateStart: new Date("2026-01-20"),
    totalEstimate: 7294000000,
    verifyTheEstimate: 7280000000,
    estimatesArise: -175000000,
    verifyestimatesArise: -180000000,
    status: 1,
  },
];