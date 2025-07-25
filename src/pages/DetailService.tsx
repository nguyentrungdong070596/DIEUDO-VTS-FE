import Titlepage from "../components/Titlepage";
import "../static/css/danhsachhoatieu.scss";
import SidebarMenu from "../layout/Sidebar";
import news1 from "../static/img/tau2.png";
import "../quill.custom.scss";
import "quill/dist/quill.snow.css"; // Import CSS của Quill
import Carousel2 from "../components/Carousel2";
import "../static/css/newsdetail.scss";

const DetailService = () => {
  return (
    <>
      <Carousel2 name="DỊCH VỤ" />
      <div className="gridme wide">
        <div className="row">
          <SidebarMenu />

          <div className="col-custom l-9 m-12 c-12">
            <Titlepage name="Chi tiết dịch vụ" />

            <div className="detail-news">
              <img src={news1} alt="hình chi tiết" />
              <p>
                Đội ngũ hoa tiêu 100% Hoa Tiêu tốt nghiệp khoa Điều Khiển Tàu
                Biển trường Đại Học Hàng Hải...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailService;
