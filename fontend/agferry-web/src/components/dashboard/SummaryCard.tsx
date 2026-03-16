import type { ReactNode } from "react";

// import React from 'react'
type SummaryCardProps = {
  title: string;
  value: number;
  subtile?: string;
  change?: string; // +6%
  description?: string; // so với tháng trước
  color: string;
  colorchange?:string;
  icon?: ReactNode;
};
const SummaryCard = ({
  title,
  value,
  subtile,
  change,
  description,
  color,
  colorchange,
  icon,
}: SummaryCardProps) => {
  return (
    <div>
      <div
        className={`text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] 
            transition-all duration-300 flex flex-col justify-between min-h-45
            ${color}`}
      >
        {/* <!-- Top --> */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-80">{title}</p>
            <h2 className="text-3xl font-bold mt-1">{value}</h2>
            <p className="text-xs opacity-70 mt-1 ">{subtile}</p>
          </div>
          {icon}
        </div>

        {/* <!-- Progress --> */}
        <div className="mt-4">
          <div className="w-full bg-white/20 h-2 rounded-full">
            <div className="bg-white h-2 rounded-full w-3/4"></div>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div className="flex justify-between text-xs mt-3 opacity-80">
          <span className={colorchange}>{change}</span>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
