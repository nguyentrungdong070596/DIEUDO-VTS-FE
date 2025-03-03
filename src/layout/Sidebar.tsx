import React from "react";
import { List, ListItem, ListItemText, Typography, Divider, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import '../static/css/sidebar.scss';

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
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="col-custom l-3 m-12 c-12">
      <Box sx={{ width: 250, backgroundColor: "#f5f5f5", padding: 2, borderRadius: "8px" }}>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold", textTransform: "uppercase", padding: "8px 0" }}>
              {category.title}
            </Typography>
            <List>
              {category.items.map((item, idx) => {
                const isActive = location.pathname === item.path; // Kiểm tra đường dẫn hiện tại

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
                      style={{
                        textDecoration: "none",
                        color: isActive ? "#fff" : "inherit",
                        width: "100%"
                      }}
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
  );
};

export default SidebarMenu;
