import React, { useEffect, useState } from 'react';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import SidebarMenu from '../layout/Sidebar';
import news1 from '../static/img/news1.png';
import Carousel2 from '../components/Carousel2';
import Itemnews from '../components/Itemnews';
import { Link } from 'react-router-dom'; // Không cần To ở v6
import { Tintuc } from '../interface/InterfaceCommon';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import CommonPagination from '../components/CommonPagination';

const News = () => {
    const [tintucs, setTintuc] = useState<Tintuc[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 2;

    const loadTintuc = async (page: number) => {
        try {
            const params = { limit: itemsPerPage, page };
            const response = await Apis.get(endpoints.APINews, { params });


            if (response.data && Array.isArray(response.data.data)) {
                setTintuc(response.data.data);
                const total = response.data.totalRecords || response.data.data.length;
                setTotalItems(total);
            } else {
                console.error('Dữ liệu API không đúng định dạng:', response.data);
                setTintuc([]);
                setTotalItems(0);
            }
        } catch (error) {
            console.error('Lỗi khi load tin tức:', error);
            setTintuc([]);
            setTotalItems(0);
        }
    };

    useEffect(() => {
        loadTintuc(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const stripHtml = (html: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    return (
        <>
            <Carousel2 name="TIN TỨC" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom l-9 m-12 c-12">
                        <div>
                            <Titlepage name="TIN TỨC" />
                            <div className="danhsach-news">
                                {tintucs.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/tin-tuc/detail`} // Chỉ truyền pathname
                                        state={{ newsItem: item }} // Truyền state riêng (v6)
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Itemnews
                                            title={item.title}
                                            time={item.postdate}
                                            img={`${SERVER}/${item.image}`}
                                            desc={(item.content)}

                                        />
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
    );
};

export default News;