import React from 'react';
import '../static/css/itemphuongtien.scss';

interface ItemphuongtienProps {
    name: string;
    img: string;
}

const Itemphuongtien: React.FC<ItemphuongtienProps> = ({ name, img }) => {
    return (
        <div className="itemphuongtien">
            <div className="image-wrapper">
                <img src={img} alt={name} />
            </div>
            <div className="itemphuongtien-info">
                <p className="itemphuongtien-name">{name}</p>
            </div>
        </div>
    );
};

export default Itemphuongtien;
