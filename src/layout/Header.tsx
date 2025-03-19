import React, { useEffect, useRef, useState } from "react";
// import "../static/css/gridme.scss";
import "../static/css/header.scss";
import logo from "../static/img/logo.png";
import vn from "../static/img/vn.png";
import eng from "../static/img/eng.png";
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { FaSearch } from "react-icons/fa"; // Import biểu tượng tìm kiếm từ FontAwesome
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import { useTranslation } from "react-i18next";


interface HeaderProps {
  onSearch?: (keyword: string) => void;
}


const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { t, i18n } = useTranslation();

  const [searchText, setSearchText] = useState('');
  const { setKeyword } = useSearchContext();
  const location = useLocation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (location.pathname === '/') {
        setKeyword(searchText); // Gửi từ khóa cho Home
      }
      setSearchText('');
    }
  };
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };


  return (
    <div className="header     gridme">
      {/* Thanh Header */}
      <div className="   header-container row  ">
        <div className="col-custom l-1 m-12 c-12 " >

          <img
            src={logo}
            width={50}
            height={50}
            alt="Logo"
            className="header-logo  animate__animated animate__backInDown   "

          />
        </div>

        <div className="header-text col-custom l-4 m-12 c-12">
          <p className="company-name animate__animated animate__bounceIn ">
            {t('companyName')}
          </p>
          <p className="branch-name animate__animated animate__backInUp  ">{t('branchName')}</p>
        </div>

        {/* 🔍 Thanh tìm kiếm có icon */}
        <div className="search-box">
          <FaSearch className="search-icon" /> {/* Sử dụng FaSearch */}
          <input
            type="text"
            placeholder={t('searchPlacehoder')}
            className="search-input"

            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Avatar */}
        {/* <div className="changelanguage col-custom l-1 m-2 c-2">
          <img src={vn} alt="VN" className="avatar vietnam  " />
          <img src={eng} alt="ENG" className="avatar english" />
        </div> */}

        <div className="changelanguage col-custom l-1 m-2 c-2">
          <img
            src={vn}
            alt="VN"
            className="avatar vietnam"
            onClick={() => changeLanguage("vi")}
            style={{ cursor: "pointer" }}
          />
          <img
            src={eng}
            alt="ENG"
            className="avatar english"
            onClick={() => changeLanguage("en")}
            style={{ cursor: "pointer" }}
          />
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
