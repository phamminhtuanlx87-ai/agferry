// Tên file: EstimationSection.tsx

import type { ProjectFormData } from "./types";
import { FormField } from "./FormField";
import type { UseFormRegister } from "react-hook-form";
import { SelectField } from "./SelectField";


// ĐỊNH NGHĨA DANH SÁCH Ở ĐÂY CHO DỄ TÌM
const OPTIONS_DU_TOAN = [
  { value: "KTC", label: "Cty CP Tư vấn Xây dựng giao thông KTC" },
  { value: "SR", label: "Cty TNHH Thiết kế Soài Rạp" }
];

const OPTIONS_THAM_TRA = [
  { value: "TNB", label: "Cty TNHH Tư vấn Xây dựng Tây Nam Bộ" },
  { value: "TP", label: "Cty TNHH TV Thiết kế Xây dựng Trường Phú" }
];

export const EstimationSection = ({ register }: { register: UseFormRegister<ProjectFormData> }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Tiêu đề khối */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between">
        <h3 className="font-bold text-blue-800 text-sm uppercase">II. Dự toán & Thẩm tra</h3>
        <span className="text-[10px] text-gray-400 italic font-medium">Đơn vị: VNĐ</span>
      </div>

      <div className="p-5 space-y-8">
        {/* Nhánh Dự toán */}
        <div>
          <div className="flex items-center mb-4 text-orange-600">
            <span className="bg-orange-500 w-1 h-4 mr-2 rounded-full"></span>
            <span className="text-sm font-bold uppercase">Dự toán</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField label="Ngày lập dự toán" type="date" {...register("dt_ngay")} />
            <FormField label="Tổng giá trị dự toán" type="number" placeholder="0" {...register("dt_TongGiaTri")} />
            <FormField label="Tổng chi phí xây dựng" type="number" placeholder="0" {...register("dt_TongCPXD")} />
            <SelectField label="Đơn vị" options={OPTIONS_DU_TOAN}></SelectField>              
            <FormField label="Link file đính kèm" placeholder="https://..." {...register("dt_link")} />
          </div>
        </div>

        <div className="border-t border-dashed border-slate-300" />

        {/* Nhánh Thẩm tra */}
        <div>
          <div className="flex items-center mb-4 text-blue-600">
            <span className="bg-blue-500 w-1 h-4 mr-2 rounded-full"></span>
            <span className="text-sm font-bold uppercase">Thẩm tra dự toán</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField label="Ngày thẩm tra" type="date" {...register("tt_ngay")} />
            <FormField label="Tổng giá trị sau thẩm tra" type="number" placeholder="0" {...register("tt_TongGiaTri")} />
            <FormField label="Tổng giá trị sau thẩm tra" type="number" placeholder="0" {...register("tt_TongCPXD")} />
             <SelectField label="Đơn vị" options={OPTIONS_THAM_TRA}></SelectField>    
            <FormField label="Link file đính kèm" placeholder="https://..." {...register("tt_link")} />
          </div>
        </div>

        <div className="border-t border-dashed border-slate-300" />
      </div>
    </div>
  );
};