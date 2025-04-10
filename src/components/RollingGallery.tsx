import { useCallback, useRef } from "react";
import { useWindowSize, useInterval } from "react-use";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import "../static/css/rollinggallery.scss";

const IMGS = [
    "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=800&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=800&auto=format&fit=crop",
];

interface RollingGalleryProps {
    autoplay?: boolean;
    pauseOnHover?: boolean;
    images?: string[];
    dragSensitivity?: number;
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
    autoplay = false,
    pauseOnHover = false,
    images = IMGS,
    dragSensitivity = 0.05,
}) => {
    const { width } = useWindowSize();
    const isScreenSizeSm = width <= 640;
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
    const faceCount = images.length;
    // const faceWidth = 600 // Tăng kích thước hình ảnh
    const faceWidth = (cylinderWidth / faceCount) * 2; // Tăng kích thước hình ảnh
    const dragFactor = dragSensitivity;
    const radius = cylinderWidth / (2 * Math.PI);

    const rotation = useMotionValue(0);
    const controls = useAnimation();
    const autoplayRef = useRef<boolean>(autoplay);

    const rotateGallery = useCallback(() => {
        const newRotation = rotation.get() - (360 / faceCount);
        rotation.set(newRotation);
        controls.start({
            rotateY: newRotation,
            transition: { duration: 2, type: "tween", ease: "linear" },
        });
    }, [rotation, controls, faceCount]);

    useInterval(
        () => {
            if (autoplayRef.current) rotateGallery();
        },
        autoplay ? 2000 : null
    );

    const handleDrag = (_: any, info: any) => {
        rotation.set(rotation.get() + info.offset.x * dragFactor);
    };

    const handleDragEnd = (_: any, info: any) => {
        controls.start({
            rotateY: rotation.get() + info.velocity.x * dragFactor,
            transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1, ease: "easeOut" },
        });
    };

    const handleMouseEnter = () => {
        if (autoplay && pauseOnHover) {
            autoplayRef.current = false;
            controls.stop();
        }
    };

    const handleMouseLeave = () => {
        if (autoplay && pauseOnHover) {
            rotateGallery();
            autoplayRef.current = true;
        }
    };

    return (
        <div className="gallery-container" role="region" aria-label="Image rolling gallery">
            <div className="gallery-gradient gallery-gradient-left"></div>
            <div className="gallery-gradient gallery-gradient-right"></div>
            <div className="gallery-content">
                <motion.div
                    drag="x"
                    className="gallery-track"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d" as const,
                    }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                >
                    {images.map((url, i) => (
                        <div
                            key={i}
                            className="gallery-item"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <img
                                src={url}
                                alt={`Gallery image ${i + 1}`}
                                className="gallery-img"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default RollingGallery;
