import React, { useState, useEffect } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "../static/css/nav.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import 'animate.css';
import { useTranslation } from "react-i18next";
import Apis, { endpoints } from "../configs/Apis";
import { LinkDathangdichvu } from "../interface/InterfaceCommon";

const Navbar: React.FC = () => {

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<number | null>(null);
  const [isFixed, setIsFixed] = useState(false); // Trạng thái fixed của Navbar
  const [isDesktopAndTablet, setIsDesktopAndTablet] = useState(window.innerWidth >= 740);
  const [animationDone, setAnimationDone] = useState(false);
  const [link, setLink] = useState<LinkDathangdichvu[]>([]);

  useEffect(() => {
    const handleResize = () => setIsDesktopAndTablet(window.innerWidth >= 740);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const loadLinkDathangdichvu = async () => {
    try {
      const params = { limit: 1000, page: 1, itemType: "10" };
      const response = await Apis.get(endpoints.APIItems, { params });



      if (response.data && Array.isArray(response.data.data)) {
        setLink(response.data.data);


        // Sử dụng totalRecords từ API

      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setLink([]);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setLink([]);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await loadLinkDathangdichvu();
    };

    fetchData();
  }, []);
  const menuItems = [
    { path: "/", label: t("home") },
    { path: "/ke-hoach-dan-tau", label: t("plan") },
    { path: "/gio-dieu-dong", label: t("schedule") },
    { path: link[0]?.title || "/dat-hang-dich-vu", label: t("orderService") }, // ← gắn `link[0]?.link` vào đây
    { path: "/gia-dich-vu", label: t("servicePrice") },
    { path: "/danh-sach-hoa-tieu", label: t("pilotList") },
    {
      label: t("techSpec"),
      path: "#",
      submenu: [
        { path: "/vi-tri-don-tra-hoa-tieu", label: t("pilotPosition") },
        { path: "/lich-thuy-trieu", label: t("tideSchedule") },
        { path: "/tuyen-luong", label: t("route") },
        { path: "/hoat-dong-cong-ty", label: t("activity") },
        { path: "/he-thong-cang-bien", label: t("seaportSystem") },
        { path: "/vung-hoa-tieu", label: t("pilotArea") },
        { path: "/danh-sach-phuong-tien", label: t("transportVehicleList") },
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
  const handleAnimationEnd = () => {
    setAnimationDone(true); // gỡ animation class sau khi hiệu ứng xong
  };
  const getNavClass = () => {
    let classes = "nav-menu";
    if (isFixed) classes += " fixed";
    if (isDesktopAndTablet && !animationDone) classes += " animate__animated animate__bounceInRight";
    return classes;
  };

  return (
    <div
      className={getNavClass()}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* Nút mở menu trên mobile */}
      <button className="menu-button" onClick={() => setIsOpen(true)}>
        <FaBars className="menu-icon" /> {/* Thay thế MenuIcon */}
      </button>

      {/* Menu chính (DesktopAndTablet) */}
      <div className="menu-items">
        {menuItems.map((item, index) => (



          item.submenu ? (
            <div
              key={index}
              className={`item-menu submenu-container`}
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === index ? null : index);
              }}
            >
              <span className="submenu-trigger">
                {item.label}
                <span className={`submenu-icon ${openSubMenu === index ? "open" : ""}`}>▼</span>
              </span>

              <div className={`submenu ${openSubMenu === index ? "open" : ""}`}>
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className="submenu-item"
                    onClick={() => setOpenSubMenu(null)}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={index} to={item.path} className="item-menu">
              {item.label}
            </Link>
          )
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