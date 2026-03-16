import "remixicon/fonts/remixicon.css";
import bannerLeft from "@/assets/images/banner_left.png";
import avata from "@/assets/icons/avata.svg";
type Props = {
  variant?: "auth" | "dashboard";
  openMenu?: () => void;
  toggleSidebar?: (open: boolean) => void;
};

const Header = ({ variant = "auth", openMenu, toggleSidebar }: Props) => {
  return (
    <>
      {/* Menu desktop (chỉ auth) */}
      {variant === "auth" && (
        <header className="bg-primary shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-white hover:text-accent transition cursor-pointer">
              <div className="bg-neutral-bg rounded-full">
                <img src={bannerLeft} className="w-10 h-10" alt="logo" />
              </div>
              An Giang Ferry JSC
            </div>

            {/* Desktop menu */}
            <nav className="hidden sm:flex gap-6 text-white">
              <a className="font-semibold hover:text-accent transition">
                Trang chủ
              </a>
              <a className="hover:text-accent transition">Giới thiệu</a>
              <a className="hover:text-accent transition">Liên hệ</a>
            </nav>

            {/* Mobile button */}
            {openMenu && (
              <button
                className="sm:hidden text-white text-2xl"
                onClick={openMenu}
              >
                ☰
              </button>
            )}
          </div>
        </header>
      )}
      {/* Menu desktop (chỉ dashboard) */}
      {variant === "dashboard" && (
        <header className="h-14 bg-primary text-white flex items-center justify-between px-4 shadow-sm border-b border-white/20">
          <div className="flex items-center gap-2 font-bold cursor-pointer hover:text-accent transition">
            <img src={bannerLeft} className="w-10 h-10" alt="" />
            <span className="text-2xl">An Giang Ferry JSC</span>
          </div>

          {/* <!-- Desktop menu --> */}
          <nav className="hidden md:flex gap-3 text justify-start items-center">
            <div className="border border-gray-100 rounded-full bg-white h-10 w-10">
              <a href="#" className="hover:text-accent transition">
                <img src={avata} className="w-9 h-9" alt="" />
              </a>
            </div>
            <div className="flex gap-1">
              <a href="#" className="hover:text-accent transition">
                Phạm Minh Tuấn
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-5 hover:text-accent cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </nav>

          {/* <!-- Mobile toggle --> */}
          <button
            className="md:hidden text-2xl"
            onClick={() => toggleSidebar?.(true)}
          >
            ☰
          </button>
        </header>
      )}
    </>
  );
};

export default Header;
