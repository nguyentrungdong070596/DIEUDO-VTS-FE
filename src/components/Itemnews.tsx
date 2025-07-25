import React from "react";
import { motion } from "framer-motion";
import "../static/css/itemnews.scss";
import "../quill.custom.scss";
import "quill/dist/quill.snow.css"; // Import CSS của Quill
interface ItemnewsProps {
  title: string;
  desc: string;
  img: string;
  time: string;
  index?: number; // nhận index để tạo delay
}

const Itemnews: React.FC<ItemnewsProps> = ({
  title,
  desc,
  time,
  img,
  index = 0,
}) => {
  return (
    <motion.div
      className="item-news"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }} // delay theo index
    >
      <div className="item-news-img">
        <img src={img} alt="news" />
      </div>
      <div className="item-news-content">
        <h3 className="item-news-title">{title}</h3>
        <p className="item-news-time">{time}</p>
        <p
          className="item-news-desc"
          dangerouslySetInnerHTML={{ __html: desc || "" }}
        />
      </div>
    </motion.div>
  );
};

export default Itemnews;
