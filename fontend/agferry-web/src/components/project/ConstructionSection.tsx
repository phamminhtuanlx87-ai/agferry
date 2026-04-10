// Tên file: GeneralInfo.tsx

import type { ProjectFormData } from "./types";
import { FormField } from "./FormField";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { SelectField } from "./SelectField";
import { AttachField } from "./AttachFiled";
import { useEffect } from "react";

// ĐỊNH NGHĨA DANH SÁCH Ở ĐÂY CHO DỄ TÌM
const OPTIONS_DU_TOAN = [{ value: "XNCK", label: "XN Cơ khí Giao thông" }];
const OPTIONS_NGHIEM_THU = [
  { value: "PKT", label: "Phòng Kỹ thuật - Vật tư" },
  {
    value: "HHTN",
    label: "Cty TNHH Xây Dựng Thương Mại Công Nghiệp Hàng Hải Tây Nam",
  },
  { value: "TL", label: "Cty TNHH Thiết kế Công nghiệp Thắng Lợi" },
];
export const ConstructionSection = ({
  register,
  watch, // Thêm cái này
  setValue,
}: {
  register: UseFormRegister<ProjectFormData>;
  watch: UseFormWatch<ProjectFormData>;
  setValue: UseFormSetValue<ProjectFormData>;
}) => {
  // Hàm helper tính toán
  function calculateDays(startStr: string, endStr: string) {
    const start = new Date(startStr);
    const end = new Date(endStr);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }
  // --- LOGIC TÍNH TOÁN TỰ ĐỘNG ---

  // 1. Theo dõi các trường ngày của Thi công
  const tc_start = watch("tc_ngay");
  const tc_end = watch("tc_ngayHoanThanh");

  // 2. Theo dõi các trường ngày của Nghiệm thu
  const nt_date = watch("nt_ngay");
  useEffect(() => {
    // Tính số ngày thi công PGV: (Ngày hoàn thành - Ngày khởi công) + 1
    if (tc_start && tc_end) {
      const diff = calculateDays(tc_start, tc_end);
      setValue("tc_tongNgay", diff.toString());
    }
  }, [tc_start, tc_end, setValue]);

  useEffect(() => {
    // Tính số ngày thực tế: (Ngày nghiệm thu - Ngày khởi công) + 1
    if (tc_start && nt_date) {
      const diff = calculateDays(tc_start, nt_date);
      setValue("nt_soNgayTcThucTe", diff.toString()); // Field này type number nên không cần toString
    }
  }, [tc_start, nt_date, setValue]);

  

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Tiêu đề khối */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between">
        <h3 className="font-bold text-sm uppercase text-blue-800">
          IV. Thi công & Nghiệm thu
        </h3>
        <span className="text-[10px] text-gray-400 italic font-medium"></span>
      </div>

      <div className="p-5 space-y-8">
        {/* Tc */}
        <div className="flex items-center mb-4">
          <span className="bg-indigo-900 w-1 h-4 mr-2 rounded-full"></span>
          <span className="text-sm font-bold uppercase text-indigo-900">
            Thi công
          </span>
        </div>
        
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hidden">
              <FormField
                label="ID Giai Doan"
                type="input"
                {...register("tc_ID")}
                disabled={true} // Vô hiệu hóa input
                style={{ display: "none" }} // Ẩn hoàn toàn khỏi giao diện
              />
            </div>
            <FormField
              label="Ngày khởi công"
              type="date"
              {...register("tc_ngay")}
            />
            <FormField
              label="Số ngày thi công (theo PGV)"
              type="Number"
              readOnly
              {...register("tc_tongNgay")}
            />
            <FormField
              label="Ngày Hoàn thành (theo PGV)"
              type="date"
              {...register("tc_ngayHoanThanh")}
            />
            <SelectField
              label="Đơn vị"
              options={OPTIONS_DU_TOAN}
              {...register("tc_DonVi")}
            ></SelectField>
          </div>
        </div>

        <div className="border-t border-dashed border-slate-200" />

        {/* Nhánh Nghiệm thu */}
        <div>
          <div className="flex items-center mb-4">
            <span className="bg-emerald-900 w-1 h-4 mr-2 rounded-full"></span>
            <span className="text-sm font-bold uppercase text-emerald-900">
              Hồ sơ nghiệm thu
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hidden">
              <FormField
                label="ID Giai Doan"
                type="input"
                {...register("nt_ID")}
                disabled={true} // Vô hiệu hóa input
                style={{ display: "none" }} // Ẩn hoàn toàn khỏi giao diện
              />
            </div>
            <FormField
              label="Ngày nghiệm thu"
              type="date"
              {...register("nt_ngay")}
            />
            <FormField
              label="Số ngày thi công thực tế"
              type="number"
              {...register("nt_soNgayTcThucTe")}
            />

            <SelectField
              label="Đơn vị"
              options={OPTIONS_NGHIEM_THU}
              {...register("nt_DonVi")}
            ></SelectField>
            <AttachField
              label="Link file đính kèm"
              placeholder="https://..."
              {...register("nt_link")}
            />
          </div>
        </div>

        <div className="border-t border-dashed border-slate-200" />
      </div>
    </div>
  );
};
