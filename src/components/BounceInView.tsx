import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BounceInViewProps {
    children: ReactNode;
    delay?: number;
}

export const BounceInView = ({ children, delay = 0.3 }: BounceInViewProps) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,         // 👈 chỉ khi thấy ít nhất 50% mới bắt đầu
        rootMargin: "0px 0px",  // 👈 tùy chỉnh nếu cần delay tự nhiên hơn
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.3, }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
                delay,
                duration: 1.2,
            }}
        >
            {children}
        </motion.div>
    );
};
