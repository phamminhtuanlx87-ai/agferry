import { EstimationSection } from "./EstimationSection";
import type { ProjectFormData } from "./types";
import { useForm } from "react-hook-form";
import { GeneralInfo } from "./GeneralInfo";
import { DecisionSection } from "./DecisionSection";
import { ConstructionSection } from "./ConstructionSection";
import { BudgetAdjustmentDecision } from "./BudgetAdjustmentDecision";
import { SettlementProfile } from "./SettlementProfile";
import { AdjustedEstimateSection } from "./AdjustedEstimateSection";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject } from "@/services/projectService";

interface ChiTiet {
  id: number;
  maHieuGiaiDoan: string; // "DT", "DTDC", "QT"...
  maHieuDonVi: string;
  tongGiaTri: number;
  chiPhiXayDung: number;
  ngayThucHien: string;
  soNgayTcPgv: string;
  soNgayTcThucTe: string;
  ngayHoanThanh: string;
  linkFile: string;
  // Thêm các trường khác thấy trong console nếu cần
}

interface ProjectDetail {
  tenCongTrinh: string;
  donViChuQuan: string;
  tenGiaiDoan: string;
  maHieuGiaiDoan: string;
  ngayTao: string;
  chiTietCongTrinhs: ChiTiet[]; // Khai báo mảng chứa các ChiTiet
}

