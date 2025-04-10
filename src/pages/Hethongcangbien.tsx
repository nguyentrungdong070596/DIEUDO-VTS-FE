import { useEffect, useState } from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/hethongcangbien.scss'

import SidebarMenu from '../layout/Sidebar'
import Carousel2 from '../components/Carousel2'
import Apis, { endpoints, SERVER } from '../configs/Apis'
import { HeThongCangBien } from '../interface/InterfaceCommon'
import { AiFillFilePdf, AiFillFileWord } from 'react-icons/ai'
import { FaHandPointRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Hethongcangbien = () => {
    const { t } = useTranslation();
    // const documentUrl = "/CHUONG 6 - CAC VAN DE MARKETING.pdf";
    const [hethongcangbien, setGioDieuDong] = useState<HeThongCangBien[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await loadGiodieudong();
        };
        fetchData();
    }, []);

    const loadGiodieudong = async () => {
        try {
            const params = { limit: 1000, page: 1, itemType: "15" };
            const response = await Apis.get(endpoints.APIItems, { params });

            if (response.data && Array.isArray(response.data.data)) {
                setGioDieuDong(response.data.data);


            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setGioDieuDong([]);
            }
        } catch (error) {
            console.error("Lỗi khi load hoa tiêu:", error);
            setGioDieuDong([]);
        }
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <Carousel2 name={t("seaportSystem")} />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className='col-custom m-12 c-12 l-9'>
                        <div className=''>
                            <Titlepage name={t("seaportSystem")} />

                            {hethongcangbien.length > 0 ? (
                                <div className="attention-wrapper">

                                    <span className="hand-pointer"><FaHandPointRight /></span>

                                    <a
                                        href={`${SERVER}/${hethongcangbien[0].pdfurl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-pdf-link"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <span className="btn-content">
                                            {isHovered ? (
                                                <>
                                                    <AiFillFileWord className="btn-icon" />
                                                    <span className="btn-text">Xem Word</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AiFillFilePdf className="btn-icon" />
                                                    <span className="btn-text">Xem PDF</span>
                                                </>
                                            )}
                                        </span>
                                    </a>
                                </div>
                            ) : (
                                <p>{t("dangtaidulieu")}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Hethongcangbien
