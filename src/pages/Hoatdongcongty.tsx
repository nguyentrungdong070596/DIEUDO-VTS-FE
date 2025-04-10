



import Titlepage from '../components/Titlepage';
import '../static/css/giodieudong.scss';

import Carousel2 from '../components/Carousel2';

import AlbumHoatdongcongtyMansonryCommon from '../components/AlbumHoatdongcongtyMansonryCommon';
import { useTranslation } from 'react-i18next';

const Hoatdongcongty = () => {
    const { t } = useTranslation();

    // const documentUrl = "/CHUONG 6 - CAC VAN DE MARKETING.pdf"; // Ví dụ PDF
    // const [hoatdongcongty, setHoatdongcongty] = useState<HoatDongCongTy[]>([]);
    // const itemsPerPage = 10;
    // const [currentPage, setCurrentPage] = useState(1);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         await loadHoatdongcongty(currentPage);
    //     };
    //     fetchData();
    // }, [currentPage]);

    // const handlePageChange = (page: number) => {
    //     setCurrentPage(page);
    //     window.scrollTo({
    //         top: 200,
    //         behavior: 'smooth'
    //     });

    // };

    // const loadHoatdongcongty = async (page: number) => {
    //     try {
    //         const params = { limit: itemsPerPage, page, itemType: "8", showHiddenItem: true };
    //         const response = await Apis.get(endpoints.APIItems, { params });

    //         if (response.data && Array.isArray(response.data.data)) {
    //             const heightOptions = [400, 800, 700, 500];
    //             const dataWithHeight = response.data.data.map((item: HoatDongCongTy, index: number) => ({
    //                 ...item,
    //                 height: heightOptions[index % heightOptions.length] // Gán height theo vòng lặp
    //             }));
    //             setHoatdongcongty(dataWithHeight);
    //         } else {
    //             console.error("Dữ liệu API không đúng định dạng:", response.data);
    //             setHoatdongcongty([]);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi load hoạt động công ty:", error);
    //         setHoatdongcongty([]);
    //     }
    // };

    return (
        <>
            {/* <BubbleBackground /> */}

            <Carousel2 name={t("activity")} />
            <div className="gridme wide2">
                <div className="row">
                    {/* <SidebarMenu /> */}
                    <div className='col-custom m-12 c-12 l-12'>
                        <div>
                            <Titlepage name={t("activity")} />
                            <AlbumHoatdongcongtyMansonryCommon />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hoatdongcongty;
