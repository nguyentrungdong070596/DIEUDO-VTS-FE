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
import { AiFillFilePdf, AiFillFileWord } from "react-icons/ai";
import { FaHandPointRight } from "react-icons/fa";

// ✅ Component con hiển thị từng link PDF/Word
const HoverableLink = ({ url }: { url: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileName = url.trim();
  const fullUrl = `${SERVER}/${fileName}`;

  return (
    <a
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-pdf-link"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: "inline-block", marginRight: "10px" }}
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
  );
};

const Newsdetail = () => {
  const location = useLocation();
  const newsItem = location.state?.newsItem;
  const key = location.state?.key;
  const [tintucs, setTintuc] = useState<Tintuc[]>([]);
  const { t } = useTranslation();

  const loadTintuc = async (page: number) => {
    try {
      const params = { limit: 1000, page: page };
      const response = await Apis.get(endpoints.APINews, { params });

      if (response.data && Array.isArray(response.data.data)) {
        for (const item of response.data.data) {
          i18n.addResource(
            "vi",
            "translation",
            `title_tintuc_${item.id}`,
            item.title,
          );
          i18n.addResource(
            "en",
            "translation",
            `title_tintuc_${item.id}`,
            item.title_en,
          );
          i18n.addResource(
            "vi",
            "translation",
            `subtitle_tintuc_${item.id}`,
            item.subtitle,
          );
          i18n.addResource(
            "en",
            "translation",
            `subtitle_tintuc_${item.id}`,
            item.subtitle_en,
          );
          i18n.addResource(
            "vi",
            "translation",
            `content_tintuc_${item.id}`,
            item.content,
          );
          i18n.addResource(
            "en",
            "translation",
            `content_tintuc_${item.id}`,
            item.content_en,
          );
        }

        setTintuc(response.data.data);
      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setTintuc([]);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setTintuc([]);
    }
  };

  useEffect(() => {
    loadTintuc(1);
  }, []);

  if (!newsItem) {
    return (
      <div className="gridme wide">
        <h2>Không tìm thấy tin tức</h2>
      </div>
    );
  }

  return (
    <>
      <Carousel2 name={t("newsAndEvent")} />
      <div className="gridme wide">
        <div className="row">
          <SidebarMenu />
          <div className="col-custom l-9 m-12 c-12">
            <Titlepage name={t("detail")} />
            <div className="detail-news">
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  paddingTop: "5px",
                  textTransform: "uppercase",
                  lineHeight: "30px",
                  color: "#0196DA",
                }}
              >
                {t(`title_tintuc_${key}`)}
              </h2>
              <img src={`${SERVER}/${newsItem.image}`} alt={newsItem.title} />
              {/* <p
                dangerouslySetInnerHTML={{
                  __html: t(`content_tintuc_${key}`) || "",
                }}
              ></p> */}

              <div className="ql-snow">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: (t(`content_tintuc_${key}`) || "")
                      .replace(/<br\s*\/?>/gi, "<br />")
                      .replace(/&nbsp;/g, " ") // ✅ Chuyển &nbsp; sang khoảng trắng thường
                      .replace(/(\w+)(?=\w{1,2}$)/gi, "$1\u200B") // 👈 Tùy chọn cải thiện xuống dòng (zero-width space)
                      .trim(),
                  }}
                />
              </div>
              <span className="detail-news-postdate">
                {t("ngay")}:{" "}
                {new Date(newsItem.postdate).toLocaleDateString("vi-VN")}
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                {newsItem?.id ? (
                  <div
                    className="attention-wrapper"
                    style={{
                      marginTop: "0px",
                      display: "flex",
                      flexWrap: "wrap", // 👈 Cho phép wrap
                      gap: "10px", // 👈 Khoảng cách giữa các nút
                      alignItems: "center",
                    }}
                  >
                    <span className="hand-pointer">
                      <FaHandPointRight />
                    </span>

                    {/* ✅ Nhiều nút PDF/Word nếu pdfurl chứa dấu ',' */}
                    {newsItem.pdfurl &&
                      newsItem.pdfurl
                        .split(",")
                        .map((url: string, idx: number) => (
                          <HoverableLink key={idx} url={url} />
                        ))}
                  </div>
                ) : (
                  <p>{t("dangtaidulieu")}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-custom l-3"></div>

          <div className="col-custom l-9 m-12 c-12">
            <FacebookComments url="https://www.vungtauship.com/" />
            <br />
            <hr className="hrbaiviet" />
            <Titlepage name={t("baidanglienquan")} />

            <NewsListCarousel items={tintucs} imageBaseUrl={SERVER} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsdetail;
