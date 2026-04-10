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
import {
  addStage,
  getProject,
  type StagePayload,
} from "@/services/projectService";
import Swal from "sweetalert2";
interface ChiTiet {
  id: string;
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
  maCongTrinh: string;
  tenCongTrinh: string;
  donViChuQuan: string;
  tenGiaiDoan: string;
  maHieuGiaiDoan: string;
  ngayTao: string;
  chiTietCongTrinhs: ChiTiet[]; // Khai báo mảng chứa các ChiTiet
}

const UpdateProject = () => {
  // Khai báo công cụ quản lý form
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<ProjectFormData>();
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const isEditMode = !!projectId;

  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái loading
  // Khi bấm nút "Lưu thay đổi", hàm này sẽ chạy
  const onSubmit = async (data: ProjectFormData) => {
    // 1. Hiển thị loading và khóa nút submit
    setIsSubmitting(true);
    // Danh sách các cấu hình giai đoạn để map dữ liệu
    if (isSubmitting)
      try {
        const stages = [
          { prefix: "dt", maHieu: "DT" }, // Dự toán
          { prefix: "tt", maHieu: "TTR_DT" }, // Thẩm tra DT
          { prefix: "pd", maHieu: "PD_DT" }, // Phê duyệt DT
          { prefix: "tc", maHieu: "TC" }, // Thi cong
          { prefix: "nt", maHieu: "NT" }, // Nghiem thu
          { prefix: "dtdc", maHieu: "DT_PS" }, //DT PS
          { prefix: "ttdc", maHieu: "TTR_DT_PS" }, // Tham tra DT PS
          { prefix: "pddc", maHieu: "PD_DT_PS" }, // Phe duyet DTPS
          { prefix: "qt", maHieu: "QT" }, // Quyet toan
        ];

        for (const stage of stages) {
          if (!stage || !stage.prefix) continue;
          // Kiểm tra nếu có dữ liệu của giai đoạn đó thì mới gửi (ví dụ check ngày hoặc đơn vị)
          if (data[`${stage.prefix}_DonVi` as keyof ProjectFormData]) {
            const payload: StagePayload = {
              congTrinhId: parseInt(data.maCongTrinh),
              maHieuGiaiDoan: stage.maHieu,
              maHieuDonVi:
                data[`${stage.prefix}_DonVi` as keyof ProjectFormData],
              ngayThucHien:
                data[`${stage.prefix}_ngay` as keyof ProjectFormData],

              ngayHoanThanh:
                data[`${stage.prefix}_ngayHoanThanh` as keyof ProjectFormData],
              soNgayTcPgv:
                data[`${stage.prefix}_tongNgay` as keyof ProjectFormData],
              soNgayTcThucTe:
                data[`${stage.prefix}_soNgayTcThucTe` as keyof ProjectFormData],

              // Sử dụng replace để xóa dấu chấm
              tongGiaTri: Number(
                (
                  data[`${stage.prefix}_TongGiaTri` as keyof ProjectFormData] ||
                  "0"
                )
                  .toString()
                  .replace(/\./g, ""), // Tìm tất cả dấu chấm và thay bằng chuỗi rỗng
              ),

              chiPhiXayDung: Number(
                (
                  data[`${stage.prefix}_TongCPXD` as keyof ProjectFormData] ||
                  "0"
                )
                  .toString()
                  .replace(/\./g, ""),
              ),
              linkFile: data[`${stage.prefix}_link` as keyof ProjectFormData],
              // Với nhóm thi công/nghiệm thu bạn map các trường đặc thù tương ứng
            };

            try {
              await addStage(payload);
            } catch (err) {
              console.error(`Lỗi khi lưu giai đoạn ${stage.maHieu}:`, err);
              Swal.fire(
                "Lỗi!",
                "Không thể cập nhật dữ liệu. Vui lòng kiểm tra lại.",
                "error",
              );
            }
          }
        }
        // 2. Thông báo thành công khi tất cả giai đoạn hoàn tất
        await Swal.fire({
          title: "Thành công!",
          text: "Dữ liệu công trình đã được cập nhật.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000, // Tự động đóng sau 2s
          timerProgressBar: true,
        });
        window.location.reload();
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        Swal.fire(
          "Lỗi!",
          "Không thể cập nhật dữ liệu. Vui lòng kiểm tra lại.",
          "error",
        );
      } finally {
        // 4. Tắt loading
        setIsSubmitting(false);
      }
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
          maCongTrinh: data.maCongTrinh,
          donViChuQuan: data.donViChuQuan,
          tenCongTrinh: data.tenCongTrinh,
          ngayTao: data.ngayTao?.split("T")[0],

          // II. Dự toán (Map từ giai đoạn "DT") && Thẩm tra DT
          // Dự toán
          dt_ID: giaiDoanDT?.id,
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
          tt_ID: giaiDoanTTr?.id,
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
          pd_ID: giaiDoanPDDT?.id,
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
          tc_ID: giaiDoanTC?.id,
          tc_ngay: giaiDoanTC?.ngayThucHien?.split("T")[0],
          tc_tongNgay: giaiDoanTC?.soNgayTcPgv,
          tc_ngayHoanThanh: giaiDoanTC?.ngayHoanThanh,
          tc_DonVi: giaiDoanTC?.maHieuDonVi,

          //V. Nghiệm thu
          nt_ID: giaiDoanNT?.id,
          nt_ngay: giaiDoanNT?.ngayThucHien?.split("T")[0],
          nt_soNgayTcThucTe: giaiDoanNT?.soNgayTcThucTe,
          nt_DonVi: giaiDoanNT?.maHieuDonVi,
          nt_link: giaiDoanNT?.linkFile,
          //VI. DT PS
          dtdc_ID: giaiDoanDTPS?.id,
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
          ttdc_ID: giaiDoanTTrDTPS?.id,
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
          pddc_ID: giaiDoanPDDTDC?.id,
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
          qt_ID: giaiDoanQT?.id,
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
                        {(project?.chiTietCongTrinhs?.length === 0 ||
                          project?.chiTietCongTrinhs.some(
                            (ct) => ct.maHieuGiaiDoan === "DT",
                          )) && (
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
                            <ConstructionSection
                              register={register}
                              watch={watch}
                              setValue={setValue}
                            />
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
                        {project?.chiTietCongTrinhs.some((ct) =>
                          ["PD_DT_PS", "QT"].includes(ct.maHieuGiaiDoan),
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
