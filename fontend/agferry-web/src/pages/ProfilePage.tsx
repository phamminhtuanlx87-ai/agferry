import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type User = {
  username: string;
  fullName: string;
  phone: string;
  email: string;
  departmentName: string;
  role: string;
};
const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      setUser({
        username: "andypham",
        fullName: "Phạm Minh Tuấn",
        email: "tuan@gmail.com",
        phone: "0901 234 567",
        departmentName: "IT",
        role: "Nhân viên",
      });
    };

    loadUser();
  }, []);

  if (!user) return <div>Đang tải...</div>;

  return (
    <>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* TITLE */}
        <h1 className="text-2xl font-bold">Thông tin người dùng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 🟪 PROFILE OVERVIEW */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            {/* Avatar */}
            <div className="relative w-28 h-28 mx-auto">
              <div className="w-full h-full rounded-full bg-indigo-200 flex items-center justify-center text-4xl font-bold text-indigo-700">
                {user.fullName.charAt(0)}
              </div>

              {/* Status */}
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Name */}
            <h2 className="mt-4 text-xl font-semibold">{user.fullName}</h2>

            <p className="text-gray-500">@{user.username}</p>

            {/* Badges */}
            <div className="mt-3 flex justify-center gap-2">
              <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
                {user.departmentName}
              </span>

              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                {user.role}
              </span>
            </div>

            {/* Edit button */}
            
            <Link to="editprofile" className="block mt-5 min-w-10 bg-indigo-600 text-white py-2 rounded-lg
             hover:bg-indigo-700 transition">✏️ Chỉnh sửa thông tin</Link>
          </div>

          {/* 🟦 THÔNG TIN CHI TIẾT */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Chi tiết</h3>

            <div className="space-y-3 text-sm">
              <InfoRow label="Username" value={user.username} />
              <InfoRow label="Họ tên" value={user.fullName} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Số điện thoại" value={user.phone} />
              <InfoRow label="Phòng ban" value={user.departmentName} />
              <InfoRow label="Vai trò" value={user.role} />
            </div>
          </div>

          {/* 🟩 HOẠT ĐỘNG GẦN ĐÂY */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>

            <ul className="space-y-4 text-sm">
              <ActivityItem icon="🔐" text="Đăng nhập hôm nay 08:12" />
              <ActivityItem icon="📄" text="Cập nhật hồ sơ 2 ngày trước" />
              <ActivityItem icon="📊" text="Gửi báo cáo tháng 03" />
              <ActivityItem icon="🛠" text="Tham gia dự án Bến phà Vàm Cống" />
            </ul>
          </div>

          {/* 🟨 HÀNH ĐỘNG NHANH */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Hành động nhanh</h3>

            <div className="grid grid-cols-2 gap-3">
              <ActionButton text="Đổi mật khẩu" icon="🔑" />
              <ActionButton text="Cập nhật avatar" icon="🖼" />
              <ActionButton text="Cài đặt thông báo" icon="🔔" />
              <ActionButton text="Cài đặt tài khoản" icon="⚙️" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

type InfoRowProps = {
  label: string;
  value: string;
};
function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
type ActivityItemProps = {
  icon: string;
  text: string;
};
function ActivityItem({ icon, text }: ActivityItemProps) {
  return (
    <li className="flex items-center gap-3">
      <span>{icon}</span>
      <span>{text}</span>
    </li>
  );
}
type ActionButtonProps = {
  text: string;
  icon: string;
};

function ActionButton({ text, icon }: ActionButtonProps) {
  return (
    <button className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
}
