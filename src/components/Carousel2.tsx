import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../static/css/carousel2.scss"; // Đảm bảo file CSS tồn tại

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
                <h2>{name}</h2>
            </div>
        </div>
    );
};

export default Carousel2;
