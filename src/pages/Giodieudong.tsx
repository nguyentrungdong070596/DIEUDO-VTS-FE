import React, { Suspense, useEffect, useState } from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/giodieudong.scss'
import hoatieu1 from '../static/img/hoatieu1.png'
import hoatieu2 from '../static/img/hoatieu2.png'
import hoatieu3 from '../static/img/hoatieu3.png'
import hoatieu4 from '../static/img/hoatieu4.png'
import hoatieu5 from '../static/img/hoatieu5.png'
import hoatieu6 from '../static/img/hoatieu6.png'
import SidebarMenu from '../layout/Sidebar'
import Itemhoatieu from '../components/Itemhoatieu'
import Carousel2 from '../components/Carousel2'
import DocViewerComponent from '../components/DocViewerComponent'
import Apis, { endpoints, SERVER } from '../configs/Apis'
import { GioDieuDong } from '../interface/InterfaceCommon'
import { AiFillFilePdf, AiFillFileWord } from 'react-icons/ai'
// import DocViewerComponent from '../components/DocViewerComponent'
import { FaHandPointRight } from 'react-icons/fa';



const Giodieudong = () => {
    // const documentUrl = "https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_about.pdf"; // Ví dụ PDF
    const documentUrl = "/CHUONG 6 - CAC VAN DE MARKETING.pdf"; // Ví dụ PDF
    const [giodieudong, setGioDieuDong] = useState<GioDieuDong[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await loadGiodieudong();
        };
        fetchData();
    }, []);

    const loadGiodieudong = async () => {
        try {
            const params = { limit: 1000, page: 1, itemType: "12", showHiddenItem: true };
            const response = await Apis.get(endpoints.APIManeuveringDraft, { params });



            if (response.data && Array.isArray(response.data.data)) {
                setGioDieuDong(response.data.data);


                // Sử dụng totalRecords từ API
                const total = response.data.totalRecords || response.data.data.length;

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
            <Carousel2 name="Giờ điều động mớn nước" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Giờ điều động mớn nước' />

                            {giodieudong.length > 0 ? (
                                // <DocViewerComponent documentUrl={`${SERVER}/${giodieudong[0].pdfurl}`} />

                                // <DocViewerComponent documentUrl={documentUrl} />
                                <div className="attention-wrapper">
                                    {/* <span className="hand-pointer">👉</span> */}

                                    <span className="hand-pointer"><FaHandPointRight /></span>

                                    <a
                                        href={`${SERVER}/${giodieudong[0].pdfurl}`}
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
                                <p>Đang tải tài liệu...</p>
                            )}

                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Giodieudong