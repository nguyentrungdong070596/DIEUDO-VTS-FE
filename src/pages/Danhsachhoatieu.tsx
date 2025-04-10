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
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Danhsachhoatieu: React.FC = () => {
    const [hoatieus, setHoatieu] = useState<HoaTieu[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 6;
    const { t } = useTranslation();


    const loadHoatieu = async (page: number) => {
        try {
            const params = { limit: itemsPerPage, page };
            const response = await Apis.get(endpoints.APIHoaTieu, { params });

            if (response.data && Array.isArray(response.data.data)) {
                setHoatieu(response.data.data);
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
  

   


    // async function translateAndStore(text: any, targetLang: any) {
    //     try {
    //         const [translation] = await translate.translate(text, targetLang);
    //         // Thêm bản dịch vào i18next
    //         i18n.addResource(targetLang, 'translation', text, translation);
    //         return translation;
    //     } catch (error) {
    //         console.error('Error translating:', error);
    //         return text; // Trả về text gốc nếu lỗi
    //     }
    // }

    // const changeLanguage = (lang) => {
    //     i18n.changeLanguage(lang);
    // };

    useEffect(() => {
        loadHoatieu(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        });

    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <>
            <Carousel2 name={t("pilotList")} />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className="col-custom m-12 c-12 l-9">
                        <Titlepage name={t("pilotList")} />
                        <motion.div
                            className="danhsach-hoatieu"
                            key={currentPage}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {hoatieus.map((item, index) => (
                                <Itemhoatieu
                                    key={index}
                                    index={index}
                                    name={item.name}
                                    chucdanh={item.rank}
                                    img={`${SERVER}/${item.image}`}
                                />
                            ))}
                        </motion.div>

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
