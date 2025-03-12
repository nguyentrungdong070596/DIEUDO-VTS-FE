import React, { useEffect, useState } from 'react';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import '../static/css/commonpagination.scss';
import SidebarMenu from '../layout/Sidebar';
import Itemhoatieu from '../components/Itemhoatieu';
import Carousel2 from '../components/Carousel2';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import CommonPagination from '../components/CommonPagination';
import { HoaTieu } from '../interface/InterfaceCommon';



const Danhsachhoatieu: React.FC = () => {
    const [hoatieus, setHoatieu] = useState<HoaTieu[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 6; // Limit gửi lên API

    const loadHoatieu = async (page: number) => {
        try {
            const params = { limit: itemsPerPage, page };
            const response = await Apis.get(endpoints.APIHoaTieu, { params });



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
        loadHoatieu(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Carousel2 name="Danh sách hoa tiêu" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom l-9 m-12 c-12">
                        <Titlepage name="Danh sách hoa tiêu" />
                        <div className="danhsach-hoatieu">
                            {hoatieus.map((item, index) => (
                                <Itemhoatieu
                                    key={index}
                                    name={item.name}
                                    chucdanh={item.rank}
                                    img={`${SERVER}/${item.image}`}
                                />
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
        </>
    );
};

export default Danhsachhoatieu;