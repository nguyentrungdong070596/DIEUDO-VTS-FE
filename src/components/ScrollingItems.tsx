import { useEffect, useRef } from 'react';
import '../static/css/ScrollingItems.scss'; // Import your CSS file

const HorizontalScrollSection = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const items = [
        { id: 1, title: 'Item 1', color: '#ff6b6b' },
        { id: 2, title: 'Item 2', color: '#4ecdc4' },
        { id: 3, title: 'Item 3', color: '#45b7d1' },
        { id: 4, title: 'Item 4', color: '#96c93d' },
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isAnimating = false;
        let scrollAccumulator = 0;

        const handleScroll = (e: WheelEvent) => {
            if (isAnimating) return;

            const scrollPosition = window.scrollY;
            const containerTop = container.offsetTop;
            const windowHeight = window.innerHeight;

            // Khi scroll vào vùng component
            if (scrollPosition >= containerTop - 1 && scrollPosition < containerTop + windowHeight) {
                e.preventDefault(); // Ngăn scroll mặc định
                isAnimating = true;

                // Đảm bảo container phủ kín màn hình
                window.scrollTo(0, containerTop);

                // Tích lũy scroll từ wheel
                scrollAccumulator += e.deltaY;

                // Tính toán tiến trình dựa trên scroll tích lũy
                const totalScrollDistance = windowHeight * items.length * 0.5; // Điều chỉnh tốc độ scroll ngang
                const progress = Math.min(Math.max(scrollAccumulator / totalScrollDistance, 0), 1);

                // Dịch chuyển ngang
                const itemsContainer = container.querySelector('.items-container') as HTMLElement;
                if (itemsContainer) {
                    const maxTranslate = (items.length - 1) * window.innerWidth;
                    const translateX = progress * maxTranslate;
                    itemsContainer.style.transform = `translateX(-${translateX}px)`;
                }

                // Khi đến item cuối, cho phép scroll dọc bình thường
                if (progress >= 1 && e.deltaY > 0) {
                    scrollAccumulator = 0; // Reset accumulator
                    window.scrollTo(0, containerTop + windowHeight); // Thoát vùng
                }

                requestAnimationFrame(() => {
                    isAnimating = false;
                });
            }
        };

        // Đặt chiều cao container bằng 1 màn hình
        container.style.height = `${window.innerHeight}px`;
        container.style.position = 'sticky';
        container.style.top = '0';

        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => window.removeEventListener('wheel', handleScroll);
    }, [items.length]);

    return (
        <div className="scroll-section" ref={containerRef}>
            <div className="items-container">
                {items.map((item) => (
                    <div key={item.id} className="scroll-item" style={{ backgroundColor: item.color }}>
                        <h2>{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScrollSection;