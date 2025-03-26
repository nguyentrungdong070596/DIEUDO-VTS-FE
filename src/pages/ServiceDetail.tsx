


import { useLocation } from 'react-router-dom';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import '../static/css/servicedetail.scss';
import SidebarMenu from '../layout/Sidebar';
import Carousel2 from '../components/Carousel2';
import { SERVER } from '../configs/Apis';

const ServiceDetail = () => {
    const location = useLocation();
    const serviceItem = location.state?.serviceItem; // Lấy dữ liệu từ state
    // const [dichvus, setDichvu] = useState<Dichvu[]>([]);


    // const loadDichVu = async () => {
    //     try {
    //         const params = { limit: 7, page: 1 };
    //         const response = await Apis.get(endpoints.APIDichvu, { params });



    //         if (response.data && Array.isArray(response.data.data)) {
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
            <Carousel2 name="DỊCH VỤ" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom l-9 m-12 c-12">
                        <Titlepage name="Chi tiết" />
                        <div className="detail-news">
                            <img src={`${SERVER}/${serviceItem.image}`} alt={serviceItem.title} />
                            <h2>{serviceItem.title}</h2>
                            <p dangerouslySetInnerHTML={{ __html: serviceItem.content || "" }} ></p>
                            {/* <span className='detail-news-postdate'>Ngày đăng: {serviceItem.postdate}</span> */}

                            <span className="detail-news-postdate">
                                Ngày đăng: {new Date(serviceItem.postdate).toLocaleDateString('vi-VN')}
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