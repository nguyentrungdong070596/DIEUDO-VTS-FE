import React from 'react'
import '../static/css/itemgiadichvu.scss'
import { Link } from 'react-router-dom';
// import { Button } from '@mui/material';

interface ItemgiadichvuProps {
    name: string;
    desc: string;
    img: string;
}

const Itemgiadichvu: React.FC<ItemgiadichvuProps> = ({ name, desc, img }) => {
    const item = {
        name: name,
        desc: desc,
        img: img
    }
    return (
        <div className="itemgiadichvu ">
            <img src={img} alt="Giá dịch vụ" />
            <div className="itemgiadichvu-info">
                <p className='itemgiadichvu-name'>{name}</p>
                {/* <Link to={`/gia-dich-vu/detail`} // Chỉ truyền pathname
                    state={{ giadichvuItem: item }}
                > */}
                <button className="custom-button">Đọc thêm</button>
                {/* </Link> */}
            </div>
        </div>
    );
};

export default Itemgiadichvu