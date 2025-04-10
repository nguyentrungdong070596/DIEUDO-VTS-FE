import React from 'react';
import { motion } from 'framer-motion';
import '../static/css/itemhoatieu.scss';

interface ItemhoatieuProps {
    name: string;
    chucdanh: string;
    img: string;
    index?: number;
}


const Itemhoatieu: React.FC<ItemhoatieuProps> = ({ name, chucdanh, img, index = 0 }) => {
    return (
        <motion.div className="itemhoatieu" initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}>
            <img src={img} alt="Hoa tiêu" />
            <div className="itemhoatieu-info">
                <p className="itemhoatieu-name">{name}</p>
                <p>{chucdanh}</p>
            </div>
        </motion.div>
    );
};

export default Itemhoatieu;
