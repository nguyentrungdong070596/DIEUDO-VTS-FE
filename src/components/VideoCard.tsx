import { useRef } from 'react';
import { HoatDongCongTy } from '../interface/InterfaceCommon';
import { SERVER } from '../configs/Apis';

interface Props {
    item: HoatDongCongTy;
}

const VideoCard = ({ item }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    return (
        <div
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Thumbnail Image (nằm dưới video) */}
            <img
                src={`${SERVER}/${item.image}`}
                alt="Video thumbnail"
                className="w-full h-full object-cover absolute top-0 left-0 z-10"
            />

            {/* Video (hover mới hiện ra và phát) */}
            <video
                ref={videoRef}
                src={`${SERVER}/${item.videourl}`}
                muted

                playsInline
                preload="auto"
                className="w-full h-full object-cover absolute top-0 left-0 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300"
            />
        </div>
    );
};

export default VideoCard;
