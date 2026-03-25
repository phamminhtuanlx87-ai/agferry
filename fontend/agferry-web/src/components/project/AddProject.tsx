import { Link } from "react-router-dom";
import { EstimationSection } from "./EstimationSection";
import type { ProjectFormData } from "./types";
import { useForm } from "react-hook-form";
import { GeneralInfo } from "./GeneralInfo";
import { DecisionSection } from "./DecisionSection";
import { ConstructionSection } from "./ConstructionSection";


const AddProject = () => {

  // Khai báo công cụ quản lý form
  const { register, handleSubmit } = useForm<ProjectFormData>();

  // Khi bấm nút "Lưu thay đổi", hàm này sẽ chạy
  const onSubmit = (data: ProjectFormData) => {
    alert("Đã thu thập dữ liệu thành công! Hãy xem trong console.");
    console.log("Dữ liệu form:", data);
  };

  return (
    <div>
      {/* ----------------- */}
      <div className="flex-1 mx-auto w-full">
        <div className="">
          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex bg-gray-50 min-h-screen">
              {/* Main Content */}
              <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-2xl font-extrabold text-slate-800 mb-8 uppercase border-b-2 border-blue-600 pb-2 inline-block">
                    Hồ sơ chi tiết công trình
                  </h1>
                  <div className="space-y-8">
                    {/* Phần 1: Thông tin chung - Gọn gàng hơn */}
                    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                      <GeneralInfo register={register}></GeneralInfo>
                    </section>

                    {/* Phần 2: Các phần số liệu - Chia cột Grid 2 hoặc 4 */}
                    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                       <EstimationSection register={register} />
                    </section>
                    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                       <DecisionSection register={register} />
                    </section>
                       {/* Phần 3: Quyết toán & Thi công */}
                    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                       <ConstructionSection register={register} />
                    </section>
                 
                  

                    {/* Nút lưu luôn cố định hoặc ở góc dễ thấy */}
                    <div className="flex justify-end gap-4 pb-12">
                      <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded font-bold hover:bg-gray-300 transition">
                        Hủy
                      </button>
                      <button type="submit"
                      className="px-10 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 shadow-lg transition">
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex border-b border-gray-200 bg-gray-300">
                <div className="bg-white border border-blue-300 ">
                  <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold">
                    Thông tin chung
                  </button>
                </div>
                <div>
                  <button className="px-4 py-2 text-gray-600 hover:text-accent hover:cursor-pointer transition">
                    Dự toán
                  </button>
                </div>
                <div>
                  <button className="px-4 py-2 text-gray-600 hover:text-accent hover:cursor-pointer transition">
                    Thẩm tra
                  </button>
                </div>
                <div>
                  <button className="px-4 py-2 text-gray-600 hover:text-accent hover:cursor-pointer transition">
                    Thẩm tra
                  </button>
                </div>
              </div>
              <div className="w-full  bg-white p-4 border border-t-0 border-gray-200 mb-6">
                <div className=" flex flex-col gap-3 max-w-xl">
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
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ngày tạo:
                    </label>
                    <input className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none disabled" />
                  </div>
                </div>
              </div>
            </div>

            {/* QĐ phê duyệt (điều chỉnh) */}
            {/* <InputProject
              tile="Quyết định Phê duyệt Dự toán (Điều chỉnh)"
              label1="Ngày Quyết định:"
              label2="Tổng dự toán:"
              label3="Chi phí xây dựng:"
              label4=" Link file đính kèm:"
            ></InputProject> */}
            {/* QĐ phê duyệt (điều chỉnh) */}
            {/* <InputProject
              tile="Quyết toán"
              label1="Ngày Quyết toán:"
              label2="Tổng Quyết toán:"
              label3="Chi phí xây dựng:"
              label4=" Link file đính kèm:"
            ></InputProject> */}

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
