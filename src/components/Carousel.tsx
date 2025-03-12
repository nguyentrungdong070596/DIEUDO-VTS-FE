import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../static/css/carousel.scss";
import Apis, { endpoints, SERVER } from "../configs/Apis";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
type BannerItem = {
  image: string; // Định nghĩa `image`
};
function Carousel() {


  const images = ["/tau1.png", "/tau2.png", "/tau3.png"];

  const [banner, setBanner] = React.useState<any[]>([]); // Thêm kiểu dữ liệu
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Giả lập API loading
  //   setTimeout(() => setLoading(false), 2000);
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      await loadBanner();
    };

    fetchData();
  }, []);

  // Theo dõi thay đổi của banner
  useEffect(() => {

  }, [banner]);

  const loadBanner = async () => {
    try {
      setLoading(true)
      const item = { limit: 10, page: 1, itemType: "0" };
      let response = await Apis.get(endpoints.APICarousel, { params: item });



      if (response.data && Array.isArray(response.data.data)) {
        setLoading(false)
        setBanner(response.data.data); // Lưu mảng `data` vào state
      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setBanner([]);
      }
    } catch (error) {
      console.error("Lỗi khi load banner:", error);
      setBanner([]);
    }
  };




  const settings = {
    dots: false,         // Không hiển thị các chấm điều hướng
    infinite: true,      // Lặp vô hạn
    speed: 500,         // Thời gian chuyển đổi giữa các ảnh (ms)
    slidesToShow: 1,     // Hiển thị 1 ảnh mỗi lần
    slidesToScroll: 1,   // Cuộn 1 ảnh mỗi lần
    autoplay: true,      // Bật tự động chạy slider
    autoplaySpeed: 3000, // Chuyển đổi ảnh sau mỗi 3 giây
    pauseOnHover: false, // Không dừng khi di chuột vào slider
  };


  return (
    // <div className="carousel-container">
    //   {loading ? <Spinner /> : <div>Dữ liệu đã load xong!</div>}

    //   <Slider {...settings}>
    //     {Array.isArray(banner) && banner.map((item, index) => (
    //       <div key={index} className="carousel-slide">
    //         <img
    //           src={`${SERVER}/${item.image}`}
    //           alt={`Slide ${index + 1}`}
    //           className="carousel-image"
    //         />
    //       </div>
    //     ))}
    //   </Slider>



    //   {/* Overlay nội dung */}
    //   <div className="carousel-overlay">
    //     <h2 className="company-title">CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU</h2>
    //     <h3 className="enterprise-title">XÍ NGHIỆP HOA TIÊU VŨNG TÀU</h3>

    //     <div className="carousel-buttons">
    //       <Link to="/dat-hang-dich-vu">  <button className="btn primary-btn">ĐẶT HÀNG DỊCH VỤ</button></Link>
    //       <Link to="/ke-hoach-dan-tau">   <button className="btn secondary-btn">KẾ HOẠCH DẪN TÀU</button></Link>
    //     </div>
    //   </div>
    // </div>


    <div className="carousel-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Slider {...settings}>
            {Array.isArray(banner) && banner.map((item, index) => (
              <div key={index} className="carousel-slide">
                <img
                  src={`${SERVER}/${item.image}`}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </Slider>

          {/* Overlay nội dung */}
          <div className="carousel-overlay">
            <h2 className="company-title">CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU</h2>
            <h3 className="enterprise-title">XÍ NGHIỆP HOA TIÊU VŨNG TÀU</h3>

            <div className="carousel-buttons">
              <Link to="/dat-hang-dich-vu">
                <button className="btn primary-btn">ĐẶT HÀNG DỊCH VỤ</button>
              </Link>
              <Link to="/ke-hoach-dan-tau">
                <button className="btn secondary-btn">KẾ HOẠCH DẪN TÀU</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>

  );
}

export default Carousel;
