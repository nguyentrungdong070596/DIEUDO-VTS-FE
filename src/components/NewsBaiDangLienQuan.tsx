import React from 'react'
import '../static/css/itemnewshome.scss'
import { Tintuc } from '../interface/InterfaceCommon'
interface ItemnewsProps {
    title: string;
    desc: string;
    img: string;
    time: string;
}
const NewsDichVuBaiDangLienQuan: React.FC<ItemnewsProps> = ({ title, time, img }) => {


    return (
        <div className="item-news-home">
            <div className="item-news-img-home" >
                <img src={img} alt="news" />
            </div>
            <div className="item-news-content-home">
                <p className="item-news-time-home">{time}</p>
                <h3 className="item-news-title-home">{title}</h3>
                <button>Đọc thêm</button>
                {/* <p className="item-news-desc">{desc}</p> */}
            </div>

        </div>
    )
}

export default NewsDichVuBaiDangLienQuan