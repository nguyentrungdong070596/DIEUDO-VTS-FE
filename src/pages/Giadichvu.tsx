import React, { useEffect, useState } from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/danhsachhoatieu.scss'
import hoatieu1 from '../static/img/hoatieu1.png'
import hoatieu2 from '../static/img/hoatieu2.png'
import hoatieu3 from '../static/img/hoatieu3.png'
import hoatieu4 from '../static/img/hoatieu4.png'
import hoatieu5 from '../static/img/hoatieu5.png'
import hoatieu6 from '../static/img/hoatieu6.png'
import giadichvu1 from '../static/img/giadichvu1.png'
import giadichvu2 from '../static/img/giadichvu2.png'
import giadichvu3 from '../static/img/giadichvu3.png'
import giadichvu4 from '../static/img/giadichvu4.png'
import SidebarMenu from '../layout/Sidebar'
import Carousel2 from '../components/Carousel2'
import Itemgiadichvu from '../components/Itemgiadichvu'
import Apis, { endpoints, SERVER } from '../configs/Apis'
import CommonPagination from '../components/CommonPagination'
import { Link } from 'react-router-dom'
import { GiaDichVu } from '../interface/InterfaceCommon'



const giaDichVuList = [
    { name: 'Vũ Ngọc An', desc: 'Hoa tiêu ngoại hạng', img: giadichvu1 },
    { name: 'Phạm Trung Tín', desc: 'Hoa tiêu ngoại hạng', img: giadichvu2 },
    { name: 'Võ Việt Đức', desc: 'Hoa tiêu ngoại hạng', img: giadichvu3 },
    { name: 'Nguyễn Đức Thịnh', desc: 'Hoa tiêu ngoại hạng', img: giadichvu4 },
    { name: 'Trần Nhật Khánh', desc: 'Hoa tiêu ngoại hạng', img: giadichvu1 },
    { name: 'Nguyễn Đình Chung', desc: 'Hoa tiêu ngoại hạng', img: giadichvu3 },

];
const Giadichvu = () => {
    const [giadichvus, setHoatieu] = useState<GiaDichVu[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 4; // Limit gửi lên API

    const loadGiadichvu = async (page: number) => {
        try {
            const params = { limit: itemsPerPage, page };
            const response = await Apis.get(endpoints.APIServicePrice, { params });



            if (response.data && Array.isArray(response.data.data)) {
                setHoatieu(response.data.data);
                // Sử dụng totalRecords từ API
                const total = response.data.totalRecords || response.data.data.length;
                setTotalItems(total);

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
    };

    return (
        <>
            <Carousel2 name="Bảng giá dịch vụ" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Bảng giá dịch vụ' />

                            <div className="danhsach-hoatieu">
                                {giadichvus.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/gia-dich-vu/detail/${item.id}`} // Chỉ truyền pathname
                                        state={{ giadichvuItem: item }} // Truyền state riêng (v6)
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Itemgiadichvu key={index} name={item.title} desc={item.content} pdfurl={item.pdfurl} img={`${SERVER}/${item.image}`} />
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


    )
}

export default Giadichvu