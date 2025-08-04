import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Titlepage from "../components/Titlepage";
import "../static/css/danhsachhoatieu.scss";
import "../static/css/newsdetail.scss";
import "../quill.custom.scss";
import "quill/dist/quill.snow.css"; // Import CSS của Quill
import SidebarMenu from "../layout/Sidebar";
import Carousel2 from "../components/Carousel2";
import Apis, { endpoints, SERVER } from "../configs/Apis";
import NewsListCarousel from "../components/NewsListCarousel";
import { Tintuc } from "../interface/InterfaceCommon";
import FacebookComments from "../components/FacebookComment";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Newsdetail = () => {
  const location = useLocation();
  // const currentPageUrl = window.location.href;
  const newsItem = location.state?.newsItem; // Lấy dữ liệu từ state
  const key = location.state?.key; // Lấy dữ liệu từ state
  const [tintucs, setTintuc] = useState<Tintuc[]>([]);
  const { t } = useTranslation();

  const loadTintuc = async (page: number) => {
    try {
      const params = { limit: 1000, page: page };
      const response = await Apis.get(endpoints.APINews, { params });

      if (response.data && Array.isArray(response.data.data)) {
        for (const item of response.data.data) {
          // Dịch title
          // const vietnameseTitle = await translateWithGoogle(item.title, 'Vietnamese');
          i18n.addResource(
            "vi",
            "translation",
            `title_tintuc_${item.id}`,
            item.title,
          );
          // const englishTitle = await translateWithGoogle(item.title, 'English');
          i18n.addResource(
            "en",
            "translation",
            `title_tintuc_${item.id}`,
            item.title_en,
          );

          // Dịch subtitle
          // const vietnameseSubtitle = await translateWithGoogle(item.subtitle, 'Vietnamese');
          i18n.addResource(
            "vi",
            "translation",
            `subtitle_tintuc_${item.id}`,
            item.subtitle,
          );
          // const englishSubtitle = await translateWithGoogle(item.subtitle, 'English');
          i18n.addResource(
            "en",
            "translation",
            `subtitle_tintuc_${item.id}`,
            item.subtitle_en,
          );

          // Dịch content
          // const vietnameseContent = await translateWithGoogle(item.content, 'Vietnamese');
          i18n.addResource(
            "vi",
            "translation",
            `content_tintuc_${item.id}`,
            item.content,
          );
          // const englishContent = await translateWithGoogle(item.content, 'English');
          i18n.addResource(
            "en",
            "translation",
            `content_tintuc_${item.id}`,
            item.content_en,
          );
        }

        setTintuc(response.data.data);
        // Sử dụng totalRecords từ API
        // const total = response.data.totalRecords || response.data.data.length;
        // setTotalItems(total);
      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setTintuc([]);
        // setTotalItems(0);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setTintuc([]);
      // setTotalItems(0);
    }
  };
  useEffect(() => {
    loadTintuc(1);
  }, [1]);

  // Nếu không có dữ liệu từ state, hiển thị thông báo
  if (!newsItem) {
    return (
      <div className="gridme wide">
        <h2>Không tìm thấy tin tức</h2>
      </div>
    );
  }

  return (
    <>
      {/* <Carousel2 name="TIN TỨC" /> */}
      <Carousel2 name={t("newsAndEvent")} />
      <div className="gridme wide">
        <div className="row">
          <SidebarMenu />
          <div className="col-custom l-9 m-12 c-12">
            <Titlepage name={t("detail")} />
            <div className="detail-news">
              <img src={`${SERVER}/${newsItem.image}`} alt={newsItem.title} />
              {/* <h2>{newsItem.title}</h2> */}
              <h2> {t(`title_tintuc_${key}`)}</h2>
              {/* <p dangerouslySetInnerHTML={{ __html: newsItem.content || "" }} ></p> */}
              <p
                dangerouslySetInnerHTML={{
                  __html: t(`content_tintuc_${key}`) || "",
                }}
              ></p>
              {/* <span className='detail-news-postdate'>Ngày đăng: {newsItem.postdate}</span> */}

              <span className="detail-news-postdate">
                {t("ngay")}:{" "}
                {new Date(newsItem.postdate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-custom l-3"></div>

          <div className="col-custom l-9 m-12 c-12">
            {/* <FacebookComments url={currentPageUrl} /> */}
            <FacebookComments url="https://www.vungtauship.com/" />
            <br />
            <hr className="hrbaiviet" />
            {/* <Titlepage name="BÀI ĐĂNG LIÊN QUAN" /> */}

            <Titlepage name={t("baidanglienquan")} />

            <NewsListCarousel
              items={tintucs} // Tintuc[]
              // onItemClick={handleOpenDialog} // (item: Tintuc) => void
              imageBaseUrl={SERVER}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsdetail;