const UpdateProject = () => {
  // Khai báo công cụ quản lý form
  const { register, handleSubmit, reset, watch } = useForm<ProjectFormData>();
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const isEditMode = !!projectId;
  // Khi bấm nút "Lưu thay đổi", hàm này sẽ chạy
  const onSubmit = (data: ProjectFormData) => {
    alert("Đã thu thập dữ liệu thành công! Hãy xem trong console.");
    console.log("Dữ liệu form:", data);
  };

  const [project, setProject] = useState<ProjectDetail>();
  const navigate = useNavigate(); // 2. Khởi tạo navigate
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProject(projectId);
        const data = (res.data || res) as ProjectDetail;
        setProject(data);
        console.log(data);
        // Lọc ra các giai đoạn cụ thể từ mảng chi tiết
        const giaiDoanDT = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "DT",
        );
        const giaiDoanTTr = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "TTR_DT",
        );
        const giaiDoanPDDT = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "PD_DT",
        );
        const giaiDoanTC = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "TC",
        );
        const giaiDoanNT = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "NT",
        );
        const giaiDoanDTPS = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "DT_PS",
        );
        const giaiDoanTTrDTPS = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "TTR_DT_PS",
        );
        const giaiDoanPDDTDC = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "PD_DT_PS",
        );
        const giaiDoanQT = data.chiTietCongTrinhs?.find(
          (x) => x.maHieuGiaiDoan === "QT",
        );
        // Đổ dữ liệu vào Form
        reset({
          // I. Thông tin chung
          donViChuQuan: data.donViChuQuan,
          tenCongTrinh: data.tenCongTrinh,
          ngayTao: data.ngayTao?.split("T")[0],

          // II. Dự toán (Map từ giai đoạn "DT") && Thẩm tra DT
          // Dự toán
          dt_ngay: giaiDoanDT?.ngayThucHien?.split("T")[0], // Theo console là ngayThucHien
          dt_TongGiaTri: giaiDoanDT?.tongGiaTri
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanDT.tongGiaTri)
            : "",
          dt_TongCPXD: giaiDoanDT?.chiPhiXayDung
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanDT.chiPhiXayDung)
            : "",
          dt_DonVi: giaiDoanDT?.maHieuDonVi,
          dt_link: giaiDoanDT?.linkFile,
          //Thẩm tra DT
          tt_ngay: giaiDoanTTr?.ngayThucHien?.split("T")[0],
          tt_TongGiaTri: giaiDoanTTr?.tongGiaTri
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanTTr.tongGiaTri)
            : "",
          tt_TongCPXD: giaiDoanTTr?.tongGiaTri
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanTTr.chiPhiXayDung)
            : "",
          tt_DonVi: giaiDoanTTr?.maHieuDonVi,
          tt_link: giaiDoanTTr?.linkFile,
          //III. QĐ phê duyệt DT
          pd_ngay: giaiDoanPDDT?.ngayThucHien?.split("T")[0],
          pd_TongGiaTri: giaiDoanPDDT?.tongGiaTri
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanPDDT.tongGiaTri)
            : "",
          pd_TongCPXD: giaiDoanPDDT?.chiPhiXayDung
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanPDDT.chiPhiXayDung)
            : "",
          pd_DonVi: giaiDoanPDDT?.maHieuDonVi,
          pd_link: giaiDoanPDDT?.linkFile,

          //IV. Thi công
          tc_ngayKhoiCong: giaiDoanTC?.ngayThucHien?.split("T")[0],
          tc_tongNgay: giaiDoanTC?.soNgayTcPgv,
          tc_ngayHoanThanh: giaiDoanTC?.ngayHoanThanh,
          tc_DonVi: giaiDoanTC?.maHieuDonVi,

          //V. Nghiệm thu
          nt_ngayNghiemThu: giaiDoanNT?.ngayThucHien?.split("T")[0],
          nt_soNgayTcThucTe: giaiDoanNT?.soNgayTcThucTe,
          nt_DonVi: giaiDoanNT?.maHieuDonVi,
          nt_link:giaiDoanNT?.linkFile,
          //VI. DT PS
          dtdc_ngay: giaiDoanDTPS?.ngayThucHien?.split("T")[0],
          dtdc_TongGiaTri: giaiDoanDTPS?.tongGiaTri
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanDTPS.tongGiaTri)
            : "",
          dtdc_TongCPXD: giaiDoanDTPS?.chiPhiXayDung
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanDTPS.chiPhiXayDung)
            : "",
          dtdc_DonVi: giaiDoanDTPS?.maHieuDonVi,
          dtdc_link: giaiDoanDTPS?.linkFile,
          //VII. Thẩm tra DT PS
          ttdc_ngay: giaiDoanTTrDTPS?.ngayThucHien?.split("T")[0],
          ttdc_TongGiaTri: giaiDoanTTrDTPS?.tongGiaTri
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanTTrDTPS.tongGiaTri)
            : "",
          ttdc_TongCPXD: giaiDoanTTrDTPS?.chiPhiXayDung
            ? new Intl.NumberFormat("vi-VN").format(
                giaiDoanTTrDTPS.chiPhiXayDung,
              )
            : "",
          ttdc_DonVi: giaiDoanTTrDTPS?.maHieuDonVi,
          ttdc_link: giaiDoanTTrDTPS?.linkFile,
          //VIII. QD phê duyệt DT PS
          pddc_ngay: giaiDoanPDDTDC?.ngayThucHien?.split("T")[0],
          pddc_TongGiaTri: giaiDoanPDDTDC?.tongGiaTri
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanPDDTDC.tongGiaTri)
            : "",
          pddc_TongCPXD: giaiDoanPDDTDC?.chiPhiXayDung
            ? new Intl.NumberFormat("vi-VN").format(
                giaiDoanPDDTDC.chiPhiXayDung,
              )
            : "",
          pddc_DonVi: giaiDoanPDDTDC?.maHieuDonVi,
          pddc_link: giaiDoanPDDTDC?.linkFile,

          // Nhóm Quyết toán
          qt_ngay: giaiDoanQT?.ngayThucHien?.split("T")[0],
          qt_TongGiaTri: giaiDoanQT?.tongGiaTri
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanQT.tongGiaTri)
            : "",
          qt_TongCPXD: giaiDoanQT?.chiPhiXayDung
            ? new Intl.NumberFormat("vi-VN").format(giaiDoanQT.chiPhiXayDung)
            : "",
          qt_DonVi: giaiDoanQT?.maHieuDonVi,
          qt_link: giaiDoanQT?.linkFile,
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchData();
  }, [navigate, reset, watch, projectId]); // Thêm navigate vào dependency

  return (
    <div>
      {/* ----------------- */}
      <div className="flex-1 mx-auto w-full">
        <div className="">
          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex bg-gray-50 min-h-screen">
              {/* Main Content */}
              <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-2xl font-extrabold text-primary mb-8 border-b-2 border-primary pb-2 inline-block">
                    Hồ sơ chi tiết Công trình:{" "}
                    <span className="text-indigo-700 uppercase">
                      {" "}
                      "{project?.tenCongTrinh || "Đang tải..."}"
                    </span>
                  </h1>
                  <div className="space-y-8">
                    {/* Phần 1: Thông tin chung - Gọn gàng hơn */}
                    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                      <GeneralInfo register={register}></GeneralInfo>
                    </section>
                    {isEditMode && (
                      <>
                        {/* Phần 2: Dự toán & thẩm tra */}
                        {project?.chiTietCongTrinhs.some(
                          (ct) => ct.maHieuGiaiDoan === "DT",
                        ) && (
                          <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <EstimationSection register={register} />
                          </section>
                        )}
                        {/* Phần 3: QD phê duyệt DT */}
                        {project?.chiTietCongTrinhs.some((ct) =>
                          ["TTR_DT", "PD_DT"].includes(ct.maHieuGiaiDoan),
                        ) && (
                          <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <DecisionSection register={register} />
                          </section>
                        )}
                        {/* Phần 4: Thi công & Nghiệm thu*/}
                        {project?.chiTietCongTrinhs.some((ct) =>
                          ["TC", "PD_DT"].includes(ct.maHieuGiaiDoan),
                        ) && (
                          <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <ConstructionSection register={register} />
                          </section>
                        )}
                        {/* Phần 5: DT_PS*/}
                        {project?.chiTietCongTrinhs.some((ct) =>
                          ["NT", "DT_PS"].includes(ct.maHieuGiaiDoan),
                        ) && (
                          <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <AdjustedEstimateSection register={register} />
                          </section>
                        )}
                        {/* Phần 6: QĐ Phê duyệt DT điều chỉnh*/}
                        {project?.chiTietCongTrinhs.some((ct) =>
                          ["TTR_DT_PS", "PD_DT_PS"].includes(ct.maHieuGiaiDoan),
                        ) && (
                          <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <BudgetAdjustmentDecision register={register} />
                          </section>
                        )}
                        {/* Phần 6: Quyết toán*/}
                        {project?.chiTietCongTrinhs.some(
                          (ct) => ["PD_DT_PS", "QT"].includes(ct.maHieuGiaiDoan),
                        ) && (
                          <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <SettlementProfile register={register} />
                          </section>
                        )}
                      </>
                    )}
                    {/* Nút lưu luôn cố định hoặc ở góc dễ thấy */}
                    <div className="flex justify-center gap-4 pb-12">
                      <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded font-bold hover:bg-gray-300 transition">
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-10 py-2 bg-indigo-600 text-white rounded font-bold hover:bg-indigo-700 shadow-lg transition"
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
