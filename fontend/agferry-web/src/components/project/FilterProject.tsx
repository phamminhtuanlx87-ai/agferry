
const FilterProject = () => {
  return (
    <div>
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
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Tất cả
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Dự toán
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Thẩm tra DT
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Phê duyệt DT & KH lựa chọn nhà thầu
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Thi công
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Thẩm tra DTPS
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
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
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Tất cả
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                P.Kỹ thuật - Vật tư
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                P.Đầu tư
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                XN Cơ Khí Giao Thông
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                KTC (Đv lập DT)
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Tây Nam Bộ (Đv thẩm tra)
              </a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
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
    </div>
  );
};

export default FilterProject;
