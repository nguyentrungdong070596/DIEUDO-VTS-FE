import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../static/css/gridme.scss";
import "../static/css/carousel.scss";

function Carousel() {
  const images = ["/tau1.png", "/tau2.png", "/tau3.png"];

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
    <Box className="carousel-box" sx={{ width: "100%", margin: "auto", mt: 0, position: "relative" }}>
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
              }}
            />
          </Box>
        ))}
      </Slider>

      {/* Overlay với nội dung */}
      <Box
        className="carousel-overlay"
        sx={{
          position: "absolute",
          top: "50%",
          left: "5%",
          transform: "translateY(-50%)",
          textAlign: "left",
          color: "white",
          width: "40%",
          display: { xs: "none", sm: "none", md: "block" }, // Ẩn khi màn hình nhỏ
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#FFFFFF", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
          CÔNG TY CỔ PHẦN DỊCH VỤ VÀ VẬN TẢI BIỂN VŨNG TÀU
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#FF0000", textShadow: "2px 2px 4px rgba(0,0,0,0.5)", mt: 1 }}>
          XÍ NGHIỆP HOA TIÊU VŨNG TÀU
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ bgcolor: "#007BFF", color: "white", mr: 2, fontWeight: "bold" }}>
            ĐẶT HÀNG DỊCH VỤ
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#FFFFFF", color: "#007BFF", fontWeight: "bold" }}>
            KẾ HOẠCH DẪN TÀU
          </Button>
        </Box>
      </Box>

    </Box>
  );
}

export default Carousel;
