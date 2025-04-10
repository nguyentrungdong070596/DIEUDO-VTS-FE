import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../static/css/sidebar.scss";
import { FaCog } from "react-icons/fa"; // Biểu tượng bánh răng
import { useTranslation } from "react-i18next";

// const categories = [
//   {
//     title: "DANH MỤC",
//     items: [
//       { name: "📰 Tin tức", path: "/tin-tuc" },
//       { name: "📘 Giới thiệu", path: "/gioi-thieu-cong-ty" },
//       { name: "💼 Ngành nghề kinh doanh", path: "/" }
//     ]
//   },
//   {
//     title: "LIÊN KẾT WEBSITE",
//     items: [
//       { name: "📈 Sàn Giao Dịch Chứng Khoán", path: "https://www.ssc.gov.vn/webcenter/portal/ubck" },
//       { name: "🛃 Cục Hải Quan", path: "https://www.customs.gov.vn/" },
//       { name: "🌦️ Khí Tượng Thủy Văn Nam Bộ", path: "http://www.kttv-nb.org.vn/" },
//       { name: "🌐 Web Chính Phủ", path: "https://chinhphu.vn/" },
//       { name: "🚦 Bộ Giao Thông", path: "https://www.mt.gov.vn/" },
//       { name: "📄 Văn Bản Pháp Luật", path: "https://luatvietnam.vn/" },
//       { name: "🚢 Cục Hàng Hải Việt Nam", path: "https://www.vinamarine.gov.vn/" },
//       { name: "📰 Báo Bà Rịa - Vũng Tàu", path: "https://baria-vungtau.gov.vn/sphere/baria/vungtau/page/trang-chu.cpx" }
//     ]
//   },
//   {
//     title: "TIỆN ÍCH",
//     items: [
//       { name: "🌊 Bảng Thủy Triều", path: "/bang-thuy-trieu" },
//       { name: "☁️ Thời Tiết", path: "https://www.24h.com.vn/du-bao-thoi-tiet-c568.html" }
//     ]
//   }
// ];




const SidebarMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false); // Trạng thái fixed của Navbar
  const [isDesktopAndTablet, setIsDesktopAndTablet] = useState(window.innerWidth >= 740);
  const [animationDone, setAnimationDone] = useState(false);
  const { t } = useTranslation();

  interface Category {
    title: string;
    items: { name: string; path: string }[];
  }

  const categories = t("categories", { returnObjects: true }) as Category[];

  useEffect(() => {
    const handleResize = () => setIsDesktopAndTablet(window.innerWidth >= 740);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleDrawer = () => {
    // Chỉ toggle trên mobile (max-width: 1024px)
    if (window.innerWidth < 1024) {
      setOpen(!open);
      document.body.style.overflow = open ? "auto" : "hidden"; // Ngăn cuộn khi mở menu
    }
  };

  // Theo dõi vị trí cuộn để cố định Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 100; // Khoảng cách cuộn để Navbar trở thành fixed
      setIsFixed(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup khi unmount
  }, []);
  const handleAnimationEnd = () => {
    setAnimationDone(true); // gỡ animation class sau khi hiệu ứng xong
  };

  // Hàm xử lý khi click vào item trên mobile
  const handleItemClick = () => {
    if (window.innerWidth <= 1024) {
      toggleDrawer(); // Đóng sidebar chỉ trên mobile
    }
  };

  const getNavClass = () => {
    let classes = "sidebar  col-custom l-3 ";
    if (open) classes += " open "
    if (isFixed) classes += " fixed "

    if (isDesktopAndTablet && !animationDone) classes += "  animate__fadeInDown";
    return classes;
  };

  return (
    <>
      {/* Nút mở sidebar - Chỉ hiển thị trên mobile */}
      <button
        className={`sidebar-toggle ${open ? "rotate" : ""}   custom-button`}
        onClick={toggleDrawer}
      >
        <FaCog />
      </button>


      <div
        className={getNavClass()}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Nút đóng - Chỉ hiển thị trên mobile */}
        <button className="close-btn" onClick={toggleDrawer}>✖</button>

        {categories.map((category, index) => (
        <div key={index} className="sidebar-section">
          <h6 className="sidebar-title">{category.title}</h6>
          <ul className="sidebar-list">
            {category.items.map((item, idx) => (
              <li key={idx} className="sidebar-item" onClick={handleItemClick}>
                {item.path.startsWith("http") ? (
                  <a
                    href={item.path}
                    className="sidebar-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link to={item.path} className="sidebar-link">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>

      {/* Overlay khi mở sidebar - Chỉ hiển thị trên mobile */}
      {open && window.innerWidth <= 1024 && (
        <div className="sidebar-overlay" onClick={toggleDrawer}></div>
      )}
    </>
  );
};

export default SidebarMenu;