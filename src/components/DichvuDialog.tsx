import React from 'react';
import { Dichvu } from '../interface/InterfaceCommon';
import { SERVER } from '../configs/Apis';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import "../static/css/dichvuDialog.scss";
import { useTranslation } from 'react-i18next';

interface DichvuDialogProps {
    isOpen: boolean;
    dichvuItem: Dichvu | null;
    onClose: () => void;
}

const DichvuDialog: React.FC<DichvuDialogProps> = ({ isOpen, dichvuItem, onClose }) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isOpen && dichvuItem && (
                <Dialog
                    open={isOpen}
                    onClose={onClose}
                    className="dichvu-dialog-overlay"
                >
                    <Dialog.Panel as="div">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="dichvu-dialog"
                        >
                            {/* <button
                                onClick={onClose}
                                className="dichvu-dialog-close"
                                aria-label="Đóng"
                            >
                                ×
                            </button> */}

                            {/* Image */}
                            <img
                                src={`${SERVER}/${dichvuItem.image}`}
                                alt={dichvuItem.title}
                                className="dichvu-dialog-image"
                            />

                            {/* Title */}
                            <h3 className="dichvu-dialog-title">
                                {/* {dichvuItem.title} */}
                                {t(`title_dichvu_${dichvuItem.id}`) || dichvuItem.title}
                            </h3>

                            {/* Date */}
                            <p className="dichvu-dialog-date">
                                {t("ngay")}: {new Date(dichvuItem.postdate).toLocaleDateString('vi-VN')}
                            </p>

                            {/* Content */}
                            <div
                                className="dichvu-dialog-content"
                                style={{ whiteSpace: 'pre-wrap' }}
                                // dangerouslySetInnerHTML={{ __html: dichvuItem.content || "" }}
                                dangerouslySetInnerHTML={{ __html: t(`content_dichvu_${dichvuItem.id}`) || dichvuItem.content }}
                            />
                        </motion.div>
                    </Dialog.Panel>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default DichvuDialog;