// Tên file: GeneralInfo.tsx

import type { ProjectFormData } from "./types";
import { FormField } from "./FormField";
import type { UseFormRegister } from "react-hook-form";
import { SelectField } from "./SelectField";

// ĐỊNH NGHĨA DANH SÁCH Ở ĐÂY CHO DỄ TÌM
const OPTIONS_DU_TOAN = [{ value: "PKT", label: "Phòng Kỹ thuật - Vật tư" }];

export const GeneralInfo = ({register,}: {register: UseFormRegister<ProjectFormData>;}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Tiêu đề khối */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between">
        <h3 className="font-bold text-blue-800 text-sm uppercase">
          I. Thông tin chung
        </h3>
        <span className="text-[10px] text-gray-400 italic font-medium"></span>
      </div>

      <div className="p-5 space-y-8">
        {/* Nhánh Dự toán */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="hidden">
            <FormField
              label="Mã Công trình"
              type="input"
              {...register("maCongTrinh")}
              disabled={true} // Vô hiệu hóa input
              style={{ display: 'none' }} // Ẩn hoàn toàn khỏi giao diện
            />
            </div>
            <FormField
              label="ĐƠN VỊ CHỦ QUẢN"
              type="input"
              // defaultValue="Cty Cổ phần Phà An Giang"
              {...register("donViChuQuan")}
            />
            <FormField
              label="TÊN CÔNG TRÌNH"
              type="input"
              {...register("tenCongTrinh")}
            />
            <FormField
              label="Ngày tạo"
              type="date"
              {...register("ngayTao")}
            />
            <SelectField
              label="Đơn vị"
              options={OPTIONS_DU_TOAN}
              defaultValue="PKT"
              {...register("donVi")}
            ></SelectField>
            <div className="hidden">
             <FormField
              label="Trạng thái"
              type="input"
              defaultValue="DT"
              {...register("trangThai")}
            /></div>
          </div>
        </div>

        {/* <div className="border-t border-dashed border-slate-200" /> */}
      </div>
    </div>
  );
};
