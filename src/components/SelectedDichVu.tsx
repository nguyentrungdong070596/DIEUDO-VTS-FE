import React from "react";
import { motion } from "framer-motion";
import { SERVER } from "../configs/Apis";

interface Dichvu {
    id: number;
    image: string;
    title?: string; // Nếu không có title trong Dichvu, bạn có thể bỏ qua
    content: string;
    [key: string]: any; // Để linh hoạt với các thuộc tính khác
}

interface SelectedDichVuProps {
    dichvu: Dichvu;
}

const SelectedDichVu: React.FC<SelectedDichVuProps> = ({ dichvu }) => {
    return (
        <motion.div
            className="relative w-[90vw] max-w-[700px] h-auto max-h-[85vh] p-6 sm:p-8 rounded-xl shadow-2xl text-white bg-black/85 overflow-hidden"
        >
            {/* Background image */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center blur-sm brightness-50"
                    style={{ backgroundImage: `url(${SERVER}/${dichvu.image})` }}
                ></div>
            </div>

            {/* Nội dung */}
            <div className="relative z-10 flex flex-col justify-start h-full overflow-y-auto">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                    {dichvu.title || "Dịch vụ"} {/* Nếu không có title thì dùng mặc định */}
                </h3>
                <p className="text-base sm:text-lg italic mb-3 text-gray-300">{dichvu.content}</p>
            </div>
        </motion.div>
    );
};

export default SelectedDichVu;