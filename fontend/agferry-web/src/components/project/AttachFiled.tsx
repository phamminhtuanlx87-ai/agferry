import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AttachField = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[11px] font-bold text-gray-500 tracking-tight">
          {label}
        </label>
        <div className="flex">
          <input
            ref={ref}
            {...props}
            placeholder="Link file PDF/Scan..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
          <button className="bg-slate-100 border border-gray-300 rounded-r px-3 hover:bg-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 9.172a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102 1.101"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  },
);
