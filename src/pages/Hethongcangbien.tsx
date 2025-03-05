import React from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/danhsachhoatieu.scss'
import hoatieu1 from '../static/img/hoatieu1.png'
import hoatieu2 from '../static/img/hoatieu2.png'
import hoatieu3 from '../static/img/hoatieu3.png'
import hoatieu4 from '../static/img/hoatieu4.png'
import hoatieu5 from '../static/img/hoatieu5.png'
import hethongcangbienimg from '../static/img/hethongcangbien1.png'
import SidebarMenu from '../layout/Sidebar'
import Itemhoatieu from '../components/Itemhoatieu'
import Carousel2 from '../components/Carousel2'




const Hethongcangbien = () => {
    return (
        <>
            <Carousel2 name="Hệ thống cảng biển" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Hệ thống cảng biển' />

                            <img src={hethongcangbienimg} alt="" />

                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Hethongcangbien