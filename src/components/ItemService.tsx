import React from 'react'
import '../static/css/itemservice.scss'
import '../static/css/gridme.scss'


interface ItemgiadichvuProps {
    name: string;
    desc: string;
    img: string;
}

const ItemService: React.FC<ItemgiadichvuProps> = ({ name, desc, img }) => {
    return (
        <div className="service-item col-custom l-4 m-12 c-12">
            <img src={img} alt="service" />

            <div className="service-info">
                <p className="service-name">{name}</p>
                <p className="service-content">{desc}</p>
                <a className="service-button-detail" href="#">XEM CHI TIẾT</a>

            </div>
        </div>
    )
}

export default ItemService