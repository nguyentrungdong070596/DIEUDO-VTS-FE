import React from 'react';
import ReactPaginate from 'react-paginate';
import '../static/css/commonpagination.scss';
interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const CommonPagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1); // +1 vì API đếm từ 1
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
            forcePage={currentPage - 1} // Đồng bộ với ReactPaginate (đếm từ 0)
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
            disabledClassName={'disabled'} // Class cho trạng thái disabled
            disableInitialCallback={true} // Ngăn callback ban đầu
        />
    );
};

export default CommonPagination;