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
import Carousel2 from '../components/Carousel2'



const hoaTieuList = [
    { name: 'Vũ Ngọc An', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu1 },
    { name: 'Phạm Trung Tín', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu2 },
    { name: 'Võ Việt Đức', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu3 },
    { name: 'Nguyễn Đức Thịnh', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu4 },
    { name: 'Trần Nhật Khánh', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu5 },
    { name: 'Nguyễn Đình Chung', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu6 },

];
const Danhsachhoatieu = () => {
    return (
        <>
            <Carousel2 name="Danh sách hoa tiêu" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Danh sách hoa tiêu' />

                            <div className="danhsach-hoatieu">
                                {hoaTieuList.map((item, index) => (
                                    <Itemhoatieu key={index} name={item.name} chucdanh={item.chucdanh} img={item.img} />
                                ))}
                            </div>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Danhsachhoatieu