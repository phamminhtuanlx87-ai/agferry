import { Link } from "react-router-dom";
import InputProject from "./InputProject";

const AddProject = () => {
  return (
    <div>
      <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Thêm công trình</h1>

        <div className="bg-white rounded-2xl shadow p-10">
          {/* FORM */}
          <form className="space-y-4">
            {/* Tên Ctr */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tên công trình:
              </label>
              <input className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>

            {/* Phong ban */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phòng ban:
              </label>
              <input
                placeholder="P.Kỹ thuật - Vật tư"
                className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none disabled"
              />
            </div>

            {/* dự toán */}
            <InputProject
              tile="Dự toán"
              label1="Ngày Dự toán:"
              label2="Tổng dự toán:"
              label3="Chi phí xây dựng:"
              label4=" Link file đính kèm:"
            ></InputProject>
            {/* TTra dự toán */}
            <InputProject
              tile="Thẩm tra Dự toán"
              label1="Ngày Thẩm tra:"
              label2="Tổng dự toán:"
              label3="Chi phí xây dựng:"
              label4=" Link file đính kèm:"
            ></InputProject>
            {/* QĐ phê duyệt DT */}
            <InputProject
              tile="Quyết định Phê duyệt Dự toán"
              label1="Ngày Quyết định:"
              label2="Tổng dự toán:"
              label3="Chi phí xây dựng:"
              label4=" Link file đính kèm:"
            ></InputProject>
            {/* Thi công */}
            <InputProject
              tile="Thi công"
              label1="Ngày khởi công:"
              label2="Ngày hoàn thành:"
            ></InputProject>
            {/* HS nghiệm thu */}
            <InputProject
              tile="Hồ sơ nghiệm thu"
              label1="Ngày nghiệm thu hoàn thành:"
            ></InputProject>
          
            {/* QĐ phê duyệt (điều chỉnh) */}
            <InputProject
              tile="Quyết định Phê duyệt Dự toán (Điều chỉnh)"
              label1="Ngày Quyết định:"
              label2="Tổng dự toán:"
              label3="Chi phí xây dựng:"
              label4=" Link file đính kèm:"
            ></InputProject>
            {/* QĐ phê duyệt (điều chỉnh) */}
            <InputProject
              tile="Quyết toán"
              label1="Ngày Quyết toán:"
              label2="Tổng Quyết toán:"
              label3="Chi phí xây dựng:"
              label4=" Link file đính kèm:"
            ></InputProject>

            {/* Buttons */}
            <div className="flex  gap-3 pt-4 items-center justify-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                Lưu thay đổi
              </button>
              <Link
                to="/dashboard"
                type="button"
                className="border px-6 py-2 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
