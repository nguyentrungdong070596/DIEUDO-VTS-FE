import React from 'react'
import '../static/css/itemhoatieu.scss'

interface ItemhoatieuProps {
    name: string;
    chucdanh: string;
    img: string;
}

const Itemhoatieu: React.FC<ItemhoatieuProps> = ({ name, chucdanh, img }) => {
    return (
        <div className="itemhoatieu ">
            <img src={img} alt="Hoa tiêu" />
            <div className="itemhoatieu-info">
                <p className='itemhoatieu-name'>{name}</p>
                <p>{chucdanh}</p>
            </div>
        </div>
    );
};

export default Itemhoatieu