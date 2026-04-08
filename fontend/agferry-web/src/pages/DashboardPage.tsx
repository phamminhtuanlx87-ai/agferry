import "remixicon/fonts/remixicon.css";
import ProjectStatusChart from "@/components/project/ProjectStatusChart";
import ProjectTable from "@/components/project/ProjectTable";
import SummaryCard from "@/components/dashboard/SummaryCard";
import SumIcon from "@/components/dashboard/SumIcon";
import Todo from "@/components/dashboard/Todo";
import { Link } from "react-router-dom";
import FilterProject from "@/components/project/FilterProject";
const DashboardPage = () => {



  return (
    <>
      {/* <!-- Content --> */}
      <section className="flex-1 p-6 overflow-y-auto md:ml-10">
        <h1 className="text-xl md:text-3xl lg:text-4xl mb-4 tracking-wide uppercase font-semibold text-gray-800">
          TỔNG QUAN <span className="">NĂM 2026</span>
        </h1>
        <h2 className="text-sm md:text-2xl lg:text-3xl mb-4 tracking-wide uppercase font-semibold text-gray-700">
          Tháng <span className="">01</span>
        </h2>
        {/* <!-- cards --> */}
        <div className="content-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* <!-- Card summary --> */}
          <SummaryCard
            color="bg-indigo-800"
            title="Tổng công trình"
            value={48}
            subtile=""
            icon={<SumIcon variant="projects"></SumIcon>}
            colorchange="text-green-300"
            change="+2 Công trình "
            description="Cập nhật 15 phút trước"
          ></SummaryCard>

          {/* <!-- card progress --> */}
          <SummaryCard
            color="bg-slate-700"
            title="Đang thi công"
            value={12}
            subtile="25% tổng số dự án"
            icon={<SumIcon variant="progress"></SumIcon>}
            colorchange="text-yellow-300"
            change="+2 công trình"
            description="Cập nhật 15 phút trước"
          ></SummaryCard>

          {/* <!-- Card settlement --> */}
          <SummaryCard
            color="bg-orange-500"
            title="Đang quyết toán"
            value={12}
            subtile="25% tổng số dự án"
            icon={<SumIcon variant="done"></SumIcon>}
            colorchange="text-white"
            change="+1 công trình"
            description="Cập nhật 15 phút trước"
          ></SummaryCard>

          {/* <!-- card completed --> */}
          <SummaryCard
            color="bg-emerald-600"
            title="Hoàn thành"
            value={24}
            subtile="50% tổng số dự án"
            icon={<SumIcon variant="warning"></SumIcon>}
            colorchange="text-white"
            change="+2 công trình"
            description="Cập nhật 15 phút trước"
          ></SummaryCard>
        </div>
        {/* <!-- table project --> */}
        <div className="content-2 table-list mt-5 bg-white border border-gray-50 border-shadow flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h1 className="text-sm md:text-2xl font-semibold">
              Danh sách công trình
            </h1>
            <Link
              to="/projects/addproject"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition text-sm font-semibold"
            >
              + Thêm công trình
            </Link>
          </div>
          <FilterProject></FilterProject>
          <ProjectTable></ProjectTable>
        </div>
        {/* <!-- content 3 --> */}
        <div className="content-3 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* -- Start chart ----- */}
          <div className="char_card bg-white border border-gray-50 border-shadow min-w-75">
            {/* <!-- Render card --> */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Tỷ lệ trạng thái
              </h3>

              <select
                defaultValue="30"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-25"
              >
                <option value="7">7 ngày</option>
                <option value="30">30 ngày</option>
                <option value="90">3 tháng</option>
                <option value="365">1 năm</option>
              </select>
            </div>
            <hr className="text-gray-300 shadow-2xl" />
            <div id="projectStatusChart"></div>
            <ProjectStatusChart></ProjectStatusChart>
          </div>
          {/* -- End Chart -- */}
          <Todo></Todo>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
