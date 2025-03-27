import { useEffect, useState } from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/lichthuytrieu.scss'

import SidebarMenu from '../layout/Sidebar'
import Carousel2 from '../components/Carousel2'
import Apis, { endpoints, SERVER } from '../configs/Apis'
import { LichThuyTrieu } from '../interface/InterfaceCommon'
import { AiFillFilePdf, AiFillFileWord } from 'react-icons/ai'

const Lichthuytrieu = () => {
    // const documentUrl = "/CHUONG 6 - CAC VAN DE MARKETING.pdf";
    const [lichthuytrieu, setLichthuytrieu] = useState<LichThuyTrieu[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await loadthuytrieu();
        };
        fetchData();
    }, []);

    const loadthuytrieu = async () => {
        try {
            const params = { limit: 10000, page: 1, itemType: "16", showHiddenItem: true };
            const response = await Apis.get(endpoints.APITide, { params });

            if (response.data && Array.isArray(response.data.data)) {
                setLichthuytrieu(response.data.data);

            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setLichthuytrieu([]);
            }
        } catch (error) {
            console.error("Lỗi khi load hoa tiêu:", error);
            setLichthuytrieu([]);
        }
    };

    const [isHovered, setIsHovered] = useState<number | null>(null);

    return (
        <>
            <Carousel2 name="Lịch thủy triều" />
            <div className="gridme wide">
                <div className="row">
                    <SidebarMenu />
                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>
                            <Titlepage name='Lịch thủy triều' />

                            {lichthuytrieu.length > 0 ? (
                                lichthuytrieu.map((item, index) => (

                                    <div key={index} className="item-pdf-wrapper">
                                        <p className="file-title">{item.title}</p>

                                        <a
                                            href={`${SERVER}/${item.pdfurl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-pdf-link-lichthuytrieu"
                                            onMouseEnter={() => setIsHovered(index)}
                                            onMouseLeave={() => setIsHovered(null)}
                                        >
                                            <span className="btn-content">
                                                {isHovered === index ? (
                                                    <>
                                                        <AiFillFilePdf className="btn-icon" />
                                                        <span className="btn-text">Xem PDF</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <AiFillFileWord className="btn-icon" />
                                                        <span className="btn-text">Xem Word</span>
                                                    </>
                                                )}
                                            </span>
                                        </a>
                                    </div>
                                ))
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

export default Lichthuytrieu
