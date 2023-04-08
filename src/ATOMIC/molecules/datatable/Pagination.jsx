import React from "react";
import Button from "../../atoms/button/Button";
import Icons from "../../atoms/icons/Icons";
import Container from "../../atoms/container/Container";

const Pagination = ({
  currentPage,
  totalPages,
  handleNextClick,
  handlePrevClick,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Container variant="flexFit">
      <Button onClick={handlePrevClick} isDisabled={isFirstPage}>
        <Icons src="Vector" width={50} height={50} alt="prev" />
      </Button>
      <Button onClick={handleNextClick} isDisabled={isLastPage}>
        <Icons src="next" width={30} height={30} alt="next" />
      </Button>
    </Container>
  );
};

export default Pagination;
