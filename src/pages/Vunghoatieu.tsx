import React from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/vunghoatieu.scss'
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
const Vunghoatieu = () => {
    return (
        <>
            <Carousel2 name="Vùng hoa tiêu" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Vùng hoa tiêu' />

                            <div className="container">

                                <img src="/mapvietnam.png" alt="Bản đồ vùng hoa tiêu" className="hoa-tieu-image" />

                                <div className="vung-section">
                                    <strong>Vùng 1: Vùng hoa tiêu bắt buộc từ tỉnh Quảng Ninh đến tỉnh Nam Định:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Quảng Ninh, Thái Bình, Nam Định và thành phố Hải Phòng.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 2: Vùng hoa tiêu bắt buộc từ tỉnh Thanh Hóa đến tỉnh Quảng Trị:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Thanh Hóa, Nghệ An, Hà Tĩnh, Quảng Bình và Quảng Trị.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 3: Vùng hoa tiêu bắt buộc từ tỉnh Thừa Thiên Huế đến tỉnh Quảng Ngãi:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Thừa Thiên Huế, Đà Nẵng và Quảng Ngãi.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 4: Vùng hoa tiêu bắt buộc từ tỉnh Bình Định đến tỉnh Phú Yên:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Bình Định và Phú Yên.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 5: Vùng hoa tiêu bắt buộc từ tỉnh Khánh Hòa đến tỉnh Ninh Thuận:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Khánh Hòa và Ninh Thuận.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 6: Vùng hoa tiêu bắt buộc địa phận các tỉnh Bình Thuận, Bà Rịa – Vũng Tàu, Đồng Nai, Bình Dương, Long An, thành phố Hồ Chí Minh và các tuyến đón theo sông Tiền:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Bình Thuận, Bà Rịa – Vũng Tàu, Đồng Nai, Bình Dương, thành phố Hồ Chí Minh và các tuyến theo sông Tiền.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 7: Vùng hoa tiêu bắt buộc các tỉnh theo sông Hậu, các tỉnh Kiên Giang và Cà Mau:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh thuộc theo sông Hậu và các tỉnh thuộc tỉnh Sóc Trăng, Bạc Liêu, Kiên Giang và Cà Mau.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 8: Vùng hoa tiêu bắt buộc tại các khu vực khai thác dầu khí ngoài khơi trong vùng biển Việt Nam:</strong>
                                    Từ các vùng đón trả hoa tiêu vào các cảng biển, bến cảng, cầu cảng dầu khí ngoài khơi, các công trình dầu khí tại các mỏ khai thác dầu khí trên vùng biển Việt Nam.
                                </div>
                            </div>


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Vunghoatieu