import React from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/tuyenluong.scss'
import hoatieu1 from '../static/img/hoatieu1.png'
import hoatieu2 from '../static/img/hoatieu2.png'
import hoatieu3 from '../static/img/hoatieu3.png'
import hoatieu4 from '../static/img/hoatieu4.png'
import hoatieu5 from '../static/img/hoatieu5.png'
import hoatieu6 from '../static/img/hoatieu6.png'
import SidebarMenu from '../layout/Sidebar'
import Itemhoatieu from '../components/Itemhoatieu'
import Carousel2 from '../components/Carousel2'
import { Link } from 'react-router-dom'



const hoaTieuList = [
    { name: 'Vũ Ngọc An', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu1 },
    { name: 'Phạm Trung Tín', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu2 },
    { name: 'Võ Việt Đức', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu3 },
    { name: 'Nguyễn Đức Thịnh', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu4 },
    { name: 'Trần Nhật Khánh', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu5 },
    { name: 'Nguyễn Đình Chung', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu6 },

];
const Tuyenluong = () => {
    return (
        <>
            <Carousel2 name="Tuyến luồng" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Tuyến luồng' />

                            <div className="danhsach-tuyenluong">
                                <p><span className="menu-icon">📍</span><Link to={'/tuyen-luong-thi-vai'}>Tuyến luồng thị vải Vũng tàu</Link></p>
                                <p><span className="menu-icon">📍</span><Link to={'/tuyen-luong-song-dinh'}>Tuyến luồng sông Dinh</Link></p>
                                <p><span className="menu-icon">📍</span><Link to={'/tuyen-luong-thi-vai'}>Tuyến Luồng Côn Đảo</Link></p>
                                <p><span className="menu-icon">📍</span><Link to={'/tuyen-luong-thi-vai'}>Quá Cảnh Sông Tiền</Link></p>
                            </div>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Tuyenluong