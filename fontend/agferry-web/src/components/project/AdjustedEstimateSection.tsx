// Tên file: EstimationSection.tsx

import type { ProjectFormData } from "./types";
import { FormField } from "./FormField";
import type { UseFormRegister } from "react-hook-form";
import { SelectField } from "./SelectField";
import { AttachField } from "./AttachFiled";

// ĐỊNH NGHĨA DANH SÁCH Ở ĐÂY CHO DỄ TÌM
const OPTIONS_DU_TOAN = [
  { value: "KTC", label: "Cty CP Tư vấn Xây dựng giao thông KTC" },
  { value: "SR", label: "Cty TNHH Thiết kế Soài Rạp" },
];

const OPTIONS_THAM_TRA = [
  { value: "TNB", label: "Cty TNHH Tư vấn Xây dựng Tây Nam Bộ" },
  { value: "TP", label: "Cty TNHH TV Thiết kế Xây dựng Trường Phú" },
];

export const AdjustedEstimateSection = ({
  register,
}: {
  register: UseFormRegister<ProjectFormData>;
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Tiêu đề khối */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between">
        <h3 className="font-bold text-sm uppercase text-blue-800">
          V. Dự toánThẩm tra (Điều chỉnh)
        </h3>
        <span className="text-[10px] text-gray-400 italic font-medium">
          Đơn vị: VNĐ
        </span>
      </div>

      <div className="p-5 space-y-8">
        {/* Nhánh Dự toán */}
        <div>
          <div className="flex items-center mb-4 text-amber-900">
            <span className="bg-amber-900 w-1 h-4 mr-2 rounded-full"></span>
            <span className="text-sm font-bold uppercase">Dự toán (Điều chỉnh)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="hidden">
            <FormField
              label="ID Giai Doan"
              type="input"
              {...register("dtdc_ID")}
              disabled={true} // Vô hiệu hóa input
              style={{ display: 'none' }} // Ẩn hoàn toàn khỏi giao diện
            />
            </div>
            <FormField
              label="Ngày lập dự toán"
              type="date"
              {...register("dtdc_ngay")}
            />
            <FormField
              label="Tổng giá trị dự toán"
              type="text"
              placeholder="0"
              {...register("dtdc_TongGiaTri")}
            />
            <FormField
              label="Tổng chi phí xây dựng"
              type="text"
              placeholder="0"
              {...register("dtdc_TongCPXD")}
            />
            <SelectField label="Đơn vị" options={OPTIONS_DU_TOAN}
             {...register("dtdc_DonVi")}
            ></SelectField>
            <AttachField
              label="Link file đính kèm"
              placeholder="https://..."
              {...register("dtdc_link")}
            />
          </div>
        </div>

        <div className="border-t border-dashed border-slate-300" />

        {/* Nhánh Thẩm tra */}
        <div>
          <div className="flex items-center mb-4 text-blue-900">
            <span className="bg-blue-900 w-1 h-4 mr-2 rounded-full"></span>
            <span className="text-sm font-bold uppercase">
              Thẩm tra dự toán (Điều chỉnh)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="hidden">
            <FormField
              label="ID Giai Doan"
              type="input"
              {...register("ttdc_ID")}
              disabled={true} // Vô hiệu hóa input
              style={{ display: 'none' }} // Ẩn hoàn toàn khỏi giao diện
            />
            </div>
            <FormField
              label="Ngày thẩm tra"
              type="date"
              {...register("ttdc_ngay")}
            />
            <FormField
              label="Tổng giá trị sau thẩm tra"
              type="text"
              placeholder="0"
              {...register("ttdc_TongGiaTri")}
            />
            <FormField
              label="Tổng giá trị sau thẩm tra"
              type="text"
              placeholder="0"
              {...register("ttdc_TongCPXD")}
            />
            <SelectField
              label="Đơn vị"
              options={OPTIONS_THAM_TRA}
               {...register("ttdc_DonVi")}
            ></SelectField>
              <AttachField
              label="Link file đính kèm"
              placeholder="https://..."
              {...register("ttdc_link")}
            />
          </div>
        </div>

        {/* <div className="border-t border-dashed border-slate-300" /> */}
      </div>
    </div>
  );
};
