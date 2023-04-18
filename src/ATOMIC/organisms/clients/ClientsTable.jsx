import React, { useState } from "react";
import InputTab from "../InputTab";
import DataTable from "../../molecules/datatable/DataTable";
import client1 from "../../../Images/img/client1.jpg";
import client2 from "../../../Images/img/client2.jpg";
import client3 from "../../../Images/img/client3.jpg";
import "./tableSection.scss";
import Pagination from "../../molecules/datatable/Pagination";

const ClientsTable = () => {
  const data = [
    {
      img: client1,
      location: "Lagos, Nigeria",
      name: "HNK FASHION",
      category: "Fashion designer",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client2,
      location: "Abuja, Nigeria",
      name: "JOY FACEBEAT",
      category: "MakeUp artist",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
      edit: "Edit",
      delete: "Delete",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const rowsToDisplay = data.slice(startIndex, endIndex);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };
  const handlePageSizeChangeFromInput = (event) => {
    const newPageSize = parseInt(event.target.value);
    handlePageSizeChange(newPageSize);
  };

  return (
    <main>
      <div className="table_container">
        <InputTab
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChangeFromInput}
          totalRows={totalRows}
        />
        <div className="table">
          <DataTable data={rowsToDisplay} />
        </div>
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
      />
    </main>
  );
};

export default ClientsTable;
