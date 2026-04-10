// Tên file: GeneralInfo.tsx

import type { ProjectFormData } from "./types";
import { FormField } from "./FormField";
import type { UseFormRegister } from "react-hook-form";
import { SelectField } from "./SelectField";
import { AttachField } from "./AttachFiled";

// ĐỊNH NGHĨA DANH SÁCH Ở ĐÂY CHO DỄ TÌM
const OPTIONS_DU_TOAN = [{ value: "PDT", label: "Phòng Đầu tư" }];

export const DecisionSection = ({
  register,
}: {
  register: UseFormRegister<ProjectFormData>;
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Tiêu đề khối */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between">
        <h3 className="font-bold text-blue-800 text-sm uppercase">
          III. Quyết định phê duyệt Dự toán
        </h3>
         <span className="text-[10px] text-gray-400 italic font-medium">
          Đơn vị: VNĐ
        </span>
      </div>

      <div className="p-5 space-y-8">
        {/* Nhánh Dự toán */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="hidden">
            <FormField
              label="ID Giai Doan"
              type="input"
              {...register("pd_ID")}
              disabled={true} // Vô hiệu hóa input
              style={{ display: 'none' }} // Ẩn hoàn toàn khỏi giao diện
            />
            </div>
            <FormField
              label="Ngày Quyết định Dự toán"
              type="date"
              {...register("pd_ngay")}
            />
            <FormField
              label="Tổng giá trị phê duyệt"
              type="text"
              placeholder="0"
              {...register("pd_TongGiaTri")}
            />
            <FormField
              label="Tổng chi phí Xây dựng"
              type="text"
              placeholder="0"
              {...register("pd_TongCPXD")}
            />
            <SelectField
              label="Đơn vị"
              options={OPTIONS_DU_TOAN} 
              {...register("pd_DonVi")}
            ></SelectField>
            <AttachField
              label="Link file đính kèm"
              placeholder="https://..."
              {...register("pd_link")}
            />
          </div>
        </div>

        {/* <div className="border-t border-dashed border-slate-200" /> */}
      </div>
    </div>
  );
};
