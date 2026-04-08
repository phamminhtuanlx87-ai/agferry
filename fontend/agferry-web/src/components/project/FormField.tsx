// Tên file: FormField.tsx
import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormField = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[11px] font-bold text-gray-500 tracking-tight">
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
        />
      </div>
    );
  },
);

