import { Link } from "react-router-dom";

const EditPassword = () => {
  return (
    <>
      <div className="flex-1 p-6 max-w-xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa thông tin cá nhân</h1>

        <div className="bg-white rounded-2xl shadow p-10">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-28 h-28">
              <div className="w-full h-full rounded-full bg-indigo-200 flex items-center justify-center text-4xl font-bold text-indigo-700">
                P
              </div>

              {/* Status */}
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            <button className="text-sm text-indigo-600 hover:underline">
              Đổi ảnh đại diện
            </button>
           
          </div>

          {/* FORM */}
          <form className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Mật khẩu cũ:
              </label>
              <input
                type="password"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none border-red-500}`}
              />

              <p className="text-red-500 text-sm mt-1">Không đúng mật khẩu</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mật khẩu mới:
              </label>
              <input
                type="password"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none border-red-500}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Nhập lại mật khẩu mới:
              </label>
              <input
                type="password"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none border-red-500}`}
              />

              <p className="text-red-500 text-sm mt-1">Mật khẩu không trùng khớp</p>
            </div>

            <div className="text-md font-medium">Cập nhật thành công</div>

            {/* Buttons */}
            <div className="flex  gap-3 pt-4 items-center justify-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                Lưu thay đổi
              </button>

              <Link to="/profile"
                type="button"
                className="border px-6 py-2 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPassword;
