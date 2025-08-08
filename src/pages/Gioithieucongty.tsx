import { useEffect, useState } from "react";
// import Titlepage from '../components/Titlepage'
import "../static/css/gioithieucongty.scss";
import { motion } from "framer-motion";
import "../quill.custom.scss";
import "../ng-editor.scss";
import "quill/dist/quill.snow.css"; // Import CSS của Quill

import SidebarMenu from "../layout/Sidebar";
import Carousel2 from "../components/Carousel2";
import Apis, { endpoints } from "../configs/Apis";
import { Lichsu } from "../interface/InterfaceCommon";

// import LeafletMap from '../components/Leafletmap'
import { FaAnchor } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Gioithieucongty = () => {
  const [gioithieu, setGioiThieu] = useState<Lichsu>();
  const { t } = useTranslation();

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const loadLichsucongty = async () => {
    try {
      const params = { limit: 1000, page: 1, itemType: "7" };
      const response = await Apis.get(endpoints.APIItems, { params });

      if (response.data && Array.isArray(response.data.data)) {
        setGioiThieu(response.data.data[0]);

        // Sử dụng totalRecords từ API
        // const total = response.data.totalRecords || response.data.data.length;
      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setGioiThieu(gioithieu);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setGioiThieu(gioithieu);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadLichsucongty();
    };

    fetchData();
  }, []);
  return (
    <>
      <Carousel2 name={t("companyName")} subtitle={t("branchName")} />
      <div className="gridme wide">
        <div className="row">
          <SidebarMenu />

          <div className="col-custom l-9 m-12 c-12">
            {/* <Titlepage name="CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU " /> */}
            {/* <Titlepage name="XÍ NGHIỆP HOA TIÊU VŨNG TÀU " /> */}

            <div className="titlepage-container">
              <p className={`titlepage  animate__animated animate__fadeInUp`}>
                <FaAnchor className="my-anchor-icon" />
                {/* CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU <br /> */}
                {t("companyName")} <br />
                {/* XÍ NGHIỆP HOA TIÊU VŨNG TÀU */}
                {t("branchName")}
              </p>

              <hr className={`animate__animated animate__fadeInRight`} />
            </div>
            <div className="hoa-tieu-container">
              {/* <LeafletMap /> */}

              <motion.div
                variants={item}
                className="rounded-2xl overflow-hidden shadow-md backdrop-blur-md border border-cyan-700/30"
                style={{ minHeight: "400px" }}
              >
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.0887454972744!2d107.06934841012219!3d10.334782867143058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31756f8a011f1159%3A0x1cada2fcb0187b1e!2zODggSOG6oSBMb25nLCBQaMaw4budbmcgMiwgVsWpbmcgVMOgdSwgQsOgIFLhu4thIC0gVsWpbmcgVMOgdSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1743663556964!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>

              {/* <h2 className="text-xl font-bold mb-2 text-center">Địa chỉ công ty</h2> */}

              {
                // stripHtmlWithFormat(gioithieu?.content || "")
                // gioithieu?.content || ""

                // < pre style={{ whiteSpace: 'pre-wrap' }}>
                //     {stripHtmlWithFormat(gioithieu?.content || "")}
                // </pre>
                // <div
                //   style={{ paddingTop: "20px" }}
                //   dangerouslySetInnerHTML={{
                //     __html:
                //       t(`content_gioithieucongty_${gioithieu?.id}`) ||
                //       t(`aboutUs`),
                //   }}
                // />

                <div className="ql-snow">
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{
                      __html:
                        t(`content_gioithieucongty_${gioithieu?.id}`) ||
                        ""
                          //       t(`aboutUs`),
                          .replace(/<br\s*\/?>/gi, "<br />")
                          .replace(/&nbsp;/g, " ") // ✅ Chuyển &nbsp; sang khoảng trắng thường
                          .replace(/(\w+)(?=\w{1,2}$)/gi, "$1\u200B") // 👈 Tùy chọn cải thiện xuống dòng (zero-width space)
                          .trim(),
                    }}
                  />
                </div>

                // <ReactMarkdown >{stripHtmlWithFormat(gioithieu?.content || "")}</ReactMarkdown>

                // <div style={{ whiteSpace: 'pre-wrap' }}>
                //     <ReactMarkdown>{stripHtmlWithFormat(gioithieu?.content || "")}</ReactMarkdown>
                // </div>
              }
              {/* <p className="paragraph">
                                Xí nghiệp Hoa tiêu Vũng Tàu là đơn vị trực thuộc Công ty CP Dịch vụ và Vận tải biển Vũng Tàu, có bề dày kinh
                                nghiệm hoạt động trong lĩnh vực hoa tiêu hàng hải. Xí nghiệp Hoa tiêu Vũng Tàu được thành lập theo Quyết định số
                                236/QĐ-UBT ngày 5/5/1995 của UBND tỉnh BRVT. Theo Quyết định số 813/QĐ-CHHVNN ngày 01/01/2012, Xí nghiệp Hoa tiêu
                                Vũng Tàu thực hiện nhiệm vụ cung cấp dịch vụ hoa tiêu hàng hải trên các tuyến dẫn tàu:
                            </p>
                            <ul className="list">
                                <li>- Tuyến sông Dinh: từ vùng đón trả hoa tiêu đến các cảng trên sông Dinh/Gòi;</li>
                                <li>- Tuyến Vũng Tàu: từ vùng đón trả hoa tiêu đến các cảng trên sông Thị Vải – Cái Mép;</li>
                                <li>- Tuyến Côn Đảo: từ vùng đón trả hoa tiêu đến các cảng thuộc cụm cảng biển Côn Đảo;</li>
                                <li>- Tuyến quá cảnh lãnh thổ Việt Nam trên luồng sông tiễn từ Cửa Tiểu đến Vĩnh Xương.</li>
                            </ul>

                            <p className="paragraph">
                                <strong>Trụ sở:</strong> 88 Hải Long – Phường 1 – Tp.Vũng Tàu<br />
                                <strong>Điện thoại:</strong> 02543 810546 – 02543 810546 – 02543 810547 – 02543 810545<br />
                                <strong>Fax:</strong> 02543 850669
                            </p>

                            <h3 className="sub-title">Cơ cấu tổ chức</h3>
                            <p className="paragraph">Tổng số CBCNV trong xí nghiệp hiện nay là 111 người và được phân bổ như sau:</p>
                            <ul className="list">
                                <li>Hoa tiêu ngoài hạng: 30</li>
                                <li>Hoa tiêu hạng Nhất: 7</li>
                                <li>Hoa tiêu hạng Hai: 9</li>
                                <li>Hoa tiêu hạng Ba: 16</li>
                                <li>Thực tập hoa tiêu: 4</li>
                            </ul>
                            <p className="paragraph">
                                Các hoa tiêu đều được cấp Giấy chứng nhận khả năng chuyên môn hoa tiêu hàng hải và Giấy phép hoạt động hoa tiêu
                                hàng hải phù hợp với quy định hiện hành của Nhà nước. 16 hoa tiêu đã đi thực tập dẫn tàu lớn trên mô phỏng cảng SP
                                – PSA trên sông Thị Vải tại Trung tâm Star Cruises ở Malaysia.
                            </p>

                            <h3 className="sub-title">Khối hành chính: 37 người</h3>
                            <ul className="list">
                                <li>Tổ hành chính, kế toán: 5</li>
                                <li>Tổ điều độ: 12</li>
                                <li>Tổ bảo vệ, tạp vụ: 7</li>
                                <li>Tổ lái xe: 9</li>
                                <li>Tổ lai xưởng, cơ viễn: 4</li>
                            </ul>

                            <h3 className="sub-title">Khối phương tiện canô: 32 thuyền viên</h3>
                            <p className="paragraph">
                                Phương tiện dẫn đón hoa tiêu: Công ty đã có 07 xe ô tô 7 chỗ và 05 ca nô, trong đó có 01 ca nô cao tốc vỏ nhôm (trị
                                giá gần 10 tỷ đồng) đáp ứng mọi yêu cầu đưa đón hoa tiêu trên tất cả các tàu, kể cả tàu khách, tàu Container cỡ lớn.
                                Các phương tiện được trang bị đầy đủ thiết bị thông tin liên lạc như VHF, AIS nhằm giữ liên lạc thông suốt giữa các
                                phương tiện với các hoa tiêu đang dẫn tàu trên các tuyến luồng và các cơ quan, đơn vị có liên quan như: Cảng vụ hàng
                                hải, các cảng biển, trạm VTS…
                            </p>
                            <p className="paragraph">
                                Công ty đang đóng mới 01 ca nô cao tốc mới có chiều dài 18 mét, tổng mức đầu tư là 18,7 tỷ đồng, dự kiến đưa vào
                                hoạt động trong năm 2017, góp phần nâng cao chất lượng cung ứng dịch vụ hoa tiêu hàng hải.
                            </p>

                            <h3 className="sub-title">Một số chỉ tiêu nổi bật</h3>
                            <p className="paragraph">
                                Hàng năm XNHT dẫn an toàn 9.000 – 12.000 lượt tàu ra, vào các cảng trong khu vực. Năm 2014: 10.803 lượt tàu; năm
                                2015: 11.147 lượt tàu; năm 2016: 11.106 lượt tàu.
                            </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gioithieucongty;
