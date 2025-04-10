import React from 'react';
import { Tintuc } from '../interface/InterfaceCommon';
import { SERVER } from '../configs/Apis';
import '../static/css/newsdialog.scss';
import { useTranslation } from 'react-i18next';

// Định nghĩa props cho NewsDialog
interface NewsDialogProps {
    isOpen: boolean;
    newsItem: Tintuc | null;
    onClose: () => void;
}

const NewsDialog: React.FC<NewsDialogProps> = ({ isOpen, newsItem, onClose }) => {
    if (!isOpen || !newsItem) return null; // Không hiển thị nếu không mở hoặc không có dữ liệu
    const { t } = useTranslation();


    return (
        <div className="news-dialog-overlay">
            <div className="news-dialog">
                <h2 className="news-dialog-title">{newsItem.title}</h2>
                <img
                    src={`${SERVER}/${newsItem.image}`}
                    alt={newsItem.title}
                    className="news-dialog-image"
                />
                {/* {newsItem.content} */}
                <p className="news-dialog-content" dangerouslySetInnerHTML={{ __html: newsItem.content || "" }} ></p>
                <span className="news-dialog-date">{t("ngay")}: {newsItem.postdate}</span>
                <button className="news-dialog-close" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default NewsDialog;