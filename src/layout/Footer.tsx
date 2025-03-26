import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Font Awesome Icons
import "../static/css/footer.scss";

import "animate.css"
import Apis, { endpoints } from "../configs/Apis";
import { Dichvu } from "../interface/InterfaceCommon";
import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  const [dichvus, setDichvu] = useState<Dichvu[]>([]);


  const loadDichVu = async () => {
    try {
      const params = { limit: 7, page: 1 };
      const response = await Apis.get(endpoints.APIDichvu, { params });



      if (response.data && Array.isArray(response.data.data)) {
        setDichvu(response.data.data);


        // Sử dụng totalRecords từ API

      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setDichvu([]);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setDichvu([]);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await loadDichVu();
    };

    fetchData();
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);

  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // setIsVisible(true);
            observer.unobserve(entry.target);
          }
          // else {
          //   setIsVisible(false); // để khi scroll ra khỏi, lần sau vào lại sẽ trigger lại animation

          // }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  // Mở dialog và truyền dữ liệu


  return (
    <footer
      ref={sectionRef}
      className={`footer`}
    // className={`footer ${isVisible ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}
    >
      <div className="footer-content">
        {/* Cột 1: Về chúng tôi */}
        <div className="about footer-section">
          <h3 className="">Về chúng tôi</h3>
          <p className="company-name">CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU</p>
          <p>🏢 Cổng TT, Phường 1, TP. Vũng Tàu, Việt Nam</p>
          <p>
            <span className="shake-icon">📞</span> 0254. 3859 003 / 3852 185
          </p>
          <p>📧 vt@vungtauship.com</p>
        </div>

        {/* Cột 2: Dịch vụ cung cấp */}
        <div className="footer-section services">
          <h3>Dịch vụ cung cấp</h3>
          <ul>



            {dichvus.map((item, index) => (
              <li key={index}>
                <Link
                  to={`/dich-vu/detail/${item.id}`}
                  state={{ serviceItem: item }}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Liên kết nhanh */}
        <div className="footer-section links">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><Link to="/gioi-thieu-cong-ty">Giới thiệu</Link></li>
            <li><Link to="/tin-tuc">Tin tức</Link></li>
            {/* <li><a href="#">Tin tức</a></li> */}
            <li><a href="#">Thư viện ảnh</a></li>
            <li><a href="#">Thư viện video</a></li>
            <li><Link to="/gia-dich-vu">Bảng giá dịch vụ</Link></li>
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