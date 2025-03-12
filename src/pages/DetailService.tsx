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
import news1 from '../static/img/tau2.png'
import Carousel2 from '../components/Carousel2'
import Itemnews from '../components/Itemnews'
import '../static/css/newsdetail.scss'

const DetailService = () => {
    return (
        <>
            <Carousel2 name="DỊCH VỤ" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <Titlepage name='Chi tiết dịch vụ' />

                        <div className='detail-news'>



                            <img src={news1} alt="hình chi tiết" />
                            <p>
                                Đội ngũ hoa tiêu 100% Hoa Tiêu tốt nghiệp khoa Điều Khiển Tàu Biển trường Đại Học Hàng Hải...
                            </p>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default DetailService