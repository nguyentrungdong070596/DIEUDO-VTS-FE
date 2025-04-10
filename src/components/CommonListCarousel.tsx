import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../static/css/commonlistcarousel.scss';

interface CommonListCarouselProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    getLinkPath?: (item: T) => string;
    getLinkState?: (item: T) => any;
    onItemClick?: (item: T) => void;
    imageBaseUrl?: string;
}

const CommonListCarousel = <T,>({
    items,
    renderItem,
    getLinkPath,
    getLinkState,
    onItemClick,
}: CommonListCarouselProps<T>) => {
    const [visibleSlides, setVisibleSlides] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateVisibleSlides = () => {
            const width = window.innerWidth;
            if (width <= 768) setVisibleSlides(1);
            else if (width <= 1024) setVisibleSlides(2);
            else setVisibleSlides(3);
        };
        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    const clonedHead = items.slice(-visibleSlides);
    const clonedTail = items.slice(0, visibleSlides);
    const allItems = [...clonedHead, ...items, ...clonedTail];

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

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isTransitioning) {
            const timeout = setTimeout(() => setIsTransitioning(true), 20);
            return () => clearTimeout(timeout);
        }
    }, [isTransitioning]);

    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    } else {
                        setIsVisible(false);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`custom-carousel ${isVisible ? 'animate__animated animate__lightSpeedInLeft' : 'opacity-0'}`}
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
                                    to={getLinkPath ? getLinkPath(item) : '#'}
                                    // to='/hoat-dong-cong-ty/detail/10042'
                                    state={getLinkState ? getLinkState(item) : undefined}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    {renderItem(item)}
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

export default CommonListCarousel;
