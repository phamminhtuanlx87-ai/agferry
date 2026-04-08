import { useEffect, useState } from "react";
import { getCurrentUser, updateProfile } from "@/services/authService";
import { Link } from "react-router-dom";
type User = {
  username: string;
  fullName: string;
  phone: string;
  email: string;
  departmentName: string;
};

const EditProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    phone?: string;
  }>({});

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      const res = await getCurrentUser();
      setUser(res.data);
      setFullName(res.data.fullName);
      setPhone(res.data.phone);
    };
    loadUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ===== VALIDATION =====
    const newErrors: typeof errors = {};
    const nameError = validateFullName(fullName);
    if (nameError) newErrors.fullName = nameError;
    const phoneError = validatePhone(phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    const rawPhone = String(phone.replace(/\D/g, ""));
    try {
      setLoading(true);

      await updateProfile({ fullName, phone: rawPhone });

      setMessage("✅ Cập nhật thành công");
    } catch {
      setMessage("❌ Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 10);

    if (v.length <= 4) return v;
    if (v.length <= 7) return `${v.slice(0, 4)}.${v.slice(4)}`;
    return `${v.slice(0, 4)}.${v.slice(4, 7)}.${v.slice(7)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const validateFullName = (name: string): string | null => {
    const trimmed = name.trim();

    if (!trimmed) return "Họ tên không được để trống";
    if (trimmed.length < 3) return "Họ tên phải ≥ 3 ký tự";
    if (!/^[A-Za-zÀ-ỹ\s]+$/.test(trimmed)) return "Họ tên chỉ được chứa chữ";

    return null;
  };

  const validatePhone = (phone: string): string | null => {
    const raw = phone.replace(/\D/g, "");

    if (!raw) return "Số điện thoại không được để trống";

    if (!/^\d{10}$/.test(raw)) return "Số điện thoại không hợp lệ";

    return null;
  };

  if (!user) return <div>Đang tải...</div>;

  return (
    <>
      <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa thông tin cá nhân</h1>

        <div className="bg-white rounded-2xl shadow p-10">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-28 h-28">
              <div className="w-full h-full rounded-full bg-indigo-200 flex items-center 
              justify-center text-4xl font-bold text-indigo-700">
                {user.fullName.charAt(0)}
              </div>

              {/* Status */}
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col gap-4">
            <button className="text-sm text-indigo-600 hover:underline">
              Đổi ảnh đại diện
            </button>
            <Link to="/profile/password" className="text-sm text-indigo-600 hover:underline">
              Đổi mật khẩu
            </Link>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Họ và tên
              </label>
              <input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                onBlur={() => {
                  const err = validateFullName(fullName);
                  setErrors((prev) => ({
                    ...prev,
                    fullName: err || undefined,
                  }));
                }}
                className={`w-full border rounded-lg px-3 py-2 
                  border-gray-300 card-soft focus:ring-2 focus:ring-indigo-500 outline-none ${errors.fullName ? "border-red-500" : ""}`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Điện thoại
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handleChange}
                onBlur={() => {
                  const err = validatePhone(phone);
                  setErrors((prev) => ({ ...prev, phone: err || undefined }));
                }}
                placeholder="xxxx.xxx.xxx"
                className={`w-full border rounded-lg px-3 py-2 
                  border-gray-300 card-soft focus:ring-2 focus:ring-indigo-500 outline-none  ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                value={user.username}
                disabled
                className="w-full border rounded-lg px-3 py-2 bg-gray-100 border-gray-300 card-soft"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 ">Email</label>
              <input
                value={user.email}
                disabled
                className="w-full border rounded-lg px-3 py-2 bg-gray-100 border-gray-300 card-soft"
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
                className="w-full border rounded-lg px-3 py-2 bg-gray-100 border-gray-300 card-soft"
              />
            </div>

            {/* Message */}
            {message && <div className="text-md font-medium">{message}</div>}

            {/* Buttons */}
            <div className="flex  gap-3 pt-4 items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
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

export default EditProfilePage;
