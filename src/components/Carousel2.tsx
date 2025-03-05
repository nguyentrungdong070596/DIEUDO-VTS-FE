import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../static/css/gridme.scss";
import "../static/css/carousel2.scss";

function Carousel2(name: any) {
    const images = ["/tau.png", "/tau1.png", "/tau2.png", "/tau3.png"];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box className="carousel-box2" sx={{ width: "100%", margin: "auto", mt: 0, position: "relative" }}>
            <Slider {...settings}>
                {images.map((src, index) => (
                    <Box key={index} sx={{ position: "relative" }}>
                        <Box
                            component="img"
                            src={src}
                            alt={`Slide ${index + 1}`}
                            sx={{
                                width: "100%",
                                height: "550px",
                                objectFit: "cover",
                                borderRadius: "0px",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                filter: "brightness(50%)"
                            }}
                        />
                    </Box>
                ))}
            </Slider>

            <Box
                className="carousel-overlay"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // Căn giữa hoàn toàn
                    textAlign: "center", // Căn giữa nội dung
                    color: "white",
                    width: "40%",
                    display: { xs: "none", sm: "none", md: "block" }, // Ẩn khi màn hình nhỏ
                    // opacity: 0.5,
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                        color: "#FFFFFF", // Sửa lại vì "#FFFFF" không hợp lệ (chỉ có 6 ký tự hợp lệ)
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        mt: 1,
                        fontSize: "1.8rem",
                        textTransform: "uppercase",

                    }}
                >
                    {name.name}
                </Typography>
            </Box>


        </Box >
    );
}

export default Carousel2;
