import React, { useEffect, useState } from 'react';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachphuongtien.scss';
import '../static/css/commonpagination.scss';
import SidebarMenu from '../layout/Sidebar';
import Carousel2 from '../components/Carousel2';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import CommonPagination from '../components/CommonPagination';
import { Phuongtien } from '../interface/InterfaceCommon';
import Itemphuongtien from '../components/Itemphuongtien';



const Danhsachphuongtien: React.FC = () => {
    const [phuongtiens, setPhuongtien] = useState<Phuongtien[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 6; // Limit gửi lên API

    const loadPhuongtien = async (page: number) => {
        try {
            const params = { limit: itemsPerPage, page, itemType: "6" };
            const response = await Apis.get(endpoints.APIItems, { params });



            if (response.data && Array.isArray(response.data.data)) {
                setPhuongtien(response.data.data);
                // Sử dụng totalRecords từ API
                const total = response.data.totalRecords || response.data.data.length;
                setTotalItems(total);

            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setPhuongtien([]);
                setTotalItems(0);
            }
        } catch (error) {
            console.error("Lỗi khi load hoa tiêu:", error);
            setPhuongtien([]);
            setTotalItems(0);
        }
    };

    useEffect(() => {
        loadPhuongtien(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Carousel2 name="Danh sách phương tiện" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom l-9 m-12 c-12">
                        <Titlepage name="Danh sách phương tiện" />
                        <div className="danhsach-phuongtien ">
                            {phuongtiens.map((item, index) => (
                                <Itemphuongtien
                                    key={index}
                                    name={item.title}
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

export default Danhsachphuongtien;