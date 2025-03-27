import Titlepage from '../components/Titlepage'
import '../static/css/tuyenluong.scss'

import SidebarMenu from '../layout/Sidebar'
import Carousel2 from '../components/Carousel2'
import { Link } from 'react-router-dom'



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
                                <p><span className="menu-icon">📍</span><Link to={'/tuyen-luong-con-dao'}>Tuyến Luồng Côn Đảo</Link></p>
                                <p><span className="menu-icon">📍</span><Link to={'/tuyen-luong-qua-canh-song-tien'}>Quá Cảnh Sông Tiền</Link></p>
                            </div>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Tuyenluong