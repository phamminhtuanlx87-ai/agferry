import { Outlet } from "react-router-dom";
import { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import Overlay from "./Overlay";

const AuthLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div className="bg-neutral-bg text-neutral-text-main min-h-screen flex flex-col">

      {/* HEADER */}
      <Header variant="auth" openMenu={openMenu} />

      {/* PAGE CONTENT */}
      <main className="flex-1 flex items-center justify-center w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* OVERLAY */}
      <Overlay isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

      {/* MOBILE MENU */}
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

    </div>
  );
};

export default AuthLayout;