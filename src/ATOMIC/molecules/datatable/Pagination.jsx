import React from "react";
import Button from "../../atoms/button/Button";
import Container from "../../atoms/container/Container";
import './pagination.scss'
import { NavigateBeforeOutlined, NavigateNextOutlined } from "@mui/icons-material";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  handleNextClick,
  handlePrevClick,
}) => {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  const renderPageButtons = () => {
    let pageButtons = [];
    if (totalPages <= 5) {
      pageButtons = pages;
    } else if (currentPage <= 3) {
      pageButtons = pages.slice(0, 5);
    } else if (currentPage > totalPages - 3) {
      pageButtons = pages.slice(totalPages - 5, totalPages);
    } else {
      pageButtons = pages.slice(currentPage - 3, currentPage + 2);
    }
    return pageButtons.map((page) => (
      <button
        key={page}
        className={`Pagination__button ${
          page === currentPage ? "Pagination__button--active" : ""
        }`}
        onClick={() => handlePageClick(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <Container className="Pagination">
      <Button
        className="Pagination__button Pagination__button--arrow"
        onClick={handlePrevClick}
        disabled={currentPage <= 1}
      >
      <NavigateBeforeOutlined/>
      </Button>
      {renderPageButtons()}
      <Button
        className="Pagination__button Pagination__button--arrow"
        onClick={handleNextClick}
        disabled={currentPage >= totalPages}
      >
       <NavigateNextOutlined/>
      </Button>
    </Container>
  );
};

export default Pagination;
