// Tên file: GeneralInfo.tsx

import type { ProjectFormData } from "./types";
import { FormField } from "./FormField";
import type { UseFormRegister } from "react-hook-form";
import { SelectField } from "./SelectField";

// ĐỊNH NGHĨA DANH SÁCH Ở ĐÂY CHO DỄ TÌM
const OPTIONS_DU_TOAN = [{ value: "XNCK", label: "XN Cơ khí Giao thông" }];
const OPTIONS_NGHIEM_THU = [{ value: "PKT", label: "Phòng Kỹ thuật - Vật tư" }];
export const ConstructionSection = ({
  register,
}: {
  register: UseFormRegister<ProjectFormData>;
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Tiêu đề khối */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between">
        <h3 className="font-bold text-blue-800 text-sm uppercase">
          IV. Thi công & Nghiệm thu
        </h3>
        <span className="text-[10px] text-gray-400 italic font-medium"></span>
      </div>

      <div className="p-5 space-y-8">
        {/* Tc */}
        <div className="flex items-center mb-4 text-blue-600">
            <span className="bg-blue-500 w-1 h-4 mr-2 rounded-full"></span>
            <span className="text-sm font-bold uppercase">
              Thi công
            </span>
          </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Ngày khởi công"
              type="date"
              {...register("tc_ngayKhoiCong")}
            />
            <FormField
              label="Số ngày thi công (theo PGV)"
              type="Number"
              {...register("tc_tongNgay")}
            />
            <FormField
              label="Ngày Hoàn thành"
              type="date"
              {...register("tc_ngayKhoiCong")}
            />

            <SelectField label="Đơn vị" options={OPTIONS_DU_TOAN}></SelectField>
          </div>
        </div>

        <div className="border-t border-dashed border-slate-200" />

        {/* Nhánh Nghiệm thu */}
        <div>
          <div className="flex items-center mb-4 text-blue-600">
            <span className="bg-blue-500 w-1 h-4 mr-2 rounded-full"></span>
            <span className="text-sm font-bold uppercase">
              Hồ sơ nghiệm thu
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Ngày nghiệm thu"
              type="date"
              {...register("nt_ngayNghiemThu")}
            />
            <FormField
              label="Link file đính kèm"
              placeholder="https://..."
              {...register("nt_link")}
            />
            <SelectField label="Đơn vị" options={OPTIONS_NGHIEM_THU}></SelectField>
          </div>
        </div>

        <div className="border-t border-dashed border-slate-200" />
      </div>
    </div>
  );
};
