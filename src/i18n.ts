import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                searchPlacehoder: "Search...",
                viewDetail: "See More",
                UsService: " Service Of Us",
                newsAndEvent: "News & Event",
                home: "Home",
                plan: "SHIP SCHEDULE",
                schedule: "WINDOW TIMES & DRAFT",
                orderService: "Order Service",
                servicePrice: "PILOTAGE SERVICE CHARGE",
                pilotList: "PILOT TEAM",
                techSpec: "SPECIFICATION",
                pilotPosition: "Pilot STATION",
                tideSchedule: "Tide TimeTable",
                route: "Marine Channel",
                seaportSystem: "Port Particular",
                pilotArea: "Navigational Area",
                branchName: "VUNG TAU PILOT",
                companyName: "VUNG TAU SHIPPING AND SERVICES JOINT STOCK COMPANY",

                aboutUs: "About Us",
                activity: "Activity",
                aboutUsParagraph: "Vung Tau Marine Services and Transport Company (VUNGTAUSHIP) was established on February 10, 1990, under the decision of the People's Committee of Vung Tau - Con Dao Special Zone. The company was re-established as a state-owned enterprise under Decision No. 12/QĐ-UBT dated November 27, 1992, issued by the People's Committee of Ba Ria - Vung Tau Province, with an initial charter capital of VND 7,467,638,393. Initially operating under the provincial Department of Transport, with core services in vessel supply and maritime services, VUNGTAUSHIP has gradually expanded into various sectors including logistics, maritime pilotage, manpower supply and management, hotel services, and has extended operations to other provinces and cities such as Ho Chi Minh City, Hanoi, Dong Nai, and Kien Giang. The company has consistently achieved high economic efficiency for many consecutive years and has been honored with numerous certificates of merit from Ba Ria - Vung Tau Province and the Ministry of Transport. In 2004, VUNGTAUSHIP was proudly awarded the First-Class Labor Medal by the Prime Minister.",

                transportVehicleList: "Transport Vehicle List",
                subTitleService: "Practical – Fast – Cost-effective Solution",

                subTitleNews: "Our Latest News & Events",
                giodieudong: "Time dispatching pilotage",
                kehoachdantau: "Pilot Plan",
                gioithieu: "Introduction",
                libImg: "Image Library",
                libVid: "Video Library",
                servicePriceNor: "Pilotage Service Charge",
                tauden: "Arriving ship",
                tauroi: "Departing ship",
                taudichchuyen: "Transiting ship",
                lienketnhanh: "Quick Links",
                dangkybantin: "Subscribe to Newsletter",
                dangkybantinsub: "Subscribe to receive the latest news and events from us!",
                phattrienboi: "Development by",
                dangtaidulieu: "Loading data...",
                baidanglienquan: "Related Posts",
                comment: "Comment",
                nhapemail: "Input your email...",
                excel: "Excel",
                export: "Export",
                ngay: "Date",
                chonngay: "Choose date",
                detail: "Detail",
                dichvu: "Service",

                categories: [
                    {
                        title: "CATEGORIES",
                        items: [
                            { name: "📰 News", path: "/tin-tuc" },
                            { name: "📘 About Us", path: "/gioi-thieu-cong-ty" },
                            { name: "💼 Business Sector", path: "/" }
                        ]
                    },
                    {
                        title: "WEBSITE LINKS",
                        items: [
                            { name: "📈 Stock Exchange", path: "https://www.ssc.gov.vn/webcenter/portal/ubck" },
                            { name: "🛃 Customs", path: "https://www.customs.gov.vn/" },
                            { name: "🌦️ Southern Hydro-Meteorology", path: "http://www.kttv-nb.org.vn/" },
                            { name: "🌐 Government Website", path: "https://chinhphu.vn/" },
                            { name: "🚦 Ministry of Transport", path: "https://www.mt.gov.vn/" },
                            { name: "📄 Legal Documents", path: "https://luatvietnam.vn/" },
                            { name: "🚢 Vietnam Maritime Administration", path: "https://www.vinamarine.gov.vn/" },
                            { name: "📰 Ba Ria - Vung Tau Newspaper", path: "https://baria-vungtau.gov.vn/sphere/baria/vungtau/page/trang-chu.cpx" }
                        ]
                    },
                    {
                        title: "UTILITIES",
                        items: [
                            { name: "🌊 Tide Table", path: "/bang-thuy-trieu" },
                            { name: "☁️ Weather", path: "https://www.24h.com.vn/du-bao-thoi-tiet-c568.html" }
                        ]
                    }
                ]

            }
        },
        vi: {
            translation: {
                searchPlacehoder: "Tìm kiếm...",
                viewDetail: "Xem chi tiết",
                UsService: "DỊCH VỤ CỦA CHÚNG TÔI",
                newsAndEvent: "Tin tức & Sự Kiện",

                home: "TRANG CHỦ",
                plan: "KẾ HOẠCH DẪN TÀU",
                schedule: "GIỜ ĐIỀU ĐỘNG & MỚN NƯỚC",
                orderService: "ĐẶT HÀNG DỊCH VỤ",
                servicePrice: "GIÁ DỊCH VỤ",
                pilotList: "DANH SÁCH HOA TIÊU",
                techSpec: "THÔNG SỐ KỸ THUẬT",
                pilotPosition: "Vị trí đón trả hoa tiêu",
                tideSchedule: "Lịch thủy triều",
                route: "Tuyến luồng",
                seaportSystem: "Hệ thống cảng biển",
                pilotArea: "Vùng hoa tiêu",
                branchName: "XÍ NGHIỆP HOA TIÊU VŨNG TÀU",
                companyName: "CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU",

                aboutUs: "Về chúng tôi",
                activity: "Hoạt động công ty",

                aboutUsParagraph: "Công ty Dịch vụ và Vận tải biển Vũng Tàu (VUNGTAUSHIP) được thành lập ngày 10/02/1990 theo quyết định của UBND Đặc khu Vũng Tàu Côn Đảo. Công ty được thành lập lại là Doanh nghiệp nhà nước theo Quyết định số 12/QĐ-UBT ngày 27/11/1992 của UBND tỉnh Bà Rịa – Vũng Tàu với vốn điều lệ ban đầu là: 7.467.638.393 đồng. Từ một doanh nghiệp Nhà nước trực thuộc Sở Giao thông Vận tải tỉnh với hoạt động ban đầu chỉ là cung ứng tàu biển và dịch vụ hàng hải, VUNGTAUSHIP đã dần mở rộng kinh doanh, phát triển thêm nhiều hoạt động dịch vụ mới như logistics, hoạt động hoa tiêu hàng hải, cung ứng và quản lý nguồn nhân lực, kinh doanh dịch vụ khách sạn và mở rộng hoạt động ra nhiều tỉnh thành khác như TPHCM, Hà Nội, Đồng Nai, Kiên Giang đạt được hiệu quả kinh tế cao trong nhiều năm liền, nhận được nhiều bằng khen của tỉnh Bà Rịa - Vũng Tàu và Bộ Giao thông Vận tải. Năm 2004, VUNGTAUSHIP vinh dự nhận được Huân chương Lao động hạng Nhất do Thủ tướng Chính phủ trao tặng.",

                transportVehicleList: "Phương tiện",
                subTitleService: "giải pháp thực tế - nhanh chóng - tiết kiệm",
                subTitleNews: "tin tức & sự kiện mới nhất của chúng tôi",
                giodieudong: "Giờ diều động mớn nước",
                gioithieu: "Giới thiệu",
                libImg: "Thư viện hình ảnh",
                libVid: "Thư viện video",
                servicePriceNor: "Giá dịch vụ",
                tauden: "Tàu đến",
                tauroi: "Tàu rời",
                taudichchuyen: "Tàu dịch chuyển",
                lienketnhanh: "Liên kết nhanh",
                dangkybantin: "Đăng ký bản tin",
                phattrienboi: "Phát triển bởi",
                dangtaidulieu: "Đang tải dữ liệu...",
                baidanglienquan: "Bài đăng liên quan",
                comment: "Bình luận",
                nhapemail: "Nhập email...",
                excel: "Excel",
                export: "Xuất",
                ngay: "Ngày đăng",
                detail: "Chi tiết",

                chonngay: "Chọn ngày",
                dichvu: "Dịch vụ của chúng tôi",


                dangkybantinsub: "Đăng ký để nhận các tin tức, sự kiện mới từ chúng tôi!",
                categories: [
                    {
                        title: "DANH MỤC",
                        items: [
                            { name: "📰 Tin tức", path: "/tin-tuc" },
                            { name: "📘 Giới thiệu", path: "/gioi-thieu-cong-ty" },
                            { name: "💼 Ngành nghề kinh doanh", path: "/" }
                        ]
                    },
                    {
                        title: "LIÊN KẾT WEBSITE",
                        items: [
                            { name: "📈 Sàn Giao Dịch Chứng Khoán", path: "https://www.ssc.gov.vn/webcenter/portal/ubck" },
                            { name: "🛃 Cục Hải Quan", path: "https://www.customs.gov.vn/" },
                            { name: "🌦️ Khí Tượng Thủy Văn Nam Bộ", path: "http://www.kttv-nb.org.vn/" },
                            { name: "🌐 Web Chính Phủ", path: "https://chinhphu.vn/" },
                            { name: "🚦 Bộ Giao Thông", path: "https://www.mt.gov.vn/" },
                            { name: "📄 Văn Bản Pháp Luật", path: "https://luatvietnam.vn/" },
                            { name: "🚢 Cục Hàng Hải Việt Nam", path: "https://www.vinamarine.gov.vn/" },
                            { name: "📰 Báo Bà Rịa - Vũng Tàu", path: "https://baria-vungtau.gov.vn/sphere/baria/vungtau/page/trang-chu.cpx" }
                        ]
                    },
                    {
                        title: "TIỆN ÍCH",
                        items: [
                            { name: "🌊 Bảng Thủy Triều", path: "/bang-thuy-trieu" },
                            { name: "☁️ Thời Tiết", path: "https://www.24h.com.vn/du-bao-thoi-tiet-c568.html" }
                        ]
                    }
                ]




            }
        }
    },
    lng: "vi", // ngôn ngữ mặc định
    fallbackLng: "vi",
    interpolation: {
        escapeValue: false
    }
});



export default i18n;
