



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import '../static/css/hoatdongcongtydetail.scss';
import SidebarMenu from '../layout/Sidebar';
import Carousel2 from '../components/Carousel2';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import NewsListCarousel from '../components/NewsListCarousel';
import { HoatDongCongTy, Tintuc } from '../interface/InterfaceCommon';
import FacebookComments from '../components/FacebookComment';
import GridDistortion from '../components/GridDistortion';
import CommonListCarousel from '../components/CommonListCarousel';
import NewsDichVuBaiDangLienQuan from '../components/NewsBaiDangLienQuan';
import CommonItemLienQuan from '../components/CommonItemLienQuan';

const HoatdongcongtyDetail = () => {

    const location = useLocation();
    const currentPageUrl = window.location.href;
    const hoatdongItem = location.state?.hoatdongItem; // Lấy dữ liệu từ state
    const [hoatdongcongty, setHoatdongcongty] = useState<HoatDongCongTy[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await loadHoatdongcongty();
        };
        fetchData();
    }, []);

    const loadHoatdongcongty = async () => {
        try {
            const params = { limit: 1000, page: 1, itemType: "8", showHiddenItem: true };
            const response = await Apis.get(endpoints.APIItems, { params });

            if (response.data && Array.isArray(response.data.data)) {
                const heightOptions = [400, 800, 700, 500];
                const dataWithHeight = response.data.data.map((item: HoatDongCongTy, index: number) => ({
                    ...item,
                    height: heightOptions[index % heightOptions.length] // Gán height theo vòng lặp
                }));
                setHoatdongcongty(dataWithHeight);
            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setHoatdongcongty([]);
            }
        } catch (error) {
            console.error("Lỗi khi load hoạt động công ty:", error);
            setHoatdongcongty([]);
        }
    };
    // Nếu không có dữ liệu từ state, hiển thị thông báo
    if (!hoatdongItem) {
        return (
            <div className="gridme wide">
                <h2>Không tìm thấy hoạt động công ty nào !!!</h2>
            </div>
        );
    }





    return (
        <>
            <Carousel2 name="HOẠT ĐỘNG CÔNG TY" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom m-12 c-12 l-9">
                        <Titlepage name="Chi tiết" />
                        <div className="animate__animated animate__fadeInUp detail-hoatdong">
                            <img src={`${SERVER}/${hoatdongItem.image}`} alt={hoatdongItem.title} />

                            {/* <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
                                <div className="h-screen w-screen">


                                    <GridDistortion
                                        imageSrc={`${SERVER}/${hoatdongItem.image}`}

                                        grid={20}
                                        mouse={0.2}
                                        strength={0.25}
                                        relaxation={0.2}
                                        className="absolute left-0 top-0 z-0"
                                    />
                                    <div className="text-center text-white pt-40 relative z-10">

                                    </div>
                                </div>
                            </div> */}
                            <h2 >{hoatdongItem.title}</h2>
                            <p dangerouslySetInnerHTML={{ __html: hoatdongItem.content || "" }} ></p>
                            {/* <span className='detail-hoatdong-postdate'>Ngày đăng: {hoatdongItem.postdate}</span> */}

                            <span className="detail-hoatdong-postdate">
                                Ngày đăng: {new Date(hoatdongItem.postdate).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                    </div>




                </div>

                <div className="row">
                    <div className="col-custom l-3"></div>

                    <div className="col-custom m-12 c-12 l-9">
                        {/* <FacebookComments url={currentPageUrl} /> */}
                        <FacebookComments url="https://www.vungtauship.com/" />
                        <br />
                        <hr className='hrbaiviet' />
                        <Titlepage name="BÀI ĐĂNG LIÊN QUAN" />
                        {/* 
                        <NewsListCarousel
                            items={tintucs} // Tintuc[]
                            // onItemClick={handleOpenDialog} // (item: Tintuc) => void
                            imageBaseUrl={SERVER}
                        /> */}
                        <CommonListCarousel<Tintuc>
                            items={hoatdongcongty}
                            renderItem={(item) => (
                                <CommonItemLienQuan
                                    title={item.title}
                                    desc={item.content}
                                    time={item.postdate}
                                    img={`${SERVER}/${item.image}`}
                                />
                            )}
                            getLinkPath={(item) => `/hoat-dong-cong-ty/detail/${item.id}`}
                            getLinkState={(item) => ({ hoatdongItem: item })}
                        />


                    </div>


                </div>




            </div>
        </>
    );
};

export default HoatdongcongtyDetail;