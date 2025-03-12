import React from "react";
// import "../static/css/gridme.scss";
import "../static/css/header.scss";
import logo from "../static/img/logo.png";
import vn from "../static/img/vn.png";
import eng from "../static/img/eng.png";
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { FaSearch } from "react-icons/fa"; // Import biểu tượng tìm kiếm từ FontAwesome
import Navbar from "./Navbar";

const Header: React.FC = () => {

  return (
    <div className="header gridme">
      {/* Thanh Header */}
      <div className="header-container row">
        <div className="col-custom l-1 m-12 c-12" >

          <img
            src={logo}
            width={50}
            height={50}
            alt="Logo"
            className="header-logo "
          />
        </div>

        <div className="header-text col-custom l-4 m-12 c-12">
          <p className="company-name">
            CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU
          </p>
          <p className="branch-name ">XÍ NGHIỆP HOA TIÊU VŨNG TÀU</p>
        </div>

        {/* 🔍 Thanh tìm kiếm có icon */}
        <div className="search-box">
          <FaSearch className="search-icon" /> {/* Sử dụng FaSearch */}
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="search-input"
          />
        </div>

        {/* Avatar */}
        <div className="changelanguage col-custom l-1 m-2 c-2">
          <img src={vn} alt="VN" className="avatar vietnam  " />
          <img src={eng} alt="ENG" className="avatar english" />
        </div>
      </div>

      {/* Thanh menu */}

      <Navbar />
      {/* <div className="nav-menu">
        <div className="menu-items">
          <div className="item-menu">
            <span>TRANG CHỦ</span>
          </div>
          <div className="item-menu">
            <span>KẾ HOẠCH DẪN TÀU</span>
          </div>
          <div className="item-menu">
            <span>GIỜ ĐIỀU ĐỘNG & MỚN NƯỚC</span>
          </div>
          <div className="item-menu">
            <span>ĐẶT HÀNG DỊCH VỤ</span>
          </div>
          <div className="item-menu">
            <span>GIÁ DỊCH VỤ</span>
          </div>
          <div className="item-menu">
            <span>DANH SÁCH HOA TIÊU</span>
          </div>
          <div className="item-menu">
            <span>THÔNG SỐ KỸ THUẬT</span>
          </div>
        </div>
      </div> */}
    </div >
  );
};

export default Header;
