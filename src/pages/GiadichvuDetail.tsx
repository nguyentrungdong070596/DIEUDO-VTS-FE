import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Titlepage from "../components/Titlepage";
import "../static/css/danhsachhoatieu.scss";
import "../static/css/dichvudetail.scss";
import "../quill.custom.scss";
import "quill/dist/quill.snow.css"; // Import CSS của Quill
import SidebarMenu from "../layout/Sidebar";
import Carousel2 from "../components/Carousel2";
import Apis, { endpoints, SERVER } from "../configs/Apis";
import { GiaDichVu } from "../interface/InterfaceCommon";
import GiaDichVuListCarousel from "../components/GiaDichVuListCarousel";
import { FaHandPointRight } from "react-icons/fa";
import { AiFillFilePdf, AiFillFileWord } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const GiadichvuDetail = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const giadichvuItem = location.state?.giadichvuItem; // Lấy dữ liệu từ state
  const key = location.state?.key; // Lấy dữ liệu từ state
  const [giadichvus, setGiaDichVu] = useState<GiaDichVu[]>([]);

  const loadGiadichvu = async () => {
    try {
      const params = { limit: 1000, page: 1 };
      const response = await Apis.get(endpoints.APIServicePrice, { params });

      if (response.data && Array.isArray(response.data.data)) {
        // Dịch 3 trường: title, subtitle, content
        for (const item of response.data.data) {
          // Dịch title
          // const vietnameseTitle = await translateWithGoogle(item.title, 'Vietnamese');
          i18n.addResource(
            "vi",
            "translation",
            `title_giadichvu_${item.id}`,
            item.title,
          );
          // const englishTitle = await translateWithGoogle(item.title, 'English');
          i18n.addResource(
            "en",
            "translation",
            `title_giadichvu_${item.id}`,
            item.title_en,
          );

          // Dịch subtitle
          // const vietnameseSubtitle = await translateWithGoogle(item.subtitle, 'Vietnamese');
          i18n.addResource(
            "vi",
            "translation",
            `subtitle_giadichvu_${item.id}`,
            item.subtitle,
          );
          // const englishSubtitle = await translateWithGoogle(item.subtitle, 'English');
          i18n.addResource(
            "en",
            "translation",
            `subtitle_giadichvu_${item.id}`,
            item.subtitle_en,
          );

          // Dịch content
          // const vietnameseContent = await translateWithGoogle(item.content, 'Vietnamese');
          i18n.addResource(
            "vi",
            "translation",
            `content_giadichvu_${item.id}`,
            item.content,
          );
          // const englishContent = await translateWithGoogle(item.content, 'English');
          i18n.addResource(
            "en",
            "translation",
            `content_giadichvu_${item.id}`,
            item.content_en,
          );
        }

        setGiaDichVu(response.data.data);
        // Sử dụng totalRecords từ API
        // setTotalItems(total);
      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setGiaDichVu([]);
        // setTotalItems(0);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setGiaDichVu([]);
      // setTotalItems(0);
    }
  };
  useEffect(() => {
    loadGiadichvu();
  }, [1]);

  // Nếu không có dữ liệu từ state, hiển thị thông báo
  if (!giadichvuItem) {
    return (
      <div className="gridme wide">
        <h2>Không tìm thấy tin tức</h2>
      </div>
    );
  } else {
  }
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* <Carousel2 name="BẢNG GIÁ DỊCH VỤ" /> */}
      <Carousel2 name={t("servicePrice")} />
      <div className="gridme wide">
        <div className="row">
          <SidebarMenu />
          <div className="col-custom m-12 c-12 l-9">
            {/* <Titlepage name="Chi tiết" /> */}
            <Titlepage name={t("detail")} />
            <div className="detail-dichvu">
              {/* <h2>{giadichvuItem.title}</h2> */}
              <h2>{t(`title_giadichvu_${key}`)}</h2>

              {/* <p dangerouslySetInnerHTML={{ __html: giadichvuItem.content || "" }} ></p> */}
              {/* <p
                dangerouslySetInnerHTML={{
                  __html: t(`content_giadichvu_${key}`) || "",
                }}
              ></p> */}

              <div className="ql-snow">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html:
                      t(`content_giadichvu_${key}`) ||
                      ""
                        .replace(/<br\s*\/?>/gi, "<br />")
                        .replace(/&nbsp;/g, " ") // ✅ Chuyển &nbsp; sang khoảng trắng thường
                        .replace(/(\w+)(?=\w{1,2}$)/gi, "$1\u200B") // 👈 Tùy chọn cải thiện xuống dòng (zero-width space)
                        .trim(),
                  }}
                />
              </div>
              {/* <span className='detail-dichvu-postdate'>Ngày đăng: {dichvuItem.postdate}</span> */}

              <img
                className="img-giadichvu"
                src={`${SERVER}/${giadichvuItem.image}`}
                alt={giadichvuItem.image}
              />

              <span className="detail-dichvu-postdate">
                {t("ngay")}:{" "}
                {new Date(giadichvuItem.postdate).toLocaleDateString("vi-VN")}
              </span>

              <div className="attention-wrapper">
                {/* <span className="hand-pointer">👉</span> */}

                <span className="hand-pointer">
                  <FaHandPointRight />
                </span>

                <a
                  href={`${SERVER}/${giadichvuItem.pdfurl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pdf-link"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="btn-content">
                    {isHovered ? (
                      <>
                        <AiFillFileWord className="btn-icon" />
                        <span className="btn-text">Xem Word</span>
                      </>
                    ) : (
                      <>
                        <AiFillFilePdf className="btn-icon" />
                        <span className="btn-text">Xem PDF</span>
                      </>
                    )}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-custom l-3"></div>

          <div className="col-custom m-12 c-12 l-9">
            <br />
            <hr className="hrbaiviet" />
            <Titlepage name={t("baidanglienquan")} />

            <GiaDichVuListCarousel
              items={giadichvus} // Tintuc[]
              // onItemClick={handleOpenDialog} // (item: Tintuc) => void
              imageBaseUrl={SERVER}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GiadichvuDetail;
