import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "../static/css/footer.scss";
import "animate.css";
import Apis, { endpoints } from "../configs/Apis";
import { Dichvu } from "../interface/InterfaceCommon";
import { Link } from "react-router-dom";

interface Footer {
  id: number;
  company_name?: string;
  address?: string;
  fax?: string;
  email?: string;
  number_phone?: string;
  mst?: string;
  branch_name?: string;
}

const Footer: React.FC = () => {
  const [dichvus, setDichvu] = useState<Dichvu[]>([]);
  const [footers, setFooters] = useState<Footer[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const sectionRef = useRef<HTMLDivElement>(null);

  const loadDichVu = async () => {
    try {
      const params = { limit: 7, page: 1 };
      const response = await Apis.get(endpoints.APIDichvu, { params });
      if (response.data && Array.isArray(response.data.data)) {
        setDichvu(response.data.data);
      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setDichvu([]);
      }
    } catch (error) {
      console.error("Lỗi khi load dịch vụ:", error);
      setDichvu([]);
    }
  };

  const loadFooter = async () => {
    try {
      const params = { limit: 7, page: 1 };
      const response = await Apis.get(endpoints.APIFooter, { params });
      if (response.data && Array.isArray(response.data.data)) {
        setFooters(response.data.data);
      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setFooters([]);
      }
    } catch (error) {
      console.error("Lỗi khi load footer:", error);
      setFooters([]);
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([loadDichVu(), loadFooter()]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
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

  return (
    <footer ref={sectionRef} className="footer">
      <div className="footer-content">
        {/* Cột 1: Về chúng tôi */}
        <div className="about footer-section">
          <h3>Về chúng tôi</h3>
          {loading ? (
            <p>Đang tải...</p> // Show loading indicator
          ) : footers.length > 0 ? (
            <>
              <p className="company-name">{footers[0].company_name}</p>
              <p>🏢 {footers[0].address}</p>
              <p>
                <span className="shake-icon">📞</span> {footers[0].number_phone} - Fax: {footers[0].fax} - MST: {footers[0].mst}
              </p>
              <p>📧 {footers[0].email}</p>
            </>
          ) : (
            <p>Không có dữ liệu footer</p> // Fallback when no data
          )}
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
                  style={{ textDecoration: "none", color: "inherit" }}
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
            <li><a href="#">Thư viện ảnh</a></li>
            <li><a href="#">Thư viện video</a></li>
            <li><Link to="/gia-dich-vu">Bảng giá dịch vụ</Link></li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký bản tin */}
        <div className="footer-section newsletter">
          <h3>Đăng ký bản tin</h3>
          <p>Đăng ký để nhận các tin tức, sự kiện mới từ chúng tôi!</p>
          {/* <motion.div
            variants={item}
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white/5 p-4 rounded-2xl shadow-lg backdrop-blur-md flex items-center space-x-2"
          >
            <input
              type="email"
              placeholder="Nhập email..."
              required
              className="w-full p-3 bg-transparent border border-cyan-600/40 rounded-md text-white focus:ring-2 focus:ring-cyan-500 placeholder:text-slate-400"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-cyan-500 text-white font-semibold px-4 py-3 rounded-md shadow hover:bg-cyan-600 transition-all"
            >
              📩
            </motion.button>
          </motion.div> */}


          <div className="newsletter-container">
            <input type="email" className="newsletter-input" placeholder="Nhập email..." />
            <button className="newsletter-button">📩</button>
          </div>
          {/* <p className="text-center text-white mt-2">Tôi muốn liên hệ</p> */}

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
        © 2025 CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU

        <Link to="https://ftisg.com.vn/">   |     Phát triển bởi  <span style={{ "color": "#F0A500" }}>FTI SÀI GÒN</span></Link>
      </div>
    </footer>
  );
};

export default Footer;