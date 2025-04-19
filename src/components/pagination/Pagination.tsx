import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    currentPage: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    pageSize,
    total,
    onPageChange
}) => {
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (data: { selected: number }) => {
        const nextPage = data.selected + 1;
        if (nextPage !== currentPage) {
            onPageChange(nextPage);
        }
    };
    return (
        <ReactPaginate
            key={`${totalPages}-${currentPage}`}
            forcePage={currentPage - 1}
            previousLabel={<i className="ph-bold ph-arrow-left" />}
            nextLabel={<i className="ph-bold ph-arrow-right" />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination flex-center flex-wrap gap-16"
            pageClassName="page-item"
            pageLinkClassName="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
            previousClassName="page-item"
            previousLinkClassName="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
            nextClassName="page-item"
            nextLinkClassName="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
            activeClassName="active"
        />
    );
};

export default Pagination;
