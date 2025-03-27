import Titlepage from '../components/Titlepage'
import '../static/css/danhsachhoatieu.scss'

import SidebarMenu from '../layout/Sidebar'
import Carousel2 from '../components/Carousel2'




const Tuyenluongthivai = () => {
    return (
        <>
            <Carousel2 name="Tuyến luồng thị vải - vũng tàu" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Tuyến luồng thị vải vũng tàu' />

                            <div className="danhsach-tuyenluong">
                                <img src="/tuyenluongthivai.png" alt="" />
                            </div>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Tuyenluongthivai