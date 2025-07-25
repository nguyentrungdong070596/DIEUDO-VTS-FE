import { useEffect, useState } from "react";
import Titlepage from "../components/Titlepage";
import "../static/css/danhsachhoatieu.scss";
import "../quill.custom.scss";
import "quill/dist/quill.snow.css"; // Import CSS của Quill
import SidebarMenu from "../layout/Sidebar";
import Carousel2 from "../components/Carousel2";
import Itemgiadichvu from "../components/Itemgiadichvu";
import Apis, { endpoints, SERVER } from "../configs/Apis";
import CommonPagination from "../components/CommonPagination";
import { Link } from "react-router-dom";
import { GiaDichVu } from "../interface/InterfaceCommon";
import { useTranslation } from "react-i18next";

const Giadichvu = () => {
  const [giadichvus, setHoatieu] = useState<GiaDichVu[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 4; // Limit gửi lên API
  const { t, i18n } = useTranslation();

  const loadGiadichvu = async (page: number) => {
    try {
      const params = { limit: itemsPerPage, page };
      const response = await Apis.get(endpoints.APIServicePrice, { params });

      if (response.data && Array.isArray(response.data.data)) {
        const data = response.data.data;

        // Cập nhật totalItems
        const total = response.data.totalRecords || data.length;
        setTotalItems(total);

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

        setHoatieu(data);
      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setHoatieu([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setHoatieu([]);
      setTotalItems(0);
    }
  };

  useEffect(() => {
    loadGiadichvu(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Carousel2 name={t("servicePrice")} />
      <div className="gridme wide">
        <div className="row">
          <SidebarMenu />

          <div className="col-custom m-12 c-12 l-9">
            <div className="">
              <Titlepage name={t("servicePrice")} />

              <div className="danhsach-hoatieu">
                {giadichvus.map((item, index) => (
                  <Link
                    key={index}
                    to={`/gia-dich-vu/detail/${item.id}`} // Chỉ truyền pathname
                    state={{
                      giadichvuItem: item,
                      key: item.id, // Truyền key vào state
                    }} // Truyền state riêng (v6)
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Itemgiadichvu
                      index={index}
                      name={t(`title_giadichvu_${item.id}`) ?? item.title}
                      img={`${SERVER}/${item.image}`}
                    />
                  </Link>
                ))}
              </div>

              <CommonPagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Giadichvu;
