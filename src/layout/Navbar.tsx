import React, { useState, useEffect } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "../static/css/nav.scss";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<number | null>(null);
  const [isFixed, setIsFixed] = useState(false); // Trạng thái fixed của Navbar

  const menuItems = [
    { path: "/", label: "TRANG CHỦ" },
    { path: "/ke-hoach-dan-tau", label: "KẾ HOẠCH DẪN TÀU" },
    { path: "/gio-dieu-dong", label: "GIỜ ĐIỀU ĐỘNG & MỚN NƯỚC" },
    { path: "/dat-hang-dich-vu", label: "ĐẶT HÀNG DỊCH VỤ" },
    {
      path: "/gia-dich-vu", label: "GIÁ DỊCH VỤ"
    },
    { path: "/danh-sach-hoa-tieu", label: "DANH SÁCH HOA TIÊU" },
    {
      label: "THÔNG SỐ KỸ THUẬT",
      path: "#",
      submenu: [
        { path: "/vi-tri-don-tra-hoa-tieu", label: "Vị trí đón trả hoa tiêu" },
        { path: "/lich-thuy-trieu", label: "Lịch thủy triều" },
        { path: "/tuyen-luong", label: "Tuyến luồng" },
        { path: "/he-thong-cang-bien", label: "Hệ thống cảng biển" },
        { path: "/vung-hoa-tieu", label: "Vùng hoa tiêu" },
      ],
    },
  ];

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

  return (
    <div className={`nav-menu ${isFixed ? "fixed" : ""}`}>
      {/* Nút mở menu trên mobile */}
      <button className="menu-button" onClick={() => setIsOpen(true)}>
        <FaBars className="menu-icon" /> {/* Thay thế MenuIcon */}
      </button>

      {/* Menu chính (desktop) */}
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`item-menu ${item.submenu ? "submenu-container" : ""}`}
            onClick={(e) => {
              if (item.submenu) {
                e.preventDefault(); // Ngăn chặn Link chuyển hướng khi click vào submenu
                setOpenSubMenu(openSubMenu === index ? null : index);
              }
            }}
          >
            <Link to={item.path} className={item.submenu ? "submenu-trigger" : ""}>
              {item.label}
            </Link>
            {item.submenu && (
              <span className={`submenu-icon ${openSubMenu === index ? "open" : ""}`}>▼</span>
            )}

            {item.submenu && (
              <div className={`submenu ${openSubMenu === index ? "open" : ""}`}>
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className="submenu-item"
                    onClick={() => setOpenSubMenu(null)} // Đóng submenu khi chọn item con
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Menu sidebar cho mobile */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <button className="close-button" onClick={() => setIsOpen(false)}>
          <FaTimes className="close-icon" /> {/* Thay thế CloseIcon */}        </button>
        <div className="mobile-items">
          {menuItems.map((item, index) => (
            <div key={index} className="item-menu">
              {item.submenu ? (
                <>
                  <div
                    className="submenu-toggle"
                    onClick={() =>
                      setOpenMobileSubMenu(openMobileSubMenu === index ? null : index)
                    }
                  >
                    {item.label}
                    <span className={`submenu-icon ${openMobileSubMenu === index ? "open" : ""}`}>
                      ▼
                    </span>
                  </div>
                  <div className={`submenu ${openMobileSubMenu === index ? "open" : ""}`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="submenu-item"
                        onClick={() => {
                          setIsOpen(false); // Đóng menu mobile khi chọn item con
                          setOpenMobileSubMenu(null); // Đóng submenu mobile
                        }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)} // Đóng menu mobile khi chọn item
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;