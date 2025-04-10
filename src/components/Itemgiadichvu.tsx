import React from 'react'
import '../static/css/itemgiadichvu.scss'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';

interface ItemgiadichvuProps {
    name: string;
    img: string;

    index?: number; // truyền từ component cha để tính delay
}

const Itemgiadichvu: React.FC<ItemgiadichvuProps> = ({ name, img, index = 0 }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            className="itemgiadichvu"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
        >
            <img src={img} alt="Giá dịch vụ" />
            <div className="itemgiadichvu-info">
                <p className='itemgiadichvu-name'>{name}</p>
                <button className="custom-button">{t("viewDetail")}</button>
            </div>
        </motion.div>
    );
};

export default Itemgiadichvu;
