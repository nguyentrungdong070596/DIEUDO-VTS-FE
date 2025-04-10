// NewsListCarousel.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Tintuc } from '../interface/InterfaceCommon';
import '../static/css/newslistcarousel.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import NewsDichVuBaiDangLienQuan from './NewsBaiDangLienQuan';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

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


    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                    else {
                        setIsVisible(false); // để khi scroll ra khỏi, lần sau vào lại sẽ trigger lại animation

                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);


    return (
        <div
            ref={sectionRef}
            className={`custom-carousel ${isVisible ? 'animate__animated animate__lightSpeedInLeft' : 'opacity-0'}`}
        // className="custom-carousel animate__animated animate__lightSpeedInLeft"
        >
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
                                    to={`/tin-tuc/detail/${item.id}`} // Chỉ truyền pathname
                                    state={{ newsItem: item, key: item.id }} // Truyền state riêng (v6)
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
                                        title={t(`title_tintuc_${item.id}`)}
                                        // title={item.title}


                                        desc={t(`content_tintuc_${item.id}`)}
                                        // desc={t(`content_tintuc_${item.id}`)}
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
        </div >
    );
};

export default NewsListCarousel;
