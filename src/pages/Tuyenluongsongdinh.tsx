import React from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/danhsachhoatieu.scss'

import SidebarMenu from '../layout/Sidebar'
import Itemhoatieu from '../components/Itemhoatieu'
import Carousel2 from '../components/Carousel2'
import { Link } from 'react-router-dom'




const Tuyenluongsongdinh = () => {
    return (
        <>
            <Carousel2 name="Tuyến Sông Dinh" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Tuyến Sông Dinh' />

                            <div className="danhsach-tuyenluong">
                                <img src="/tuyenluong1.png" alt="" />
                            </div>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Tuyenluongsongdinh