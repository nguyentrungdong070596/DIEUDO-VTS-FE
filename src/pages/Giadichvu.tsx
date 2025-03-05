import React from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/danhsachhoatieu.scss'
import hoatieu1 from '../static/img/hoatieu1.png'
import hoatieu2 from '../static/img/hoatieu2.png'
import hoatieu3 from '../static/img/hoatieu3.png'
import hoatieu4 from '../static/img/hoatieu4.png'
import hoatieu5 from '../static/img/hoatieu5.png'
import hoatieu6 from '../static/img/hoatieu6.png'
import giadichvu1 from '../static/img/giadichvu1.png'
import giadichvu2 from '../static/img/giadichvu2.png'
import giadichvu3 from '../static/img/giadichvu3.png'
import giadichvu4 from '../static/img/giadichvu4.png'
import SidebarMenu from '../layout/Sidebar'
import Carousel2 from '../components/Carousel2'
import Itemgiadichvu from '../components/Itemgiadichvu'



const giaDichVuList = [
    { name: 'Vũ Ngọc An', desc: 'Hoa tiêu ngoại hạng', img: giadichvu1 },
    { name: 'Phạm Trung Tín', desc: 'Hoa tiêu ngoại hạng', img: giadichvu2 },
    { name: 'Võ Việt Đức', desc: 'Hoa tiêu ngoại hạng', img: giadichvu3 },
    { name: 'Nguyễn Đức Thịnh', desc: 'Hoa tiêu ngoại hạng', img: giadichvu4 },
    { name: 'Trần Nhật Khánh', desc: 'Hoa tiêu ngoại hạng', img: giadichvu1 },
    { name: 'Nguyễn Đình Chung', desc: 'Hoa tiêu ngoại hạng', img: giadichvu3 },

];
const Giadichvu = () => {
    return (
        <>
            <Carousel2 name="Bảng giá dịch vụ" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Bảng giá dịch vụ' />

                            <div className="danhsach-hoatieu">
                                {giaDichVuList.map((item, index) => (
                                    <Itemgiadichvu key={index} name={item.name} desc={item.desc} img={item.img} />
                                ))}
                            </div>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Giadichvu