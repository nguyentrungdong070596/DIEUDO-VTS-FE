import { useLocation } from "react-router-dom";
import Titlepage from "../components/Titlepage";
import "../static/css/danhsachhoatieu.scss";
import "../quill.custom.scss";
import "quill/dist/quill.snow.css"; // Import CSS của Quill
import "../static/css/servicedetail.scss";
import SidebarMenu from "../layout/Sidebar";
import Carousel2 from "../components/Carousel2";
// import Apis, { endpoints, SERVER } from '../configs/Apis';
import { useTranslation } from "react-i18next";
import { SERVER } from "../configs/Apis";
// import { useEffect, useState } from 'react';
// import { Dichvu } from '../interface/InterfaceCommon';
// import i18n from '../i18n';

const ServiceDetail = () => {
  const location = useLocation();
  const serviceItem = location.state?.serviceItem; // Lấy dữ liệu từ state
  const key = location.state?.key; // Lấy dữ liệu từ state
  // const [dichvus, setDichvu] = useState<Dichvu[]>([]);

  const { t } = useTranslation();

  // const loadDichVu = async () => {
  //     try {
  //         const params = { limit: 7, page: 1 };
  //         const response = await Apis.get(endpoints.APIDichvu, { params });

  //         if (response.data && Array.isArray(response.data.data)) {
  //             // Dịch 3 trường: title, subtitle, content
  //             for (const item of response.data.data) {
  //                 // Dịch title
  //                 // const vietnameseTitle = await translateWithGoogle(item.title, 'Vietnamese');
  //                 i18n.addResource('vi', 'translation', `title_dichvu_${item.id}`, item.title);
  //                 // const englishTitle = await translateWithGoogle(item.title, 'English');
  //                 i18n.addResource('en', 'translation', `title_dichvu_${item.id}`, item.title_en);

  //                 // Dịch subtitle
  //                 // const vietnameseSubtitle = await translateWithGoogle(item.subtitle, 'Vietnamese');
  //                 i18n.addResource('vi', 'translation', `subtitle_dichvu_${item.id}`, item.subtitle);
  //                 // const englishSubtitle = await translateWithGoogle(item.subtitle, 'English');
  //                 i18n.addResource('en', 'translation', `subtitle_dichvu_${item.id}`, item.subtitle_en);

  //                 // Dịch content
  //                 // const vietnameseContent = await translateWithGoogle(item.content, 'Vietnamese');
  //                 i18n.addResource('vi', 'translation', `content_dichvu_${item.id}`, item.content);
  //                 // const englishContent = await translateWithGoogle(item.content, 'English');
  //                 i18n.addResource('en', 'translation', `content_dichvu_${item.id}`, item.content_en);

  //             }
  //             setDichvu(response.data.data);

  //             // Sử dụng totalRecords từ API

  //         } else {
  //             console.error("Dữ liệu API không đúng định dạng:", response.data);
  //             setDichvu([]);
  //         }
  //     } catch (error) {
  //         console.error("Lỗi khi load hoa tiêu:", error);
  //         setDichvu([]);
  //     }
  // };

  // useEffect(() => {
  //     const fetchData = async () => {
  //         await loadDichVu();
  //     };

  //     fetchData();
  // }, []);
  // Nếu không có dữ liệu từ state, hiển thị thông báo
  if (!serviceItem) {
    return (
      <div className="gridme wide">
        <h2>Không tìm thấy tin tức</h2>
      </div>
    );
  }

  return (
    <>
      <Carousel2 name={t(`dichvu`)} />
      <div className="gridme wide">
        <div className="row">
          <SidebarMenu />
          <div className="col-custom l-9 m-12 c-12">
            <Titlepage name={t(`detail`)} />
            <div className="detail-news">
              <img
                src={`${SERVER}/${serviceItem.image}`}
                alt={serviceItem.title}
              />
              {/* <h2>{serviceItem.title}</h2> */}
              <h2>{t(`title_dichvu_${key}`)}</h2>
              {/* <p
                dangerouslySetInnerHTML={{ __html: serviceItem.content || "" }}
              ></p> */}

              <div className="ql-snow">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: (serviceItem.content || "")
                      .replace(/<br\s*\/?>/gi, "<br />")
                      .replace(/&nbsp;/g, " ") // ✅ Chuyển &nbsp; sang khoảng trắng thường
                      .replace(/(\w+)(?=\w{1,2}$)/gi, "$1\u200B") // 👈 Tùy chọn cải thiện xuống dòng (zero-width space)
                      .trim(),
                  }}
                />
              </div>
              {/* <span className='detail-news-postdate'>Ngày đăng: {serviceItem.postdate}</span> */}

              <span className="detail-news-postdate">
                {t("ngay")}:{" "}
                {new Date(serviceItem.postdate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </div>

        {/* <div className="row">
                    <div className="col-custom l-3"></div>

                    <div className="col-custom l-9 m-12 c-12">
                        <br />
                        <hr className='hrbaiviet' />
                        <Titlepage name="BÀI ĐĂNG LIÊN QUAN" />

                        <NewsListCarousel
                            items={dichvus}
                            imageBaseUrl={SERVER}
                        />
                    </div>
                </div> */}
      </div>
    </>
  );
};

export default ServiceDetail;
