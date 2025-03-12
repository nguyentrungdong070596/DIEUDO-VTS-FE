import React, { useEffect, useState } from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/gioithieucongty.scss'
import hoatieu1 from '../static/img/hoatieu1.png'
import hoatieu2 from '../static/img/hoatieu2.png'
import hoatieu3 from '../static/img/hoatieu3.png'
import hoatieu4 from '../static/img/hoatieu4.png'
import hoatieu5 from '../static/img/hoatieu5.png'
import hoatieu6 from '../static/img/hoatieu6.png'
import SidebarMenu from '../layout/Sidebar'
import Itemhoatieu from '../components/Itemhoatieu'
import Carousel2 from '../components/Carousel2'
import Apis, { endpoints } from '../configs/Apis'
import { Lichsu } from '../interface/InterfaceCommon'
import { stripHtml, stripHtmlWithFormat } from '../utils/textUtil'
import rehypeRaw from 'rehype-raw';

import ReactMarkdown from 'react-markdown';

const hoaTieuList = [
    { name: 'Vũ Ngọc An', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu1 },
    { name: 'Phạm Trung Tín', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu2 },
    { name: 'Võ Việt Đức', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu3 },
    { name: 'Nguyễn Đức Thịnh', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu4 },
    { name: 'Trần Nhật Khánh', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu5 },
    { name: 'Nguyễn Đình Chung', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu6 },

];
const Gioithieucongty = () => {

    const itemsPerPage = 6; // Limit gửi lên API
    const [gioithieu, setGioiThieu] = useState<Lichsu>();


    const loadLichsucongty = async () => {
        try {
            const params = { limit: 1000, page: 1, itemType: "7" };
            const response = await Apis.get(endpoints.APIItems, { params });



            if (response.data && Array.isArray(response.data.data)) {
                setGioiThieu(response.data.data[0]);
                console.log("ban lanxh dao", gioithieu)

                // Sử dụng totalRecords từ API
                // const total = response.data.totalRecords || response.data.data.length;

            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setGioiThieu(gioithieu);
            }
        } catch (error) {
            console.error("Lỗi khi load hoa tiêu:", error);
            setGioiThieu(gioithieu);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await loadLichsucongty();
        };

        fetchData();
    }, []);
    return (
        <>
            <Carousel2 name="CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU " />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <Titlepage name="CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU " />
                        <div className="hoa-tieu-container">


                            {
                                // stripHtmlWithFormat(gioithieu?.content || "")
                                // gioithieu?.content || ""

                                // < pre style={{ whiteSpace: 'pre-wrap' }}>
                                //     {stripHtmlWithFormat(gioithieu?.content || "")}
                                // </pre>
                                <div dangerouslySetInnerHTML={{ __html: gioithieu?.content || "" }} />


                                // <ReactMarkdown >{stripHtmlWithFormat(gioithieu?.content || "")}</ReactMarkdown>

                                // <div style={{ whiteSpace: 'pre-wrap' }}>
                                //     <ReactMarkdown>{stripHtmlWithFormat(gioithieu?.content || "")}</ReactMarkdown>
                                // </div>
                            }
                            {/* <p className="paragraph">
                                Xí nghiệp Hoa tiêu Vũng Tàu là đơn vị trực thuộc Công ty CP Dịch vụ và Vận tải biển Vũng Tàu, có bề dày kinh
                                nghiệm hoạt động trong lĩnh vực hoa tiêu hàng hải. Xí nghiệp Hoa tiêu Vũng Tàu được thành lập theo Quyết định số
                                236/QĐ-UBT ngày 5/5/1995 của UBND tỉnh BRVT. Theo Quyết định số 813/QĐ-CHHVNN ngày 01/01/2012, Xí nghiệp Hoa tiêu
                                Vũng Tàu thực hiện nhiệm vụ cung cấp dịch vụ hoa tiêu hàng hải trên các tuyến dẫn tàu:
                            </p>
                            <ul className="list">
                                <li>- Tuyến sông Dinh: từ vùng đón trả hoa tiêu đến các cảng trên sông Dinh/Gòi;</li>
                                <li>- Tuyến Vũng Tàu: từ vùng đón trả hoa tiêu đến các cảng trên sông Thị Vải – Cái Mép;</li>
                                <li>- Tuyến Côn Đảo: từ vùng đón trả hoa tiêu đến các cảng thuộc cụm cảng biển Côn Đảo;</li>
                                <li>- Tuyến quá cảnh lãnh thổ Việt Nam trên luồng sông tiễn từ Cửa Tiểu đến Vĩnh Xương.</li>
                            </ul>

                            <p className="paragraph">
                                <strong>Trụ sở:</strong> 88 Hải Long – Phường 1 – Tp.Vũng Tàu<br />
                                <strong>Điện thoại:</strong> 02543 810546 – 02543 810546 – 02543 810547 – 02543 810545<br />
                                <strong>Fax:</strong> 02543 850669
                            </p>

                            <h3 className="sub-title">Cơ cấu tổ chức</h3>
                            <p className="paragraph">Tổng số CBCNV trong xí nghiệp hiện nay là 111 người và được phân bổ như sau:</p>
                            <ul className="list">
                                <li>Hoa tiêu ngoài hạng: 30</li>
                                <li>Hoa tiêu hạng Nhất: 7</li>
                                <li>Hoa tiêu hạng Hai: 9</li>
                                <li>Hoa tiêu hạng Ba: 16</li>
                                <li>Thực tập hoa tiêu: 4</li>
                            </ul>
                            <p className="paragraph">
                                Các hoa tiêu đều được cấp Giấy chứng nhận khả năng chuyên môn hoa tiêu hàng hải và Giấy phép hoạt động hoa tiêu
                                hàng hải phù hợp với quy định hiện hành của Nhà nước. 16 hoa tiêu đã đi thực tập dẫn tàu lớn trên mô phỏng cảng SP
                                – PSA trên sông Thị Vải tại Trung tâm Star Cruises ở Malaysia.
                            </p>

                            <h3 className="sub-title">Khối hành chính: 37 người</h3>
                            <ul className="list">
                                <li>Tổ hành chính, kế toán: 5</li>
                                <li>Tổ điều độ: 12</li>
                                <li>Tổ bảo vệ, tạp vụ: 7</li>
                                <li>Tổ lái xe: 9</li>
                                <li>Tổ lai xưởng, cơ viễn: 4</li>
                            </ul>

                            <h3 className="sub-title">Khối phương tiện canô: 32 thuyền viên</h3>
                            <p className="paragraph">
                                Phương tiện dẫn đón hoa tiêu: Công ty đã có 07 xe ô tô 7 chỗ và 05 ca nô, trong đó có 01 ca nô cao tốc vỏ nhôm (trị
                                giá gần 10 tỷ đồng) đáp ứng mọi yêu cầu đưa đón hoa tiêu trên tất cả các tàu, kể cả tàu khách, tàu Container cỡ lớn.
                                Các phương tiện được trang bị đầy đủ thiết bị thông tin liên lạc như VHF, AIS nhằm giữ liên lạc thông suốt giữa các
                                phương tiện với các hoa tiêu đang dẫn tàu trên các tuyến luồng và các cơ quan, đơn vị có liên quan như: Cảng vụ hàng
                                hải, các cảng biển, trạm VTS…
                            </p>
                            <p className="paragraph">
                                Công ty đang đóng mới 01 ca nô cao tốc mới có chiều dài 18 mét, tổng mức đầu tư là 18,7 tỷ đồng, dự kiến đưa vào
                                hoạt động trong năm 2017, góp phần nâng cao chất lượng cung ứng dịch vụ hoa tiêu hàng hải.
                            </p>

                            <h3 className="sub-title">Một số chỉ tiêu nổi bật</h3>
                            <p className="paragraph">
                                Hàng năm XNHT dẫn an toàn 9.000 – 12.000 lượt tàu ra, vào các cảng trong khu vực. Năm 2014: 10.803 lượt tàu; năm
                                2015: 11.147 lượt tàu; năm 2016: 11.106 lượt tàu.
                            </p> */}
                        </div>
                    </div>

                </div>



            </div >
        </>


    )
}

export default Gioithieucongty