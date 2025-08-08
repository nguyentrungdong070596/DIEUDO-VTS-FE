import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../static/css/itemhoatieu.scss";
import "../static/css/profilemodal.scss"; // style popup
import { useTranslation } from "react-i18next";

interface ItemhoatieuProps {
  name: string;
  chucdanh: string;
  img: string;
  content: string;
  content_en: string;
  index?: number;
  onClick?: () => void;
}

const Itemhoatieu: React.FC<ItemhoatieuProps> = ({
  name,
  chucdanh,
  img,
  index = 0,
  content,
  content_en,
}) => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation(); // lấy ngôn ngữ hiện tại

  // Chọn nội dung theo ngôn ngữ
  const displayContent = i18n.language === "en" ? content_en : content;

  return (
    <>
      {/* Card hiển thị */}
      <motion.div
        className="itemhoatieu"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        onClick={() => setOpen(true)}
      >
        <img src={img} alt={name} />
        <div className="itemhoatieu-info">
          <p className="itemhoatieu-name">{name}</p>
          <p>{chucdanh}</p>
        </div>
      </motion.div>

      {/* Popup modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="profile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="profile-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={img} alt={name} className="profile-image" />
              <h2>{name}</h2>
              <h4>{chucdanh}</h4>
              {/* <p>{displayContent}</p> */}

              <div className="ql-snow">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: (displayContent || "")
                      .replace(/<br\s*\/?>/gi, "<br />")
                      .replace(/&nbsp;/g, " ") // ✅ Chuyển &nbsp; sang khoảng trắng thường
                      .replace(/(\w+)(?=\w{1,2}$)/gi, "$1\u200B") // 👈 Tùy chọn cải thiện xuống dòng (zero-width space)
                      .trim(),
                  }}
                />
              </div>
              <button className="close-btn" onClick={() => setOpen(false)}>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Itemhoatieu;
