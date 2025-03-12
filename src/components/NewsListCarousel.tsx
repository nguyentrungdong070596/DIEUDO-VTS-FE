// NewsListCarousel.tsx
import React, { useState, useEffect, useRef } from 'react';
import Newshome from './NewsBaiDangLienQuan';
import { Tintuc } from '../interface/InterfaceCommon';
import '../static/css/newslistcarousel.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import NewsDichVuBaiDangLienQuan from './NewsBaiDangLienQuan';

interface NewsListCarouselProps {
    items: Tintuc[];
    onItemClick?: (item: Tintuc) => void;
    imageBaseUrl?: string;
}

const NewsListCarousel: React.FC<NewsListCarouselProps> = ({
    items,
    onItemClick,
    imageBaseUrl = '',
}) => {
    const [visibleSlides, setVisibleSlides] = useState(3); // default 3
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const trackRef = useRef<HTMLDivElement>(null);

    // ✨ Update visibleSlides based on screen size
    useEffect(() => {
        const updateVisibleSlides = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setVisibleSlides(1); // Mobile
            } else if (width <= 1024) {
                setVisibleSlides(2); // Laptop
            } else {
                setVisibleSlides(3); // Desktop
            }
        };

        updateVisibleSlides(); // Initial
        window.addEventListener('resize', updateVisibleSlides);
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    // Clone head & tail items based on visibleSlides
    const clonedHead = items.slice(-visibleSlides);
    const clonedTail = items.slice(0, visibleSlides);
    const allItems = [...clonedHead, ...items, ...clonedTail];

    // Reset index if visibleSlides changes
    useEffect(() => {
        setCurrentIndex(visibleSlides);
    }, [visibleSlides, items]);


    const next = () => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
    };

    const prev = () => {
        setCurrentIndex((prev) => prev - 1);
        setIsTransitioning(true);
    };

    const handleTransitionEnd = () => {
        if (currentIndex >= items.length + visibleSlides) {
            setIsTransitioning(false);
            setCurrentIndex(visibleSlides);
        }
        if (currentIndex < visibleSlides) {
            setIsTransitioning(false);
            setCurrentIndex(items.length + visibleSlides - 1);
        }
    };

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (!isTransitioning) {
            const timeout = setTimeout(() => {
                setIsTransitioning(true);
            }, 20);
            return () => clearTimeout(timeout);
        }
    }, [isTransitioning]);

    return (
        <div className="custom-carousel">
            <div className="carousel-wrapper">
                <div className="carousel-track-wrapper">
                    <button className="nav-btn prev" onClick={prev}>
                        <FiChevronLeft size={24} />
                    </button>
                    <div
                        ref={trackRef}
                        className="carousel-track"
                        style={{
                            width: `${(allItems.length / visibleSlides) * 100}%`,
                            display: 'flex',
                            transform: `translateX(-${(100 / allItems.length) * currentIndex}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {allItems.map((item, index) => (
                            <div
                                key={index}
                                className="carousel-slide"
                                style={{ width: `${100 / allItems.length}%` }}
                                onClick={() => onItemClick?.(item)}
                            >

                                <Link
                                    key={index}
                                    to={`/tin-tuc/detail`} // Chỉ truyền pathname
                                    state={{ newsItem: item }} // Truyền state riêng (v6)
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => window.scrollTo(0, 0)} // ✅ scroll lên đầu ngay khi click

                                >
                                    {/* <Itemnews
                                        title={item.title}
                                        time={item.postdate}
                                        img={`${SERVER}/${item.image}`}
                                        desc={stripHtml(item.content)}

                                    /> */}

                                    <NewsDichVuBaiDangLienQuan
                                        title={item.title}


                                        desc={(item.content)}
                                        time={item.postdate}
                                        img={`${imageBaseUrl}/${item.image}`}
                                    />
                                </Link>

                            </div>
                        ))}
                    </div>
                    <button className="nav-btn next" onClick={next}>
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsListCarousel;
