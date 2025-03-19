import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../static/css/carousel2.scss"; // Đảm bảo file CSS tồn tại
import AOS from "aos";

interface CarouselProps {
    name: string;
}

const Carousel2: React.FC<CarouselProps> = ({ name }) => {
    const images = ["/tau.png", "/tau1.png", "/tau2.png", "/tau3.png"];

    const settings = {
        dots: false,          // Hiển thị chấm chuyển ảnh
        arrows: true,        // Hiển thị nút điều hướng
        infinite: true,      // Lặp lại vô hạn
        speed: 500,          // Tốc độ chuyển ảnh
        slidesToShow: 1,     // Hiển thị 1 ảnh mỗi lần
        slidesToScroll: 1,   // Cuộn 1 ảnh mỗi lần
        autoplay: true,      // Tự động chạy
        autoplaySpeed: 3000, // Chuyển ảnh mỗi 3 giây
    };


    const paragraphDichVuRef = useRef<HTMLParagraphElement>(null);
    const fullTextDichVu = `Cung cấp các giải pháp thực tế, nhanh chóng thực sự tiết kiệm`;
    const hasTypedRef = useRef(false); // ✅ chặn chạy nhiều lần



    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    paragraphDichVuRef.current &&
                    !hasTypedRef.current
                ) {
                    hasTypedRef.current = true;

                    let i = 0;
                    const interval = setInterval(() => {
                        // Check ref có còn tồn tại hay không
                        if (!paragraphDichVuRef.current) {
                            clearInterval(interval);
                            return;
                        }

                        if (i <= fullTextDichVu.length) {
                            paragraphDichVuRef.current.innerText = name.substring(0, i);
                            i++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 25);
                }
            },
            { threshold: 0.5 }
        );

        // Chỉ observe nếu ref tồn tại
        if (paragraphDichVuRef.current) {
            observer.observe(paragraphDichVuRef.current);
        }

        return () => observer.disconnect();
    }, []);


    return (
        <div className="carousel-box2">
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className="carousel-slide2">
                        <img src={src} alt={`Slide ${index + 1}`} className="carousel-image2" />
                    </div>
                ))}
            </Slider>

            {/* Overlay nội dung */}
            <div className="carousel-overlay2">
                <h2 ref={paragraphDichVuRef} ></h2>
            </div>
        </div>
    );
};

export default Carousel2;
