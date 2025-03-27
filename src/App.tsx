import { useState } from "react";
import Header from "./layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import Kehoachdantau from "./pages/Kehoachdantau";
import Giodieudong from "./pages/Giodieudong";
import Dathangdichvu from "./pages/Dathangdichvu";
import Giadichvu from "./pages/Giadichvu";
import Danhsachhoatieu from "./pages/Danhsachhoatieu";
import Vunghoatieu from "./pages/Vunghoatieu";
import News from "./pages/News";
import Newsdetail from "./pages/Newsdetail";
import Hethongcangbien from "./pages/Hethongcangbien";
import Tuyenluong from "./pages/Tuyenluong";
import Tuyenluongthivai from "./pages/Tuyenluongthivai";
import Tuyenluongsongdinh from "./pages/Tuyenluongsongdinh";
import ScrollToTop from "./components/ScrollToTop";
import Vitridontrahoatieu from "./pages/Vitridoantrahoatieu";
import Gioithieucongty from "./pages/Gioithieucongty";
import GiadichvuDetail from "./pages/GiadichvuDetail";
import Lichthuytrieu from "./pages/Lichthuytrieu";
import { SearchContext } from "./context/SearchContext";
// index.tsx hoặc App.tsx

// main.tsx hoặc index.css
import 'leaflet/dist/leaflet.css';

import './i18n';
import ServiceDetail from "./pages/ServiceDetail";
import Danhsachphuongtien from "./pages/Danhsachphuongtien";
import GoToTopButton from "./components/GototopButton";
import Hoatdongcongty from "./pages/Hoatdongcongty";
import HoatdongcongtyDetail from "./pages/HoatdongcongtyDetail";

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div style={{ zoom: '90%' }}>
      <BrowserRouter >

        {/* <div className="bg-green-500 p-5 text-center text-white">
  Tailwind hoạt động!
</div> */}
        <SearchContext.Provider value={{ keyword, setKeyword }}>
          <ScrollToTop />
          <Header />
          <Routes>


            <Route path="/" element={<Home />} />
            <Route path="/ke-hoach-dan-tau" element={<Kehoachdantau />} />
            <Route path="/gio-dieu-dong" element={<Giodieudong />} />
            <Route path="/dat-hang-dich-vu" element={<Dathangdichvu />} />
            <Route path="/gia-dich-vu" element={<Giadichvu />} />
            <Route path="/danh-sach-hoa-tieu" element={<Danhsachhoatieu />} />
            <Route path="/vung-hoa-tieu" element={<Vunghoatieu />} />
            <Route path="/tin-tuc" element={<News />} />
            <Route path="/tin-tuc/detail/:id" element={<Newsdetail />} />
            <Route path="/danh-sach-phuong-tien" element={<Danhsachphuongtien />} />

            <Route path="/gia-dich-vu/detail/:id" element={<GiadichvuDetail />} />
            {/* <Route path="/dich-vu/:id" element={<DetailService />} /> */}
            <Route path="/dich-vu/detail/:id" element={<ServiceDetail />} />
            <Route path="/he-thong-cang-bien" element={<Hethongcangbien />} />
            <Route path="/tuyen-luong" element={<Tuyenluong />} />
            <Route path="/tuyen-luong-thi-vai" element={<Tuyenluongthivai />} />
            <Route path="/tuyen-luong-song-dinh" element={<Tuyenluongsongdinh />} />
            <Route path="/vi-tri-don-tra-hoa-tieu" element={<Vitridontrahoatieu />} />
            <Route path="/gioi-thieu-cong-ty" element={<Gioithieucongty />} />
            <Route path="/lich-thuy-trieu" element={<Lichthuytrieu />} />
            <Route path="/hoat-dong-cong-ty" element={<Hoatdongcongty />} />
            <Route path="/hoat-dong-cong-ty/detail/:id" element={<HoatdongcongtyDetail />} />
          </Routes>
          <Footer />
          <GoToTopButton /> {/* Nút này sẽ hiển thị ở tất cả các trang */}

        </SearchContext.Provider>


      </BrowserRouter>
    </div>



  );
}

export default App;
