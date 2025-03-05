import React from 'react'
import '../static/css/itemgiadichvu.scss'
import { Button } from '@mui/material';

interface ItemgiadichvuProps {
    name: string;
    desc: string;
    img: string;
}

const Itemgiadichvu: React.FC<ItemgiadichvuProps> = ({ name, desc, img }) => {
    return (
        <div className="itemgiadichvu ">
            <img src={img} alt="Giá dịch vụ" />
            <div className="itemgiadichvu-info">
                <p className='itemgiadichvu-name'>{name}</p>
                <Button variant="outlined">Đọc thêm</Button>
            </div>
        </div>
    );
};

export default Itemgiadichvu