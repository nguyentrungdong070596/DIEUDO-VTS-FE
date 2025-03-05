import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography, Divider, Box, IconButton, Drawer } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Settings } from "@mui/icons-material"; // Icon bánh răng
import "../static/css/sidebar.scss";

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
  const location = useLocation();
  const [open, setOpen] = useState(false); // Trạng thái mở/đóng Sidebar

  // Hàm toggle Sidebar
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Nút bánh răng với hiệu ứng xoay */}
      <IconButton
        className="sidebar-toggle"
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 400,
          right: -20,
          zIndex: 50000,
        }}
        onClick={toggleDrawer}
      >
        <Settings
          sx={{
            fontSize: 32,
            color: "#1976d2",
            transition: "transform 0.3s ease-in-out",
            transform: open ? "rotate(180deg)" : "rotate(0deg)", // Xoay khi mở/đóng
          }}
        />
      </IconButton>

      {/* Sidebar dạng Drawer khi ở màn hình nhỏ */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer} // Đóng khi click ngoài Drawer
        sx={{ zIndex: 50000 }}
      >
        <Box sx={{ width: 250, backgroundColor: "#f5f5f5", height: "100vh", padding: 2 }}>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="h6"
                sx={{ color: "#1976d2", fontWeight: "bold", textTransform: "uppercase", padding: "8px 0" }}
              >
                {category.title}
              </Typography>
              <List>
                {category.items.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <ListItem
                      key={idx}
                      onClick={toggleDrawer} // Đóng Drawer khi chọn mục
                      sx={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        backgroundColor: isActive ? "#0196da" : "transparent",
                        color: isActive ? "#fff" : "inherit",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <Link
                        to={item.path}
                        style={{ textDecoration: "none", color: isActive ? "#fff" : "inherit", width: "100%" }}
                      >
                        <ListItemText primary={item.name} />
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
              {index < categories.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </Drawer>

      {/* Sidebar mặc định trên màn hình lớn */}
      <div className="side-bar col-custom l-3 m-12 c-12">
        <Box
          sx={{
            width: 250,
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: "8px",
            display: { xs: "none", md: "block" },
          }}
        >
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="h6"
                sx={{ color: "#1976d2", fontWeight: "bold", textTransform: "uppercase", padding: "8px 0" }}
              >
                {category.title}
              </Typography>
              <List>
                {category.items.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <ListItem
                      key={idx}
                      sx={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        backgroundColor: isActive ? "#0196da" : "transparent",
                        color: isActive ? "#fff" : "inherit",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <Link
                        to={item.path}
                        style={{ textDecoration: "none", color: isActive ? "#fff" : "inherit", width: "100%" }}
                      >
                        <ListItemText primary={item.name} />
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
              {index < categories.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </div>
    </>
  );
};

export default SidebarMenu;