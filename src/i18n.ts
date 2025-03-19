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
                plan: "Pilot Plan",
                schedule: "Dispatch & Water Level",
                orderService: "Order Service",
                servicePrice: "Service Price",
                pilotList: "Pilot List",
                techSpec: "Technical Info",
                pilotPosition: "Pilot Pickup Point",
                tideSchedule: "Tide Schedule",
                route: "Navigational Channel",
                seaportSystem: "Seaport System",
                pilotArea: "Pilot Area",
                branchName: "VUNG TAU PILOT",
                companyName: "VUNG TAU SHIPPING AND SERVICES JOINT STOCK COMPANY",

                aboutUs: "About Us",
                aboutUsParagraph: "Vung Tau Marine Services and Transport Company (VUNGTAUSHIP) was established on February 10, 1990, under the decision of the People's Committee of Vung Tau - Con Dao Special Zone. The company was re-established as a state-owned enterprise under Decision No. 12/QĐ-UBT dated November 27, 1992, issued by the People's Committee of Ba Ria - Vung Tau Province, with an initial charter capital of VND 7,467,638,393. Initially operating under the provincial Department of Transport, with core services in vessel supply and maritime services, VUNGTAUSHIP has gradually expanded into various sectors including logistics, maritime pilotage, manpower supply and management, hotel services, and has extended operations to other provinces and cities such as Ho Chi Minh City, Hanoi, Dong Nai, and Kien Giang. The company has consistently achieved high economic efficiency for many consecutive years and has been honored with numerous certificates of merit from Ba Ria - Vung Tau Province and the Ministry of Transport. In 2004, VUNGTAUSHIP was proudly awarded the First-Class Labor Medal by the Prime Minister.",

                transportVehicleList: "Transport Vehicle List"

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
                aboutUsParagraph: "Công ty Dịch vụ và Vận tải biển Vũng Tàu (VUNGTAUSHIP) được thành lập ngày 10/02/1990 theo quyết định của UBND Đặc khu Vũng Tàu Côn Đảo. Công ty được thành lập lại là Doanh nghiệp nhà nước theo Quyết định số 12/QĐ-UBT ngày 27/11/1992 của UBND tỉnh Bà Rịa – Vũng Tàu với vốn điều lệ ban đầu là: 7.467.638.393 đồng. Từ một doanh nghiệp Nhà nước trực thuộc Sở Giao thông Vận tải tỉnh với hoạt động ban đầu chỉ là cung ứng tàu biển và dịch vụ hàng hải, VUNGTAUSHIP đã dần mở rộng kinh doanh, phát triển thêm nhiều hoạt động dịch vụ mới như logistics, hoạt động hoa tiêu hàng hải, cung ứng và quản lý nguồn nhân lực, kinh doanh dịch vụ khách sạn và mở rộng hoạt động ra nhiều tỉnh thành khác như TPHCM, Hà Nội, Đồng Nai, Kiên Giang đạt được hiệu quả kinh tế cao trong nhiều năm liền, nhận được nhiều bằng khen của tỉnh Bà Rịa - Vũng Tàu và Bộ Giao thông Vận tải. Năm 2004, VUNGTAUSHIP vinh dự nhận được Huân chương Lao động hạng Nhất do Thủ tướng Chính phủ trao tặng.",

                transportVehicleList: "Phương tiện"

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
