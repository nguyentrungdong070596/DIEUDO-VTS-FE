import { useEffect, useState } from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/danhsachhoatieu.scss'

import SidebarMenu from '../layout/Sidebar'
import Carousel2 from '../components/Carousel2'
import Itemgiadichvu from '../components/Itemgiadichvu'
import Apis, { endpoints, SERVER } from '../configs/Apis'
import CommonPagination from '../components/CommonPagination'
import { Link } from 'react-router-dom'
import { GiaDichVu } from '../interface/InterfaceCommon'



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
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <Carousel2 name="Bảng giá dịch vụ" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom m-12 c-12 l-9'>
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
                                        <Itemgiadichvu index={index} key={index} name={item.title} desc={item.content} pdfurl={item.pdfurl} img={`${SERVER}/${item.image}`} />
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