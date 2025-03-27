import React from 'react';
import { Dichvu } from '../interface/InterfaceCommon';
import { SERVER } from '../configs/Apis';
import '../static/css/dichvuDialog.scss';

// Định nghĩa props cho dichvuDialog
interface DichvuDialogProps {
    isOpen: boolean;
    dichvuItem: Dichvu | null;
    onClose: () => void;
}

const DichvuDialog: React.FC<DichvuDialogProps> = ({ isOpen, dichvuItem, onClose }) => {
    if (!isOpen || !dichvuItem) return null; // Không hiển thị nếu không mở hoặc không có dữ liệu


    return (
        <div className="dichvu-dialog-overlay">
            <div className="dichvu-dialog">
                <img
                    src={`${SERVER}/${dichvuItem.image}`}
                    alt={dichvuItem.title}
                    className="dichvu-dialog-image"
                />
                {/* {dichvuItem.content} */}
                <h2 className="dichvu-dialog-title">{dichvuItem.title}</h2>

                <p className="dichvu-dialog-content" dangerouslySetInnerHTML={{ __html: dichvuItem.content || "" }} ></p>
                <span className="dichvu-dialog-date">
                    Ngày đăng: {new Date(dichvuItem.postdate).toLocaleDateString('vi-VN')}
                </span>
                <button className="dichvu-dialog-close" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default DichvuDialog;