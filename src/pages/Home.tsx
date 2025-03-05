import React from "react";
import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import Carousel from "../components/Carousel";
import "../static/css/home.scss";
import { Button } from "@mui/material";
import Footer from "../layout/Footer";
import ItemService from "../components/ItemService";
import giadichvu1 from '../static/img/giadichvu1.png'
import giadichvu2 from '../static/img/giadichvu2.png'
import giadichvu3 from '../static/img/giadichvu3.png'
import giadichvu4 from '../static/img/giadichvu4.png'
import giadichvu6 from '../static/img/giadichvu6.png'
import dichvudailyimg from '../static/img/dichvudaily.png'
import Itemgiadichvu from "../components/Itemgiadichvu";
import "../static/css/itemservice.scss";
import "../static/css/gridme.scss";
import { Link } from "react-router-dom";

const giaDichVuList = [
  { Id: 1, name: 'HOA TIÊU HÀNG HẢI', desc: 'Đội ngũ hoa tiêu 100% Hoa Tiêu tốt nghiệp khoa Điều Khiển Tàu Biển trường Đại Học Hàng Hải...', img: giadichvu6 },
  { Id: 2, name: 'DỊCH VỤ XẾP DỠ VÀ VẬN TẢI HÀNG HÓA', desc: 'Xếp dỡ hàng hóa tại cảng, tại kho hàng: nông sản, than, phế liệu, clinke…; hàng siêu trường, hàng thiết bị chuyên dụng dầu khí, điện gió. -', img: giadichvu2 },
  { Id: 3, name: 'XUẤT NHẬP KHẨU HÀNG HÓA', desc: '- Đại lý Hải quan hàng hóa Xuất nhập khẩu: Bà Rịa – Vũng Tàu, Tp.Hồ Chí Minh, Đồng Nai, Bình Dương, Long An…', img: giadichvu3 },
  { Id: 4, name: 'CHO THUÊ CANO,TÀU', desc: 'Dịch vụ cano: Đưa đón thuyền viên, hành khách, chuyên gia, nhà thầu và trang thiết bị, phụ tùng: vùng neo Vũng Tàu, Sông Dinh; luồng hàng hải', img: giadichvu2 },
  { Id: 5, name: 'Thi công các công trình, dự án hàng hải', desc: ' Nạo vét duy tu luồng hàng hải, vùng nước trước cảng, bến phao… - Quản lý, tư vấn các dự án hàng hải. ', img: giadichvu6 },
  { Id: 6, name: 'Dịch vụ đại lý tàu biển', desc: '- Dịch vụ đại lý tàu biển', img: dichvudailyimg },

];
const Home = () => {
  return (
    <>
      <Carousel />

      <div className="gridme wide about">
        <div className="row about-flex">
          <div className="flex col-custom l-6 m-12 c-12 overflow-hidden h-[500px] relative">
            <div className="left-about flex flex-col gap-4 animate-[marquee-up_10s_linear_infinite]">
              {/* Nhân đôi danh sách ảnh để tạo hiệu ứng liên tục */}
              <div className="item-about"><img src="/tau1.png" className="w-full h-auto" /></div>
              <div className="item-about"><img src="/tau2.png" className="w-full h-auto" /></div>
              <div className="item-about"><img src="/tau1.png" className="w-full h-auto" /></div>
              <div className="item-about"><img src="/tau2.png" className="w-full h-auto" /></div>
              <div className="item-about"><img src="/tau1.png" className="w-full h-auto" /></div>
              <div className="item-about"><img src="/tau2.png" className="w-full h-auto" /></div>

              {/* Lặp lại ảnh để tạo vòng cuộn liên tục */}
              <div className="item-about"><img src="/tau1.png" className="w-full h-auto" /></div>
              <div className="item-about"><img src="/tau2.png" className="w-full h-auto" /></div>
              <div className="item-about"><img src="/tau1.png" className="w-full h-auto" /></div>
              <div className="item-about"><img src="/tau2.png" className="w-full h-auto" /></div>
            </div>
          </div>





          <div className="col-custom l-6 m-12 c-12">
            <div className="right-about">
              <h2 className="title-right-box">Về chúng tôi</h2>
              <p style={{ textAlign: "justify" }}>
                Công ty Dịch vụ và Vận tải biển Vũng Tàu (VUNGTAUSHIP) được thành lập ngày 10/02/1990 theo quyết định của UBND Đặc khu Vũng Tàu Côn Đảo. Công ty được thành lập lại là Doanh nghiệp nhà nước theo Quyết định số 12/QĐ-UBT ngày 27/11/1992 của UBND tỉnh Bà Rịa – Vũng Tàu với vốn điều lệ ban đầu là: 7.467.638.393 đồng.

                Từ một doanh nghiệp Nhà nước trực thuộc Sở Giao thông Vận tải tỉnh với hoạt động ban đầu chỉ là cung ứng tàu biển và dịch vụ hàng hải, VUNGTAUSHIP đã dần mở rộng kinh doanh, phát triển thêm nhiều hoạt động dịch vụ mới như logistics, hoạt động hoa tiêu hàng hải, cung ứng và quản lý nguồn nhân lực, kinh doanh dịch vụ khách sạn và mở rộng hoạt động ra nhiều tỉnh thành khác như TPHCM, Hà Nội, Đồng Nai, Kiên Giang đạt được hiệu quả kinh tế cao trong nhiều năm liền, nhận được nhiều bằng khen của tỉnh Bà Rịa - Vũng Tàu và Bộ Giao thông Vận tải. Năm 2004, VUNGTAUSHIP vinh dự nhận được Huân chương Lao động hạng Nhất do Thủ tướng Chính phủ trao tặng...
              </p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "gold",
                  color: "black",
                  "&:hover": { backgroundColor: "darkgoldenrod" },
                }}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="serviceofus gridme wide">
        <div className="row">
          <div className="sec-title col-custom l-12 m-12 c-12">
            <h2 className="text-[#007CF9] text-2xl md:text-2xl font-extrabold uppercase">
              DỊCH VỤ CỦA CHÚNG TÔI
            </h2>

            <p>Cung cấp các giải pháp thực tế, nhanh chóng thực sự tiết kiệm</p>
          </div>
        </div>

        <div className="row service-itemes">
          {giaDichVuList.map((item, index) => (
            // <Link key={index} to={`/dich-vu/${item.Id}`} className=" col-custom l-4 m-12 c-12" style={{
            //   textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: "inherit"
            // }}>
            < ItemService key={index} name={item.name} desc={item.desc} img={item.img} />
            // </Link>
          ))}
        </div>

        {/* <div className="row service-itemes">
          <ItemService name={name} />
          <ItemService />




        </div> */}
      </div >




      <div className="serviceofus gridme wide">
        <div className="row">
          <div className="sec-title col-custom l-12 m-12 c-12">
            <h2 className="text-[#007CF9] text-2xl md:text-2xl font-extrabold uppercase">
              TIN TỨC & SỰ KIỆN
            </h2>
            <p>Tin tức và các sự kiện mới nhất của chúng tôi</p>
          </div>
        </div>

        <div className=" news-itemes">

          {/* 
          <div className="news-item col-custom l-4 m-6 c-12">
            <img src="/tau1.png" alt="" />
            <p className="news-time">2/2/2024</p>
            <p className="news-time">Hội Nghị Người Lao Động Năm 2022.</p>

            <Button>ĐỌC THÊM</Button>
          </div>


          <div className="news-item col-custom l-4 m-6 c-12">
            <img src="/tau1.png" alt="" />
            <p className="news-time">2/2/2024</p>
            <p className="news-time">Hội Nghị Người Lao Động Năm 2022.</p>

            <Button>ĐỌC THÊM</Button>
          </div>


          <div className="news-item col-custom l-4 m-6 c-12">
            <img src="/tau1.png" alt="" />
            <p className="news-time">2/2/2024</p>
            <p className="news-time">Hội Nghị Người Lao Động Năm 2022.</p>

            <Button>ĐỌC THÊM</Button>
          </div> */}

          {giaDichVuList.map((item, index) => (
            <Itemgiadichvu key={index} name={item.name} desc={item.desc} img={item.img} />
          ))}
        </div>
      </div>


    </>
  );
};

export default Home;
