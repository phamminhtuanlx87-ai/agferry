// import { Navigate, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Overlay from "./Overlay";
import Footer from "./Footer";
import Siderbar from "./Siderbar";
// import { isAuthenticated } from "@/services/authService";
const DashboardLayout = () => {
  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }

  const [isOpen, setIsOpen] = useState(false);
  //-------------- Start toggleSidebar -----------------
  const openMenu = () => {
    setIsOpen(true);
    document.body.classList.add("overflow-hidden");
  };
  const toggleSidebar = (open: boolean) => {
    setIsOpen(open);
  };
  // khóa scroll body khi mở sidebar
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };
  //-------------- End toggleSidebar -----------------
  return (
    <>
      <div className="min-h-screen flex flex-col bg-neutral-bg text-neutral-text-main font-[Poppins]">
        {/*---Start HEADER ---- */}
        <Header
          variant="dashboard"
          openMenu={openMenu}
          toggleSidebar={toggleSidebar}
        />
        {/*---End HEADER ---- */}
        {/*-- Start PAGE CONTENT --*/}
        <section className="flex flex-1 overflow-hidden">
          <Siderbar isOpen={isOpen} toggleSidebar={toggleSidebar}></Siderbar>
        {/* <!-- ================= MAIN ================= --> */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </section>
        {/*-- End PAGE CONTENT --*/}
      </div>
      {/* OVERLAY */}
      <Overlay isMenuOpen={isOpen} closeMenu={closeMenu} />
      {/* Footer */}
      <Footer></Footer>
    </>
  );
};

export default DashboardLayout;
