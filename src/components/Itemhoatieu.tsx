import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../static/css/itemhoatieu.scss";
import "../static/css/profilemodal.scss"; // style popup
import { useTranslation } from "react-i18next";
import { AiFillFilePdf, AiFillFileWord } from "react-icons/ai";

interface ItemhoatieuProps {
  name: string;
  chucdanh: string;
  img: string;
  img2: string;
  content: string;
  content_en: string;
  index?: number;
  onClick?: () => void;
}

const Itemhoatieu: React.FC<ItemhoatieuProps> = ({
  name,
  chucdanh,
  img,
  img2,
  index = 0,
  content,
  content_en,
}) => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation(); // lấy ngôn ngữ hiện tại
  const [isHovered, setIsHovered] = useState(false);

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
              {/* Nút đóng ở góc trên bên phải */}
              <button
                className="close-btn"
                onClick={() => setOpen(false)}
                aria-label="Đóng"
              >
                ✕
              </button>

              <img src={img} alt={name} className="profile-image" />
              <h2>{name}</h2>
              <h4>{chucdanh}</h4>

              <div className="ql-snow">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: (displayContent || "")
                      .replace(/<br\s*\/?>/gi, "<br />")
                      .replace(/&nbsp;/g, " ")
                      .replace(/(\w+)(?=\w{1,2}$)/gi, "$1\u200B")
                      .trim(),
                  }}
                />
              </div>

              <a
                href={`${img2}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pdf-link"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="btn-content">
                  {isHovered ? (
                    <>
                      <AiFillFileWord className="btn-icon" />
                      <span className="btn-text">Xem Word</span>
                    </>
                  ) : (
                    <>
                      <AiFillFilePdf className="btn-icon" />
                      <span className="btn-text">Xem PDF</span>
                    </>
                  )}
                </span>
              </a>

              {/* Nút đóng dạng text phía dưới */}
              <div className="modal-footer">
                <button
                  className="btn-close-popup"
                  onClick={() => setOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Itemhoatieu;
