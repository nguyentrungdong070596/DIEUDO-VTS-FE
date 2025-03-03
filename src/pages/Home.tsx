import React from "react";
import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import Carousel from "../components/Carousel";
import "../static/css/home.scss";
import { Button } from "@mui/material";
import Footer from "../layout/Footer";
import ItemService from "../components/ItemService";

const Home = () => {
  return (
    <>
      <Carousel />

      <div className="gridme wide about">
        <div className="row about-flex">
          <div className="flex col-custom l-6 m-12 c-12 overflow-hidden h-[300px] relative">
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
              <p>
                Xí nghiệp Hoa tiêu Vũng Tàu là đơn vị trực thuộc Công ty CP Dịch
                vụ và Vận tải biển Vũng Tàu, có bề dày kinh nghiệm hoạt động
                trong lĩnh vực hoa tiêu hàng hải. Xí nghiệp Hoa tiêu Vũng Tàu
                được thành lập theo Quyết định số 236/QĐ-UBT ngày 5/5/1995 của
                UBND tỉnh BRVT. Theo Quyết định số 813/QĐ-CHHVN ngày 01/01/2012,
                Xí nghiệp Hoa tiêu Vũng Tàu thực hiện nhiệm vụ cung cấp dịch vụ
                hoa
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
          <ItemService />
          <ItemService />



          <div className="service-item col-custom l-4 m-12 c-12">
            <img src="/tau1.png" />

            <div className="service-info">
              <p className="service-name">Hoa Tiêu Hàng Hải</p>
              <p className="service-content">Đại lý Hải quan hàng hóa Xuất nhập khẩu : Bà Rịa - Vũng Tàu , Tp.Hồ Chí Minh, Đồng Nai , Bình Dương , Long An.</p>
              <a className="service-button-detail" href="#">XEM CHI TIẾT</a>

            </div>
          </div>


          <div className="service-item col-custom l-4 m-12 c-12">
            <img src="/tau1.png" />

            <div className="service-info">
              <p className="service-name">Hoa Tiêu Hàng Hải</p>
              <p className="service-content">Đại lý Hải quan hàng hóa Xuất nhập khẩu : Bà Rịa - Vũng Tàu , Tp.Hồ Chí Minh, Đồng Nai , Bình Dương , Long An.</p>
              <a className="service-button-detail" href="#">XEM CHI TIẾT</a>

            </div>
          </div>
        </div>
      </div>




      <div className="serviceofus gridme wide">
        <div className="row">
          <div className="sec-title col-custom l-12 m-12 c-12">
            <h2 className="text-[#007CF9] text-2xl md:text-2xl font-extrabold uppercase">
              TIN TỨC & SỰ KIỆN
            </h2>
            <p>Tin tức và các sự kiện mới nhất của chúng tôi</p>
          </div>
        </div>

        <div className="row news-itemes">


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
          </div>
        </div>
      </div>


    </>
  );
};

export default Home;
