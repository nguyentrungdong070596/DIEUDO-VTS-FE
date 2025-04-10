import React, { useEffect, useRef, useState } from 'react';
import '../static/css/itemservice.scss';
import '../static/css/gridme.scss';
import { useTranslation } from 'react-i18next';

interface ItemgiadichvuProps {
    name: string;
    desc: string;
    img: string;
}

const ItemService: React.FC<ItemgiadichvuProps> = ({ name, desc, img }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false); // nếu muốn chạy lại mỗi lần scroll, giữ false
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`service-item ${isVisible ? 'animate' : ''}`}>
            <img src={img} alt="service" />
            <div className="service-info">
                <p className="service-name">{name}</p>
                <p className="service-content" dangerouslySetInnerHTML={{ __html: desc }} />
                <a className="service-button-detail" href="#">{t("viewDetail")}</a>
            </div>
        </div>
    );
};

export default ItemService;
