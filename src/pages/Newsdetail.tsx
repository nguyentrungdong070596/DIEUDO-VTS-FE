// import React from 'react'
// import Titlepage from '../components/Titlepage'
// import '../static/css/danhsachhoatieu.scss'
// import hoatieu1 from '../static/img/hoatieu1.png'
// import hoatieu2 from '../static/img/hoatieu2.png'
// import hoatieu3 from '../static/img/hoatieu3.png'
// import hoatieu4 from '../static/img/hoatieu4.png'
// import hoatieu5 from '../static/img/hoatieu5.png'
// import hoatieu6 from '../static/img/hoatieu6.png'
// import SidebarMenu from '../layout/Sidebar'
// import Itemhoatieu from '../components/Itemhoatieu'
// import news1 from '../static/img/tau2.png'
// import Carousel2 from '../components/Carousel2'
// import Itemnews from '../components/Itemnews'
// import '../static/css/newsdetail.scss'

// const Newsdetail = () => {
//     return (
//         <>
//             <Carousel2 name="TIN TỨC" />
//             <div className="gridme wide">

//                 <div className="row">
//                     <SidebarMenu />

//                     <div className='col-custom l-9 m-12 c-12'>
//                         <Titlepage name='Chi tiết' />

//                         <div className='detail-news'>



//                             <img src={news1} alt="hình chi tiết" />
//                             <p>Trong hai ngày 29 - 30/3, siêu tàu container M/V OOCL SPAIN đã cập cảng Gemalink (cụm cảng Cái Mép - Thị Vải, thị xã Phú Mỹ, tỉnh Bà Rịa - Vũng Tàu) an toàn, hoàn tất quá trình xếp dỡ hàng hóa và siêu tàu M/V OOCL SPAIN xuất bến hành trình đến Singapore.
//                                 Tàu OOCL SPAIN có chiều dài 399,99m, chiều rộng 61,3m, trọng tải 223.000 tấn, là một trong những tàu lớn nhất thế giới hiện nay, vừa xuất xưởng vào tháng 2/2023, được Cục Vận chuyển Hoa Kỳ (ABS) trao tặng  chứng nhận “Tàu thông minh” (Smart Ship) thân thiện với môi trường, cũng là tàu container lớn nhất từ trước tới nay cập cảng Cái Mép - Thị Vải, tỉnh Bà Rịa - Vũng Tàu. Vì vậy, công tác chuẩn bị đón tàu cần phải được chuẩn bị chu đáo từ công tác phối hợp, giám sát, liên lạc của các bộ phận liên quan và quan trọng là hoa tiêu trực tiếp dẫn tàu cần phải đảm bảo mọi điều kiện tốt nhất về sức khỏe, năng lực chuyên môn, thiết bị hỗ trợ.
//                             </p>


//                         </div>


//                     </div>

//                 </div>



//             </div>
//         </>


//     )
// }

// export default Newsdetail




import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import '../static/css/newsdetail.scss';
import SidebarMenu from '../layout/Sidebar';
import Carousel2 from '../components/Carousel2';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import NewsListCarousel from '../components/NewsListCarousel';
import { Tintuc } from '../interface/InterfaceCommon';

const Newsdetail = () => {
    const location = useLocation();
    const newsItem = location.state?.newsItem; // Lấy dữ liệu từ state
    const [tintucs, setTintuc] = useState<Tintuc[]>([]);

    const loadTintuc = async (page: number) => {
        try {
            const params = { limit: 1000, page: 1 };
            const response = await Apis.get(endpoints.APINews, { params });



            if (response.data && Array.isArray(response.data.data)) {
                setTintuc(response.data.data);
                // Sử dụng totalRecords từ API
                const total = response.data.totalRecords || response.data.data.length;
                // setTotalItems(total);

            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setTintuc([]);
                // setTotalItems(0);
            }
        } catch (error) {
            console.error("Lỗi khi load hoa tiêu:", error);
            setTintuc([]);
            // setTotalItems(0);
        }
    };
    useEffect(() => {
        loadTintuc(1);
    }, [1]);

    // Nếu không có dữ liệu từ state, hiển thị thông báo
    if (!newsItem) {
        return (
            <div className="gridme wide">
                <h2>Không tìm thấy tin tức</h2>
            </div>
        );
    }





    return (
        <>
            <Carousel2 name="TIN TỨC" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom l-9 m-12 c-12">
                        <Titlepage name="Chi tiết" />
                        <div className="detail-news">
                            <img src={`${SERVER}/${newsItem.image}`} alt={newsItem.title} />
                            <h2>{newsItem.title}</h2>
                            <p dangerouslySetInnerHTML={{ __html: newsItem.content || "" }} ></p>
                            {/* <span className='detail-news-postdate'>Ngày đăng: {newsItem.postdate}</span> */}

                            <span className="detail-news-postdate">
                                Ngày đăng: {new Date(newsItem.postdate).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                    </div>




                </div>

                <div className="row">
                    <div className="col-custom l-3"></div>

                    <div className="col-custom l-9 m-12 c-12">
                        <br />
                        <hr className='hrbaiviet' />
                        <Titlepage name="BÀI ĐĂNG LIÊN QUAN" />

                        <NewsListCarousel
                            items={tintucs} // Tintuc[]
                            // onItemClick={handleOpenDialog} // (item: Tintuc) => void
                            imageBaseUrl={SERVER}
                        />
                    </div>
                </div>


            </div>
        </>
    );
};

export default Newsdetail;