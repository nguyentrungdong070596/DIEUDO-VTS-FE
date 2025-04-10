import { useEffect, useState } from 'react';
import Titlepage from '../components/Titlepage';
import '../static/css/danhsachhoatieu.scss';
import SidebarMenu from '../layout/Sidebar';
import Carousel2 from '../components/Carousel2';
import Itemnews from '../components/Itemnews';
import { Link } from 'react-router-dom'; // Không cần To ở v6
import { Tintuc } from '../interface/InterfaceCommon';
import Apis, { endpoints, SERVER } from '../configs/Apis';
import CommonPagination from '../components/CommonPagination';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const News = () => {
    const [tintucs, setTintuc] = useState<Tintuc[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 5;
    const { t } = useTranslation();


    const loadTintuc = async (page: number) => {
        try {
            const params = { limit: itemsPerPage, page };
            const response = await Apis.get(endpoints.APINews, { params });


            if (response.data && Array.isArray(response.data.data)) {

                for (const item of response.data.data) {
                    // Dịch title
                    // const vietnameseTitle = await translateWithGoogle(item.title, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `title_tintuc_${item.id}`, item.title);
                    // const englishTitle = await translateWithGoogle(item.title, 'English');
                    i18n.addResource('en', 'translation', `title_tintuc_${item.id}`, item.title_en);



                    // Dịch subtitle
                    // const vietnameseSubtitle = await translateWithGoogle(item.subtitle, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `subtitle_tintuc_${item.id}`, item.subtitle);
                    // const englishSubtitle = await translateWithGoogle(item.subtitle, 'English');
                    i18n.addResource('en', 'translation', `subtitle_tintuc_${item.id}`, item.subtitle_en);

                    // Dịch content
                    // const vietnameseContent = await translateWithGoogle(item.content, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `content_tintuc_${item.id}`, item.content);
                    // const englishContent = await translateWithGoogle(item.content, 'English');
                    i18n.addResource('en', 'translation', `content_tintuc_${item.id}`, item.content_en);

                }
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

    // const stripHtml = (html: string): string => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(html, 'text/html');
    //     return doc.body.textContent || '';
    // };

    // const location = useLocation();

    // const currentUrl = `${window.location.origin}${location.pathname}`;

    return (
        <>
            <Carousel2 name={t("newsAndEvent")} />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom m-12 c-12 l-9">
                        <div>
                            <Titlepage name={t("newsAndEvent")} />
                            <div className="danhsach-news">
                                {tintucs.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/tin-tuc/detail/${item.id}`} // <-- thêm ID vào URL
                                        state={{ newsItem: item, key: item.id }}        // vẫn giữ state để không cần gọi lại API nếu muốn
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Itemnews
                                            index={index}
                                            title={t(`title_tintuc_${item.id}`) ?? item.title} // Truyền title từ i18n nếu có, nếu không thì truyền title gốc
                                            time={item.postdate}
                                            img={`${SERVER}/${item.image}`}
                                            // desc={item.content}
                                            desc={t(`content_tintuc_${item.id}`) ?? item.content} // Truyền title từ i18n nếu có, nếu không thì truyền title gốc

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