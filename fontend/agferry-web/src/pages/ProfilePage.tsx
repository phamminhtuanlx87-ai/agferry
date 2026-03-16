import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";
import Header from "@/components/layout/Header";
import Overlay from "@/components/layout/Overlay";
import Footer from "@/components/layout/Footer";
import Siderbar from "@/components/layout/Siderbar";
import { Link } from "react-router-dom";
type User = {
  username: string;
  fullName: string;
  email: string;
  departmentName: string;
};
const ProfilePage = () => {
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

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, []);

  if (!user) return <div>Đang tải...</div>;

  return (
    <>
      <div className="min-h-screen flex flex-col bg-neutral-bg text-neutral-text-main font-[Poppins]">
        {/* HEADER */}
        <Header
          variant="dashboard"
          openMenu={openMenu}
          toggleSidebar={toggleSidebar}
        />
        {/* <!-- ================= MAIN ================= --> */}
        <section className="flex flex-1 overflow-hidden">
          <Siderbar isOpen={isOpen} toggleSidebar={toggleSidebar}></Siderbar>
          <div className="flex-1 overflow-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Thông tin người dùng</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ===== LEFT CARD — PROFILE ===== */}
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <h2 className="text-xl font-semibold">{user.fullName}</h2>
                <p className="text-gray-500">@{user.username}</p>

                {/* Department */}
                <span className="mt-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                  {user.departmentName}
                </span>

                {/* Edit button */}
                <Link to="/editprofile" className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  ✏️ Chỉnh sửa thông tin
                </Link>
              </div>

              {/* ===== RIGHT CARD — DETAILS ===== */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Chi tiết</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Họ tên</p>
                    <p className="font-medium">{user.fullName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phòng ban</p>
                    <p className="font-medium">{user.departmentName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <Footer></Footer>
        {/* OVERLAY */}
      </div>
      <Overlay isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default ProfilePage;
