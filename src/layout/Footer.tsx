import React from "react";
import { LocationOn, Phone, Email, Send } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";

import "../static/css/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Cột 1: Về chúng tôi */}
        <div className="footer-section">
          <h3>Về chúng tôi</h3>
          <p className="font-bold">CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU</p>
          <p><LocationOn /> 88 Hạ Long, Phường 2, TP. Vũng Tàu, Việt Nam</p>
          <p><Phone /> 0254. 3810 546 / 3858 567</p>
          <p><Email /> hoatieu@vungtauship.com</p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tin tức</a></li>
            <li><a href="#">Thư viện ảnh</a></li>
            <li><a href="#">Thư viện video</a></li>
            <li><a href="#">Bảng giá dịch vụ</a></li>
          </ul>
        </div>

        {/* Cột 3: Đăng ký bản tin */}
        <div className="footer-section">
          <h3>Đăng ký bản tin</h3>
          <p>Đăng ký để nhận các tin tức, sự kiện mới từ chúng tôi</p>

          <div className="newsletter">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Nhập email..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  height: "42px",
                  "& fieldset": { border: "none" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={{ bgcolor: "#0073AA", "&:hover": { bgcolor: "#005F8A" } }}>
                      <Send fontSize="small" sx={{ color: "white" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        © 2025 Bản Quyền Thuộc Về CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU
      </div>
    </footer>
  );
};

export default Footer;
