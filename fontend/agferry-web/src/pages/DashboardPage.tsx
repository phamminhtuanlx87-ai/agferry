import "remixicon/fonts/remixicon.css";
// import bannerLeft from "@/assets/images/banerleft.png";
// import avata from "@/assets/icons/avata.svg";
import Footer from "@/components/layout/Footer";
import ProjectStatusChart from "@/components/project/ProjectStatusChart";
import ProjectTable from "@/components/project/ProjectTable";
import { projects } from "@/data/projects.ts";
import Header from "@/components/layout/Header";
import Siderbar from "@/components/layout/Siderbar";
import { useEffect, useState } from "react";
import Overlay from "@/components/layout/Overlay";
import SummaryCard from "@/components/dashboard/SummaryCard";
import SumIcon from "@/components/dashboard/SumIcon"
// import Chart from "react-apexcharts";
const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add("overflow-hidden");
  };
  const toggleSidebar = (open: boolean) => {
    setIsOpen(open);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("overflow-hidden");
  };
  // khóa scroll body khi mở sidebar
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-neutral-bg text-neutral-text-main font-[Poppins]">
        {/* HEADER */}
        <Header
          variant="dashboard"
          openMenu={openMenu}
          toggleSidebar={toggleSidebar}
        />

        {/* PAGE CONTENT */}

        {/* <!-- ================= MAIN ================= --> */}
        <section className="flex flex-1 overflow-hidden">
          <Siderbar isOpen={isOpen} toggleSidebar={toggleSidebar}></Siderbar>
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
              <SummaryCard color="bg-indigo-800" title="Tổng công trình" value={48} subtile="" icon={<SumIcon variant="projects"></SumIcon>}
              colorchange="text-green-300" change="+2 Công trình " description="Cập nhật 15 phút trước"
              ></SummaryCard>
             
              {/* <!-- card progress --> */}
              <SummaryCard color="bg-slate-700" title="Đang thi công" value={12} subtile="25% tổng số dự án" icon={<SumIcon variant="progress"></SumIcon>}
              colorchange="text-yellow-300" change="+2 công trình" description="Cập nhật 15 phút trước"
              ></SummaryCard>
              
              {/* <!-- Card settlement --> */}
              <SummaryCard color="bg-orange-500" title="Đang quyết toán" value={12} subtile="25% tổng số dự án" icon={<SumIcon variant="done"></SumIcon>}
              colorchange="text-white" change="+1 công trình" description="Cập nhật 15 phút trước"
              ></SummaryCard>
              
              {/* <!-- card completed --> */}
              <SummaryCard color="bg-emerald-600" title="Hoàn thành" value={24} subtile="50% tổng số dự án" icon={<SumIcon variant="warning"></SumIcon>}
              colorchange="text-white" change="+2 công trình" description="Cập nhật 15 phút trước"
              ></SummaryCard>
            </div>
            {/* <!-- table project --> */}
            <div className="content-2 table-list mt-5 bg-white border border-gray-50 border-shadow flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h1 className="text-sm md:text-2xl font-semibold">
                  Danh sách công trình
                </h1>

                <button className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition text-sm">
                  + Thêm công trình
                </button>
              </div>
              {/* <!-- fileter --> */}
              <div className="filter flex items-center justify-start gap-5">
                <div className="relative w-80">
                  {/* <!-- Icon --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                    />
                  </svg>

                  {/* <!-- Input --> */}
                  <input
                    type="text"
                    placeholder="Tìm kiếm công trình..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="status_filter hidden md:block">
                  <div className="relative inline-block text-left">
                    {/* <!-- Button --> */}
                    <button
                      // onclick="status_filter_toggleDropdown()"
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      Trạng thái Công trình
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* <!-- Menu --> */}
                    <div
                      id="status_filter_dropdownMenu"
                      className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Tất cả
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Dự toán
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Thẩm tra DT
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Phê duyệt DT & KH lựa chọn nhà thầu
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Thi công
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Thẩm tra DTPS
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Hoàn thành
                      </a>
                    </div>
                  </div>
                </div>
                <div className="department_filter hidden md:block">
                  <div className="relative inline-block text-left">
                    {/* <!-- Button --> */}
                    <button
                      // onclick="department_filter_toggleDropdown()"
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      Đơn vị
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* <!-- Menu --> */}
                    <div
                      id="department_filter_dropdownMenu"
                      className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Tất cả
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        P.Kỹ thuật - Vật tư
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        P.Đầu tư
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        XN Cơ Khí Giao Thông
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        KTC (Đv lập DT)
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Tây Nam Bộ (Đv thẩm tra)
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Trường Phú (Đv thẩm tra)
                      </a>
                    </div>
                  </div>
                </div>
                <div className="search_filter gap-3 hidden md:flex">
                  <button
                    type="button"
                    id="btnFilter"
                    className="h-10 w-30 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-200"
                  >
                    Lọc Kết quả
                  </button>

                  <button
                    type="button"
                    id="btnReset"
                    className="h-10 w-30 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium shadow-sm hover:bg-gray-200 transition duration-200"
                  >
                    Đặt lại
                  </button>
                </div>
              </div>
              <ProjectTable projects={projects}></ProjectTable>
            </div>
            {/* <!-- content 3 --> */}
            <div className="content-3 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="todo_card bg-white border border-gray-50 border-shadow min-w-75">
                {/* <!-- do something --> */}
                <h3 className="text-lg font-semibold text-gray-800 mb-5">
                  Công việc cần xử lý
                </h3>
                <hr className="text-gray-300 shadow-2xl" />
                <div className="divide-y divide-gray-100">
                  {/* <!-- Item 1 --> */}
                  <div className="flex items-center justify-between py-4 hover:bg-gray-50 transition rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                        ⚠
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          3 công trình sắp quá hạn
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500"> Hôm nay </span>
                  </div>

                  {/* <!-- Item 2 --> */}
                  <div className="flex items-center justify-between py-4 hover:bg-gray-50 transition rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        📄
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          2 hồ sơ chưa duyệt
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500"> Ngày mai </span>
                  </div>

                  {/* <!-- Item 3 --> */}
                  <div className="flex items-center justify-between py-4 hover:bg-gray-50 transition rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
                        💰
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          1 công trình vượt dự toán
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500"> 25/04/2024 </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        {/* Footer */}
        <Footer></Footer>
      </div>

      {/* OVERLAY */}
      <Overlay isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default DashboardPage;
