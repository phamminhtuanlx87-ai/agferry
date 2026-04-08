import React, { forwardRef } from "react";

// Định nghĩa các thuộc tính: nhãn (label), danh sách lựa chọn (options)
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[11px] font-bold text-gray-500 tracking-tight">
          {label}
        </label>
        <select
          ref={ref}
          {...props}
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
        >
          {/* Dòng mặc định khi chưa chọn */}
          <option value="">-- Chọn {label} --</option>
          
          {/* Duyệt qua danh sách để tạo các lựa chọn */}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);