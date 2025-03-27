import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../static/css/carousel.scss";
import Apis, { endpoints, SERVER } from "../configs/Apis";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import "animate.css"
import { useTranslation } from "react-i18next";
import { LinkDathangdichvu } from "../interface/InterfaceCommon";

function Carousel() {


  const [link, setLink] = useState<LinkDathangdichvu[]>([]);

  const [banner, setBanner] = React.useState<any[]>([]); // Thêm kiểu dữ liệu
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  // useEffect(() => {
  //   // Giả lập API loading
  //   setTimeout(() => setLoading(false), 2000);
  // }, []);


  const loadLinkDathangdichvu = async () => {
    try {
      const params = { limit: 1000, page: 1, itemType: "10" };
      const response = await Apis.get(endpoints.APIItems, { params });



      if (response.data && Array.isArray(response.data.data)) {
        setLink(response.data.data);


        // Sử dụng totalRecords từ API

      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setLink([]);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setLink([]);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await loadLinkDathangdichvu();
    };

    fetchData();
  }, []);
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
      const response = await Apis.get(endpoints.APICarousel, { params: item });



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




  // Cấu hình slider với xử lý trường hợp chỉ có 1 slide
  const settings = {
    dots: false,
    infinite: banner.length > 1, // Chỉ bật infinite khi có nhiều hơn 1 slide
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: banner.length > 1, // Chỉ tự động chạy khi có nhiều hơn 1 slide
    autoplaySpeed: 3000,
    pauseOnHover: false,
    // arrows: banner.length > 1, // Chỉ hiển thị mũi tên khi có nhiều hơn 1 slide
  };


  return (


    <div>
      <div className="carousel-container ">
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
              <h2 className="company-title">{t('companyName')}</h2>
              <h3 className="enterprise-title">{t('branchName')}</h3>

              <div className="carousel-buttons">
                {/* <Link to="/dat-hang-dich-vu"> */}
                <Link to={link[0]?.title}>
                  <button className="btn primary-btn">{t('orderService')}</button>

                </Link>
                <Link to="/ke-hoach-dan-tau">
                  <button className="btn secondary-btn">{t('plan')}</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>


  );
}

export default Carousel;
