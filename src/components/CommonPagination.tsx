import React from 'react';
import ReactPaginate from 'react-paginate';
import '../static/css/commonpagination.scss';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number; // Index 1-based
    onPageChange: (page: number) => void;
}

const CommonPagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    // Nếu không có dữ liệu hoặc chỉ có 1 trang → không hiển thị pagination
    if (pageCount <= 1) return null;

    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1); // Truyền về page 1-based cho cha
    };

    return (
        <ReactPaginate
            previousLabel={'Trước'}
            nextLabel={'Sau'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            forcePage={Math.max(0, Math.min(currentPage - 1, pageCount - 1))} // ✅ Bảo vệ forcePage không vượt giới hạn
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link previous-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link next-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link break-link'}
            activeClassName={'active'}
            disabledClassName={'disabled'}
            disableInitialCallback={true}
        />
    );
};

export default CommonPagination;
