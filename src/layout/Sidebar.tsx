import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../static/css/sidebar.scss";
import { FaCog } from "react-icons/fa"; // Biểu tượng bánh răng

const categories = [
  {
    title: "DANH MỤC",
    items: [
      { name: "Tin tức", path: "/tin-tuc" },
      { name: "Giới thiệu", path: "/gioi-thieu" },
      { name: "Ngành nghề kinh doanh", path: "/nganh-nghe-kinh-doanh" }
    ]
  },
  {
    title: "LIÊN KẾT WEBSITE",
    items: [
      { name: "Sàn Giao Dịch Chứng Khoán", path: "/san-giao-dich" },
      { name: "Cục Hải Quan", path: "/cuc-hai-quan" },
      { name: "Khí Tượng Thủy Văn Nam Bộ", path: "/khi-tuong-nam-bo" },
      { name: "Web Chính Phủ", path: "/web-chinh-phu" },
      { name: "Bộ Giao Thông", path: "/bo-giao-thong" },
      { name: "Văn Bản Pháp Luật", path: "/van-ban-phap-luat" },
      { name: "Cục Hàng Hải Việt Nam", path: "/cuc-hang-hai" },
      { name: "Báo Bà Rịa - Vũng Tàu", path: "/bao-vung-tau" }
    ]
  },
  {
    title: "TIỆN ÍCH",
    items: [
      { name: "Bảng Thủy Triều", path: "/bang-thuy-trieu" },
      { name: "Thời Tiết", path: "/thoi-tiet" }
    ]
  }
];

const SidebarMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    // Chỉ toggle trên mobile (max-width: 1024px)
    if (window.innerWidth <= 1024) {
      setOpen(!open);
      document.body.style.overflow = open ? "auto" : "hidden"; // Ngăn cuộn khi mở menu
    }
  };

  // Hàm xử lý khi click vào item trên mobile
  const handleItemClick = () => {
    if (window.innerWidth <= 1024) {
      toggleDrawer(); // Đóng sidebar chỉ trên mobile
    }
  };

  return (
    <>
      {/* Nút mở sidebar - Chỉ hiển thị trên mobile */}
      <button
        className={`sidebar-toggle ${open ? "rotate" : ""} custom-button`}
        onClick={toggleDrawer}
      >
        <FaCog />
      </button>

      {/* Sidebar */}
      <div className={`sidebar col-custom l-3 ${open ? "open" : ""}`}>
        {/* Nút đóng - Chỉ hiển thị trên mobile */}
        <button className="close-btn" onClick={toggleDrawer}>✖</button>

        {categories.map((category, index) => (
          <div key={index} className="sidebar-section">
            <h6 className="sidebar-title">{category.title}</h6>
            <ul className="sidebar-list">
              {category.items.map((item, idx) => (
                <li key={idx} className="sidebar-item" onClick={handleItemClick}>
                  <Link to={item.path} className="sidebar-link">
                    {"icon" in item && <img src={(item as { icon: string }).icon} alt="" />}
                    {item.name}
                  </Link>
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