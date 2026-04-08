import type { ProjectFormData } from "./types";
import { useForm } from "react-hook-form";
import { GeneralInfo } from "./GeneralInfo";

const AddProject = () => {
  // Khai báo công cụ quản lý form
  const { register, handleSubmit } = useForm<ProjectFormData>({
  defaultValues: {
    donVi: "PKT", // Giá trị này phải khớp với 'value' trong OPTIONS_DU_TOAN
    donViChuQuan: "Cty Cổ phần Phà An Giang"
  }
});

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
                  <h1 className="text-2xl font-extrabold text-primary mb-8 uppercase border-b-2 border-primary pb-2 inline-block">
                    Hồ sơ chi tiết công trình
                  </h1>
                  <div className="space-y-8">
                    {/* Phần 1: Thông tin chung - Gọn gàng hơn */}
                    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                      <GeneralInfo register={register}></GeneralInfo>
                    </section>
                    {/* Nút lưu luôn cố định hoặc ở góc dễ thấy */}
                    <div className="flex justify-center gap-4 pb-12">
                      <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded font-bold hover:bg-gray-300 transition">
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-10 py-2 bg-indigo-600 text-white rounded font-bold hover:bg-indigo-700 shadow-lg transition"
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
