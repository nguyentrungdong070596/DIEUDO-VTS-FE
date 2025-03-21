import { useState, useEffect, useMemo, useRef } from 'react';
import { useTransition, animated, AnimatedProps } from '@react-spring/web';
import { HoatDongCongTy } from '../interface/InterfaceCommon';
import { SERVER } from '../configs/Apis';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ScrollToTop from './ScrollToTop';

type MasonryProps = {
    data: HoatDongCongTy[];
};

function AlbumHoatdongcongtyMansonryCommon({ data }: MasonryProps) {
    type AnimatedDivProps = AnimatedProps<React.HTMLAttributes<HTMLDivElement>>;
    const AnimatedDiv = animated.div as React.FC<AnimatedDivProps>;

    const [columns, setColumns] = useState<number>(2);
    const [width, setWidth] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }, [data, currentPage]);

    // Random animation transforms
    const randomTransforms = useMemo(() => {
        const transforms: Record<number, string> = {};
        data.forEach((item) => {
            const translateX = Math.random() * 100 - 50;
            const translateY = Math.random() * 100 - 50;
            const rotate = Math.random() * 20 - 10;
            const scale = 0.8 + Math.random() * 0.4;
            transforms[item.id] = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
        });
        return transforms;
    }, [data]);

    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth >= 1500) setColumns(5);
            else if (window.innerWidth >= 1000) setColumns(4);
            else if (window.innerWidth >= 600) setColumns(3);
            else setColumns(1);
        };
        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const gap = 16;

    const [heights, gridItems] = useMemo(() => {
        const heights = new Array(columns).fill(0);
        const items = paginatedData.map((item) => {
            const column = heights.indexOf(Math.min(...heights));
            const x = ((width - (columns - 1) * gap) / columns) * column + gap * column;
            const y = heights[column];
            const itemHeight = (item.height ?? 300) / 2;
            heights[column] += itemHeight + gap;
            return {
                ...item,
                x,
                y,
                width: (width - (columns - 1) * gap) / columns,
                height: itemHeight,
            };
        });
        return [heights, items];
    }, [columns, paginatedData, width]);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = Number(entry.target.getAttribute('data-id'));
                if (entry.isIntersecting) {
                    setVisibleItems((prev) => new Set(prev).add(id));
                }
            });
        }, { threshold: 0.1 });

        observerRef.current = observer;
        const targets = ref.current.querySelectorAll('[data-id]');
        targets.forEach((el) => observer.observe(el));

        return () => {
            targets.forEach((el) => observer.unobserve(el));
        };
    }, [gridItems]);

    const transitions = useTransition(gridItems, {
        keys: (item) => item.id,
        from: (item) => ({
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            opacity: 0,
            transform: randomTransforms[item.id],
        }),
        enter: (item) => ({
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            opacity: 1,
            transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
        }),
        update: (item) => ({
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
        }),
        leave: { height: 0, opacity: 0 },
        config: { mass: 5, tension: 500, friction: 80 },
        trail: 20,
    });

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setVisibleItems(new Set());
            window.scrollTo(0, 0);

        }
    };

    return (
        <>
            <div ref={ref} className="h-full w-full relative" style={{ height: Math.max(...heights) }}>
                {transitions((style: any, item) => {
                    const isVisible = visibleItems.has(item.id);
                    return (
                        <AnimatedDiv
                            key={item.id}
                            data-id={item.id}
                            className="[will-change:transform,width,height,opacity] absolute"
                            style={{
                                ...style,
                                opacity: isVisible ? style.opacity : 0,
                                transform: isVisible ? style.transform : randomTransforms[item.id],
                                transition: 'opacity 0.6s ease, transform 0.6s ease',
                            }}
                        >
                            <Link to={`/hoat-dong-cong-ty/detail/${item.id}`} state={{ hoatdongItem: item }}>
                                <div
                                    className="h-full rounded-xl shadow-md w-full duration-300 hover:scale-105 overflow-hidden relative transition"
                                    style={{
                                        backgroundImage: `url(${SERVER}/${item.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        marginBottom: `${gap}px`,
                                    }}
                                >
                                    <div className="flex bg-black/30 justify-center absolute duration-300 hover:opacity-100 inset-0 items-center opacity-0 transition">
                                        <span className="text-center text-white text-xs font-semibold px-2 uppercase">
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </AnimatedDiv>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-2 items-center mb-6 mt-6 pb-5">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="bg-white border border-gray-300 rounded-full text-xl disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 px-4 py-2 transition"
                >
                    <FiChevronLeft />
                </button>

                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => {
                        const page = i + 1;
                        const isActive = currentPage === page;
                        return (
                            <button
                                key={i}
                                onClick={() => handlePageChange(page)}
                                className={`w-9 h-9 rounded-full text-sm m-lg-3 transition-all duration-300 ${isActive
                                    ? 'bg-[#007CF9] text-white font-semibold shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="bg-white border border-gray-300 m-lg-3 rounded-full text-xl disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 px-4 py-2 transition"
                >
                    <FiChevronRight />
                </button>
            </div>
            <div
                style={{ marginTop: '10px', height: '10px' }}
            >
            </div>

        </>
    );
}

export default AlbumHoatdongcongtyMansonryCommon;
