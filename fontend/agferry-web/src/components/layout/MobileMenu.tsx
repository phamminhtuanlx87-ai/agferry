type Pros = {
  isMenuOpen: boolean;
  closeMenu: () => void;
};

const MobileMenu = ({ isMenuOpen, closeMenu }: Pros) => {
  return (
    <>
      <aside
        className={
          "fixed top-0 left-0 h-full w-72 bg-primary transition-transform duration-300 z-50 " +
          (isMenuOpen ? "translate-x-0" : "-translate-x-full")
        }
        id="mobile-menu"
      >
        {/* <!-- Header mobile --> */}
        <div className="h-14 flex items-center justify-between px-4 text-white border-b border-white/20">
          <span className="font-bold">Menu</span>
          <button id="closeMenu" className="text-2xl" onClick={closeMenu}>
            ✕
          </button>
        </div>

        {/* <!-- Items --> */}
        <nav className="flex flex-col px-6 py-4 gap-4 text-white">
          <a
            className="py-2 hover:bg-primary-hover rounded transition"
            href="#"
          >
            Trang chủ
          </a>
          <a
            className="py-2 hover:bg-primary-hover rounded transition"
            href="#"
          >
            Giới thiệu
          </a>
          <a
            className="py-2 hover:bg-primary-hover rounded transition"
            href="#"
          >
            Liên hệ
          </a>
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
