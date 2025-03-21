import React, { useEffect, useState } from 'react';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import SidebarMenu from '../layout/Sidebar';
import news1 from '../static/img/news1.png';
import Carousel2 from '../components/Carousel2';
import Itemnews from '../components/Itemnews';
import { Link, useLocation } from 'react-router-dom'; // Không cần To ở v6
import { Tintuc } from '../interface/InterfaceCommon';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import CommonPagination from '../components/CommonPagination';
import FacebookComments from '../components/FacebookComment';

const News = () => {
    const [tintucs, setTintuc] = useState<Tintuc[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 5;

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

    const location = useLocation();

    const currentUrl = `${window.location.origin}${location.pathname}`;

    return (
        <>
            <Carousel2 name="TIN TỨC" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom m-12 c-12 l-9">
                        <div>
                            <Titlepage name="TIN TỨC" />
                            <div className="danhsach-news">
                                {tintucs.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/tin-tuc/detail/${item.id}`} // <-- thêm ID vào URL
                                        state={{ newsItem: item }}        // vẫn giữ state để không cần gọi lại API nếu muốn
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Itemnews
                                            index={index}

                                            title={item.title}
                                            time={item.postdate}
                                            img={`${SERVER}/${item.image}`}
                                            desc={item.content}
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
                        {/* 
                        <h1>Bình luận bằng Facebook</h1>
                        <FacebookComments url={`${SERVER}`} /> */}
                    </div>

                </div>
            </div>
        </>
    );
};

export default News;