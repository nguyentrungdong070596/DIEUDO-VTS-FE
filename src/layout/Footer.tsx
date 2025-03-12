import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Font Awesome Icons
import "../static/css/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Cột 1: Về chúng tôi */}
        <div className="footer-section about">
          <h3>Về chúng tôi</h3>
          <p className="company-name">CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU</p>
          <p>🏢 Cổng TT, Phường 1, TP. Vũng Tàu, Việt Nam</p>
          <p>📞 0254. 3859 003 / 3852 185</p>
          <p>📧 vt@vungtauship.com</p>
        </div>

        {/* Cột 2: Dịch vụ cung cấp */}
        <div className="footer-section services">
          <h3>Dịch vụ cung cấp</h3>
          <ul>
            <li><a href="#">Hoa tiêu hàng hải</a></li>
            <li><a href="#">Dịch vụ kéo đẩy tại cảng</a></li>
            <li><a href="#">Chờ thuyền, tàu</a></li>
            <li><a href="#">Xử lý Khối Hàng Hóa</a></li>
            <li><a href="#">Thi công các công trình, dự án hàng hải</a></li>
            <li><a href="#">Dịch vụ dẫn lót tàu biển</a></li>
          </ul>
        </div>

        {/* Cột 3: Liên kết nhanh */}
        <div className="footer-section links">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tin tức</a></li>
            <li><a href="#">Thư viện ảnh</a></li>
            <li><a href="#">Thư viện video</a></li>
            <li><a href="#">Bảng giá dịch vụ</a></li>
            <li><a href="#">Quan hệ cổ đông</a></li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký bản tin */}
        <div className="footer-section newsletter">
          <h3>Đăng ký bản tin</h3>
          <p>Đăng ký để nhận các tin tức, sự kiện mới từ chúng tôi!</p>
          <div className="newsletter-container">
            <input type="email" className="newsletter-input" placeholder="Nhập email..." />
            <button className="newsletter-button">📩</button>
          </div>
          <div className="social-links">
            <a href="#" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaLinkedinIn />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
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