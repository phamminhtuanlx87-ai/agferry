import { useEffect, useState } from "react";
import { projectStatusMap } from "../../data/projectStatus";
import { useNavigate } from "react-router-dom";
import { getProjectList } from "@/services/projectService";

export interface Project {
  maCT: number;
  tenCongTrinh: string;
  donViChuQuan: string;
  donVi: string;
  ngayTao: Date;
  qdPheDuyetDT: string;
  qdPheDuyetDTDC: string;
  quyetToan?: number;
  maTrangThai?: string;
}

interface ProjectTableProps {
  // projects: Project[];
  rowsPerPage?: number;
}

export default function ProjectTable({ rowsPerPage = 5 }: ProjectTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]); // Thêm [] ở đây;
  // Load Projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await getProjectList(2026);
        if (res && res.data) {
          setProjects(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi load dự án:", error);
      }
    };
    loadProjects();
  }, []);

  const totalItems = projects?.length;
  const totalPages = Math.ceil(Number(totalItems) / rowsPerPage);

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const currentProjects = projects?.slice(start, end) || [];
  console.log("Dữ liệu dòng đầu tiên:", currentProjects[0]);
  const navigate = useNavigate();

  function renderStatus(statusId: string) {
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
          <thead className="bg-gray-100 text-gray-500 uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 hidden md:table-cell">Mã CT</th>
              <th className="px-6 py-4 min-w-55">Tên Công Trình</th>
              <th className="px-6 py-4 hidden md:table-cell">Đơn vị</th>
              <th className="px-6 py-4 hidden md:table-cell text-center">
                Ngày tạo
                <br />
                Công trình
              </th>
              <th className="px-6 py-4 text-center min-w-40">
                QĐ phê duyệt <br />
                Dự Toán
              </th>
              <th className="px-6 py-4 hidden md:table-cell text-center min-w-40">
                QĐ phê duyệt <br />
                Dự Toán (Điều chỉnh)
              </th>
              <th className="px-6 py-4 hidden md:table-cell text-right min-w-40">
                Quyết toán
              </th>
              <th className="px-6 py-4 text-center">Trạng Thái</th>
              <th className="px-6 py-4 text-right min-w-30">Hành động</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {currentProjects?.map((project) => (
              <tr
                key={`${project.maCT}`}
                className="hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 hidden md:table-cell font-medium">
                  {project.maCT?.toString().padStart(3, "0")}
                </td>

                <td className="px-6 py-4  text-gray-800 font-bold">
                  {project.tenCongTrinh}
                </td>

                <td className="px-6 py-4 hidden md:table-cell">
                  {project.donVi}
                </td>

                <td className="px-6 py-4 hidden md:table-cell text-center">
                  {project.ngayTao
                    ? new Date(project.ngayTao).toLocaleDateString("vi-VN")
                    : "---"}
                </td>

                <td className="px-6 py-4 text-right tabular-nums">
                  {/* Dùng Number() để ép kiểu về số trước khi format, mặc định là 0 nếu null */}
                  {Number(project.qdPheDuyetDT || 0).toLocaleString("vi-VN")}
                  <span className="text-gray-400 text-xs"> ₫</span>
                </td>

                <td className="px-6 py-4 hidden md:table-cell text-right tabular-nums">
                  {Number(project.qdPheDuyetDTDC || 0).toLocaleString("vi-VN")}
                  <span className="text-gray-400 text-xs"> ₫</span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell text-right tabular-nums font-semibold">
                  {Number(project.qdPheDuyetDT || 0).toLocaleString("vi-VN")}
                  <span className="text-gray-400 text-xs"> ₫</span>
                </td>
                <td className="px-6 py-4 text-center">
                  {renderStatus(project.maTrangThai || "")}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition"
                      onClick={() => navigate(`/projects/updateproject/${project.maCT}`)}
                    >
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
          Hiển thị {start + 1} - {Math.min(end, Number(totalItems))} của{" "}
          {totalItems} công trình
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
