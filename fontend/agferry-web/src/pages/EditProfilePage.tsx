import { useEffect, useState } from "react";
import { getCurrentUser, updateProfile } from "@/services/authService";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Siderbar from "@/components/layout/Siderbar";

type User = {
  username: string;
  fullName: string;
  email: string;
  departmentName: string;
};

const EditProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const toggleSidebar = (open: boolean) => setIsOpen(open);

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      const res = await getCurrentUser();
      setUser(res.data);
      setFullName(res.data.fullName);
    };
    loadUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ===== VALIDATION =====
    if (fullName.trim().length < 3) {
      setMessage("Họ tên phải ≥ 3 ký tự");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await updateProfile({ fullName });

      setMessage("✅ Cập nhật thành công");
    } catch {
      setMessage("❌ Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Đang tải...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-bg">
      <Header variant="dashboard" toggleSidebar={toggleSidebar} />

      <section className="flex flex-1">
        <Siderbar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 p-6 max-w-3xl mx-auto w-full">

          <h1 className="text-2xl font-bold mb-6">
            Chỉnh sửa thông tin cá nhân
          </h1>

          <div className="bg-white rounded-2xl shadow p-6">

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600">
                {user.fullName.charAt(0).toUpperCase()}
              </div>

              <button className="text-sm text-indigo-600 hover:underline">
                Đổi ảnh đại diện
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Họ tên
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  value={user.username}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  value={user.email}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phòng ban
                </label>
                <input
                  value={user.departmentName}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              {/* Message */}
              {message && (
                <div className="text-sm font-medium">
                  {message}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>

                <button
                  type="button"
                  onClick={() => setFullName(user.fullName)}
                  className="border px-6 py-2 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>

              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EditProfilePage;