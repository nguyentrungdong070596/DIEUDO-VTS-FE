



import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import '../static/css/hoatdongcongtydetail.scss';
import SidebarMenu from '../layout/Sidebar';
import Carousel2 from '../components/Carousel2';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import { HoatDongCongTy, Tintuc } from '../interface/InterfaceCommon';
import FacebookComments from '../components/FacebookComment';
import CommonListCarousel from '../components/CommonListCarousel';
import CommonItemLienQuan from '../components/CommonItemLienQuan';
import { useTranslation } from 'react-i18next';

const HoatdongcongtyDetail = () => {

    const location = useLocation();

    // const currentPageUrl = window.location.href;
    const hoatdongItem = location.state?.hoatdongItem; // Lấy dữ liệu từ state
    const [hoatdongcongty, setHoatdongcongty] = useState<HoatDongCongTy[]>([]);
    const { t, i18n } = useTranslation();


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






                // Dịch 3 trường: title, subtitle, content
                for (const item of response.data.data) {
                    // Dịch title
                    // const vietnameseTitle = await translateWithGoogle(item.title, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `title_hoatdongcongty_${item.id}`, item.title);
                    // const englishTitle = await translateWithGoogle(item.title, 'English');
                    i18n.addResource('en', 'translation', `title_hoatdongcongty_${item.id}`, item.title_en);


                    // Dịch subtitle
                    // const vietnameseSubtitle = await translateWithGoogle(item.subtitle, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `subtitle_hoatdongcongty_${item.id}`, item.subtitle);
                    // const englishSubtitle = await translateWithGoogle(item.subtitle, 'English');
                    i18n.addResource('en', 'translation', `subtitle_hoatdongcongty_${item.id}`, item.subtitle_en);

                    // Dịch content
                    // const vietnameseContent = await translateWithGoogle(item.content, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `content_hoatdongcongty_${item.id}`, item.content);
                    // const englishContent = await translateWithGoogle(item.content, 'English');
                    i18n.addResource('en', 'translation', `content_hoatdongcongty_${item.id}`, item.content_en);

                }

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
            {/* <Carousel2 name="HOẠT ĐỘNG CÔNG TY" /> */}
            <Carousel2 name={t("activity")} />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom m-12 c-12 l-9">
                        {/* <Titlepage name="Chi tiết" /> */}
                        <Titlepage name={t("detail")} />
                        <div className="animate__animated animate__fadeInUp detail-hoatdong">
                            <img src={`${SERVER}/${hoatdongItem.image}`} alt={hoatdongItem.title} />
                            {hoatdongItem.videourl && (
                                <div className="detail-hoatdong-video">
                                    <video width="100%" height="auto"
                                        controls
                                        autoPlay
                                        key={hoatdongItem.videourl} // Quan trọng
                                        preload="metadata"
                                        muted
                                        loop
                                        poster={`${SERVER}/${hoatdongItem.image}`}

                                        playsInline>
                                        <source src={`${SERVER}/${hoatdongItem.videourl}?v=${Date.now()}`} type="video/mp4" />
                                        Trình duyệt của bạn không hỗ trợ thẻ video.
                                    </video>
                                </div>
                            )}
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
                            {/* <h2 >{hoatdongItem.title}</h2> */}
                            <h2 >{t(`title_hoatdongcongty_${hoatdongItem.id}`) || ""}</h2>
                            {/* <p dangerouslySetInnerHTML={{ __html: hoatdongItem.content || "" }} ></p> */}
                            <p dangerouslySetInnerHTML={{ __html: t(`content_hoatdongcongty_${hoatdongItem.id}`) || "" }} ></p>
                            {/* <span className='detail-hoatdong-postdate'>Ngày đăng: {hoatdongItem.postdate}</span> */}

                            <span className="detail-hoatdong-postdate">
                                {t("ngay")}: {new Date(hoatdongItem.postdate).toLocaleDateString('vi-VN')}
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
                        {/* <Titlepage name="BÀI ĐĂNG LIÊN QUAN" /> */}
                        <Titlepage name={t("baidanglienquan")} />

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
                                    // title={item.title}
                                    title={t(`title_hoatdongcongty_${item.id}`) ?? item.title}
                                    desc={t(`content_hoatdongcongty_${item.id}`) ?? item.content}
                                    // desc={item.content}
                                    time={item.postdate}
                                    img={`${SERVER}/${item.image}`}
                                />
                            )}
                            getLinkPath={(item) => `/hoat-dong-cong-ty/detail/${item.id}`}
                            getLinkState={(item) => ({ hoatdongItem: item, key: item.id })} // Truyền key vào state
                        />


                    </div>


                </div>




            </div>
        </>
    );
};

export default HoatdongcongtyDetail;