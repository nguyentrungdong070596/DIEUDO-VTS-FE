// import React, { useEffect, useRef } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "../static/css/carousel2.scss"; // Đảm bảo file CSS tồn tại

// interface CarouselProps {
//     name: string;
// }

// const Carousel2: React.FC<CarouselProps> = ({ name }) => {
//     const images = ["/tau.png", "/tau1.png", "/tau2.png", "/tau3.png"];

//     // Cấu hình slider với xử lý trường hợp chỉ có 1 slide
//     const settings = {
//         dots: false,
//         infinite: images.length > 1, // Chỉ bật infinite khi có nhiều hơn 1 slide
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: images.length > 1, // Chỉ tự động chạy khi có nhiều hơn 1 slide
//         autoplaySpeed: 3000,
//         pauseOnHover: false,
//         arrows: images.length > 1, // Chỉ hiển thị mũi tên khi có nhiều hơn 1 slide
//     };


//     const paragraphDichVuRef = useRef<HTMLParagraphElement>(null);
//     const fullTextDichVu = `Cung cấp các giải pháp thực tế, nhanh chóng thực sự tiết kiệm`;
//     const hasTypedRef = useRef(false); // ✅ chặn chạy nhiều lần



//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (
//                     entry.isIntersecting &&
//                     paragraphDichVuRef.current &&
//                     !hasTypedRef.current
//                 ) {
//                     hasTypedRef.current = true;

//                     let i = 0;
//                     const interval = setInterval(() => {
//                         // Check ref có còn tồn tại hay không
//                         if (!paragraphDichVuRef.current) {
//                             clearInterval(interval);
//                             return;
//                         }

//                         if (i <= fullTextDichVu.length) {
//                             paragraphDichVuRef.current.innerText = name.substring(0, i);
//                             i++;
//                         } else {
//                             clearInterval(interval);
//                         }
//                     }, 25);
//                 }
//             },
//             { threshold: 0.5 }
//         );

//         // Chỉ observe nếu ref tồn tại
//         if (paragraphDichVuRef.current) {
//             observer.observe(paragraphDichVuRef.current);
//         }

//         return () => observer.disconnect();
//     }, []);


//     return (
//         <div className="carousel-box2">
//             <Slider {...settings}>
//                 {images.map((src, index) => (
//                     <div key={index} className="carousel-slide2">
//                         <img src={src} alt={`Slide ${index + 1}`} className="carousel-image2" />
//                     </div>
//                 ))}
//             </Slider>

//             {/* Overlay nội dung */}
//             <div className="carousel-overlay2">
//                 <h2 ref={paragraphDichVuRef} ></h2>
//                 <h2 ref={paragraphDichVuRef} >XÍ NGHIỆP HOA TIÊU VŨNG TÀU</h2>
//             </div>
//         </div>
//     );
// };

// export default Carousel2;



import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../static/css/carousel2.scss"; // Đảm bảo file CSS tồn tại

interface CarouselProps {
    name: string;
    subtitle?: string; // Thêm tham số tùy chọn
}

const Carousel2: React.FC<CarouselProps> = ({ name, subtitle }) => {
    const images = ["/tau.png", "/tau1.png", "/tau2.png", "/tau3.png"];

    // Cấu hình slider với xử lý trường hợp chỉ có 1 slide
    const settings = {
        dots: false,
        infinite: images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: images.length > 1,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        arrows: images.length > 1,
    };

    const paragraphDichVuRef = useRef<HTMLParagraphElement>(null);
    const hasTypedRef = useRef(false); // Chặn chạy nhiều lần

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && paragraphDichVuRef.current && !hasTypedRef.current) {
                    hasTypedRef.current = true;

                    let i = 0;
                    const fullText = name.toUpperCase(); // Viết hoa toàn bộ

                    const interval = setInterval(() => {
                        if (!paragraphDichVuRef.current) {
                            clearInterval(interval);
                            return;
                        }

                        if (i <= fullText.length) {
                            paragraphDichVuRef.current.innerText = fullText.substring(0, i);
                            i++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 25);
                }
            },
            { threshold: 0.5 }
        );

        if (paragraphDichVuRef.current) {
            observer.observe(paragraphDichVuRef.current);
        }

        return () => observer.disconnect();
    }, [name]);

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
                <h2 ref={paragraphDichVuRef}>{name.toUpperCase()}</h2>
                {subtitle && <h2>{subtitle.toUpperCase()}</h2>}
            </div>
        </div>
    );
};

export default Carousel2;
