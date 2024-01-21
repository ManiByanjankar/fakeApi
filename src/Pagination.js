// class Pagination {
//     constructor(totalItems, itemsPerPage) {
//         this.totalItems = totalItems;
//         this.itemsPerPage = itemsPerPage;
//         this.currentPage = 1;
//     }

//     getTotalPages() {
//         return Math.ceil(this.totalItems / this.itemsPerPage);
//     }

//     goToPage(pageNumber) {
//         if (pageNumber >= 1 && pageNumber <= this.getTotalPages()) {
//             this.currentPage = pageNumber;
//             // Perform any necessary actions when changing the page
//             // e.g., fetch data for the new page
//         } else {
//             console.error("Invalid page number");
//         }
//     }

//     nextPage() {
//         if (this.currentPage < this.getTotalPages()) {
//             this.goToPage(this.currentPage + 1);
//         }
//     }

//     previousPage() {
//         if (this.currentPage > 1) {
//             this.goToPage(this.currentPage - 1);
//         }
//     }
// }

// export default Pagination;

import React from "react";
import { useGlobalContext } from "./context";

const Pagination = () => {
  const { page, nbpages, handlePageChange } = useGlobalContext();

  const handleNextPage = () => {
    if (page < nbpages) {
      handlePageChange(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  return (
    <div className="pagination-btn">
      <button onClick={handlePreviousPage} disabled={page <= 1}>
        Previous
      </button>
      <span>{`Page ${page} of ${nbpages - 1}`}</span>
      <button onClick={handleNextPage} disabled={page >= nbpages - 1}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
