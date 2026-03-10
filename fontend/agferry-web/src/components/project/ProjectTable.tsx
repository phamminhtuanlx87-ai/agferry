import { useState } from "react";
import { projectStatusMap } from "../../data/projectStatus";

const rowsPerPage = 5;

interface Project {
  id: number;
  name: string;
  depart: string;
  dateCreate: Date;
  dateStart: Date;
  totalEstimate:number;
  constructionCosts: number;
  status: number;
}

interface ProjectTableProps {
  projects: Project[];
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = projects.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const currentProjects = projects.slice(start, end);

  function renderStatus(statusId: number) {
    const status = projectStatusMap[statusId];

    if (!status) return null;

    return (
      <span
        className={`inline-flex items-center justify-center min-w-28 px-3 py-1 text-xs font-medium rounded-full ${status.color}`}
        title={status.full}
      >
        {status.short}
      </span>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  {/* TABLE */}
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">
      
      {/* HEADER */}
      <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-semibold">
        <tr>
          <th className="px-6 py-4 hidden md:table-cell">Mã CT</th>
          <th className="px-6 py-4 min-w-55">Tên Công Trình</th>
          <th className="px-6 py-4 hidden md:table-cell">Đơn vị</th>
          <th className="px-6 py-4 hidden md:table-cell text-center">Ngày K.Tạo</th>
          <th className="px-6 py-4 hidden md:table-cell text-center">Ngày B.Đầu</th>
          <th className="px-6 py-4 text-right min-w-40">Tổng dự toán</th>
          <th className="px-6 py-4 hidden md:table-cell text-right min-w-40">Chi phí Xây dựng</th>
          <th className="px-6 py-4 text-center">Trạng Thái</th>
          <th className="px-6 py-4 text-right min-w-30">Hành động</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody className="divide-y divide-gray-100 text-gray-700">
        {currentProjects.map((project) => (
          <tr
            key={project.id}
            className="hover:bg-gray-50 transition-colors"
          >
            <td className="px-6 py-4 hidden md:table-cell font-medium">
              {project.id.toString().padStart(3, "0")}
            </td>

            <td className="px-6 py-4 font-medium text-gray-800">
              {project.name}
            </td>

            <td className="px-6 py-4 hidden md:table-cell">
              {project.depart}
            </td>

            <td className="px-6 py-4 hidden md:table-cell text-center">
              {project.dateCreate.toLocaleDateString()}
            </td>

            <td className="px-6 py-4 hidden md:table-cell text-center">
              {project.dateStart.toLocaleDateString()}
            </td>

            <td className="px-6 py-4 text-right font-semibold tabular-nums">
             {project.totalEstimate.toLocaleString("vi-VN")} <span className="text-gray-400 text-xs">₫</span>
            </td>

            <td className="px-6 py-4 hidden md:table-cell text-right font-semibold tabular-nums">
              {project.constructionCosts.toLocaleString("vi-VN")}<span className="text-gray-400 text-xs"> ₫</span>
            </td>

            <td className="px-6 py-4 text-center">
              {renderStatus(project.status)}
            </td>

            <td className="px-6 py-4">
              <div className="flex items-center justify-end gap-2">
                <button className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition">
                  <i className="ri-eye-line text-lg"></i>
                </button>

                <button className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition">
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* INFO + PAGINATION */}
  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
    
    <p className="text-sm text-gray-500">
      Hiển thị {start + 1} - {Math.min(end, totalItems)} của {totalItems} công trình
    </p>

    <div className="flex gap-2">
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 border rounded ${
            currentPage === i + 1
              ? "bg-indigo-600 text-white border-indigo-600"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        ›
      </button>
    </div>

  </div>
</div>
  );
}