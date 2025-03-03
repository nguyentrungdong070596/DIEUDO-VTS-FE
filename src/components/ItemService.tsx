import React from 'react'
import '../static/css/itemservice.scss'
const ItemService = () => {
    return (
        <div className="service-item col-custom l-4 m-12 c-12">
            <img src="/tau1.png" />

            <div className="service-info">
                <p className="service-name">Hoa Tiêu Hàng Hải</p>
                <p className="service-content">Đại lý Hải quan hàng hóa Xuất nhập khẩu : Bà Rịa - Vũng Tàu , Tp.Hồ Chí Minh, Đồng Nai , Bình Dương , Long An.</p>
                <a className="service-button-detail" href="#">XEM CHI TIẾT</a>

            </div>
        </div>
    )
}

export default ItemService