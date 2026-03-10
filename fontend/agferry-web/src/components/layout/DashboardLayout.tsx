// import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Header";
import MobileMenu from "./MobileMenu";
import Overlay from "./Overlay";
import Siderbar from "./Siderbar";
import { Outlet } from "react-router-dom";
// import { isAuthenticated } from "@/services/authService";
const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add("overflow-hidden");
  };

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

  const toggleSidebar = (open: boolean) => {
    setIsOpen(open);
  };

  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }
  return (
    <div className="min-h-screen flex flex-col bg-neutral-bg">
      <Siderbar isOpen={isOpen} toggleSidebar={toggleSidebar}></Siderbar>
      {/* HEADER */}
      <Header
        variant="dashboard"
        openMenu={openMenu}
        toggleSidebar={toggleSidebar}
      />

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* OVERLAY */}
      <Overlay isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

      {/* MOBILE MENU */}
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </div>
  );
};

export default DashboardLayout;
