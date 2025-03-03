import React from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/danhsachhoatieu.scss'
import hoatieu1 from '../static/img/hoatieu1.png'
import hoatieu2 from '../static/img/hoatieu2.png'
import hoatieu3 from '../static/img/hoatieu3.png'
import hoatieu4 from '../static/img/hoatieu4.png'
import hoatieu5 from '../static/img/hoatieu5.png'
import hoatieu6 from '../static/img/hoatieu6.png'
import SidebarMenu from '../layout/Sidebar'
import Itemhoatieu from '../components/Itemhoatieu'
import news1 from '../static/img/news1.png'
import Carousel2 from '../components/Carousel2'
import Itemnews from '../components/Itemnews'


const hoaTieuList = [
    {
        title: 'GẶP GỠ LÃNH ĐẠO 25/5/2024 | BR-VT PHÁT TRIỂN NGÀNH DỊCH VỤ HỖ TRỢ KINH TẾ HÀNG HẢI',
        desc: ' Trong hai ngày 29 - 30/3, siêu tàu container M/V OOCL SPAIN đã cập cảng Gemalink (cụm cảng Cái Mép - Thị Vải, thị xã Phú Mỹ, tỉnh Bà Rịa - Vũng Tàu) an toàn, hoàn tất quá trình xếp dỡ hàng hóa và siêu tàu M/V OOCL SPAIN xuất bến hành trình đến Singapore..',
        img: news1,
        time: '2024-03-03 10:00'
    },
    {
        title: 'GẶP GỠ LÃNH ĐẠO 25/5/2024 | BR-VT PHÁT TRIỂN NGÀNH DỊCH VỤ HỖ TRỢ KINH TẾ HÀNG HẢI',
        desc: ' Trong hai ngày 29 - 30/3, siêu tàu container M/V OOCL SPAIN đã cập cảng Gemalink (cụm cảng Cái Mép - Thị Vải, thị xã Phú Mỹ, tỉnh Bà Rịa - Vũng Tàu) an toàn, hoàn tất quá trình xếp dỡ hàng hóa và siêu tàu M/V OOCL SPAIN xuất bến hành trình đến Singapore..',
        img: news1,
        time: '2024-03-02 15:30'
    },
    {
        title: 'GẶP GỠ LÃNH ĐẠO 25/5/2024 | BR-VT PHÁT TRIỂN NGÀNH DỊCH VỤ HỖ TRỢ KINH TẾ HÀNG HẢI',
        desc: ' Trong hai ngày 29 - 30/3, siêu tàu container M/V OOCL SPAIN đã cập cảng Gemalink (cụm cảng Cái Mép - Thị Vải, thị xã Phú Mỹ, tỉnh Bà Rịa - Vũng Tàu) an toàn, hoàn tất quá trình xếp dỡ hàng hóa và siêu tàu M/V OOCL SPAIN xuất bến hành trình đến Singapore..',
        img: news1,
        time: '2024-03-02 15:30'
    },
    {
        title: 'GẶP GỠ LÃNH ĐẠO 25/5/2024 | BR-VT PHÁT TRIỂN NGÀNH DỊCH VỤ HỖ TRỢ KINH TẾ HÀNG HẢI',
        desc: ' Trong hai ngày 29 - 30/3, siêu tàu container M/V OOCL SPAIN đã cập cảng Gemalink (cụm cảng Cái Mép - Thị Vải, thị xã Phú Mỹ, tỉnh Bà Rịa - Vũng Tàu) an toàn, hoàn tất quá trình xếp dỡ hàng hóa và siêu tàu M/V OOCL SPAIN xuất bến hành trình đến Singapore..',
        img: news1,
        time: '2024-03-02 15:30'
    },
    {
        title: 'GẶP GỠ LÃNH ĐẠO 25/5/2024 | BR-VT PHÁT TRIỂN NGÀNH DỊCH VỤ HỖ TRỢ KINH TẾ HÀNG HẢI',
        desc: ' Trong hai ngày 29 - 30/3, siêu tàu container M/V OOCL SPAIN đã cập cảng Gemalink (cụm cảng Cái Mép - Thị Vải, thị xã Phú Mỹ, tỉnh Bà Rịa - Vũng Tàu) an toàn, hoàn tất quá trình xếp dỡ hàng hóa và siêu tàu M/V OOCL SPAIN xuất bến hành trình đến Singapore..',
        img: news1,
        time: '2024-03-02 15:30'
    },

];
const News = () => {
    return (
        <>
            <Carousel2 name="TIN TỨC" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='TIN TỨC' />

                            <div className="danhsach-news">
                                {hoaTieuList.map((item, index) => (
                                    <Itemnews key={index} title={item.title} time={item.time} img={item.img} desc={item.desc} />
                                ))}
                            </div>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default News