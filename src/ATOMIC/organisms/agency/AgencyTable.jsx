import React, { useState } from "react";
import InputTab from "../InputTab";
import { Link } from "react-router-dom";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import Image from "mui-image";
import Pagination from "../../molecules/datatable/Pagination";
import { selectAgent } from "../../../redux/agencyRedux";
import { useDispatch } from "react-redux";
import { userRequest } from "../../../redux/requestMethod";

const AgencyTable = ({ agency, isDelete, setIsDelete }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState([]);

  const totalRows = agency.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handleDelete = async (id) => {
    await userRequest.delete(`/admin/agency/${id}`);
    setIsDelete(!isDelete);
  };

  const rowsToDisplay = agency.slice(startIndex, endIndex);

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

  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    if (event.target.checked) {
      setSelectedIds([...selectedIds, itemId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    }
  };

  const handleSelectedAgency = (id) => {
    dispatch(selectAgent(id));
  };

  return (
    <main>
      <div className="table_container">
        <InputTab
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChangeFromInput}
          totalRows={totalRows}
        />
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Picture</th>
              <th style={{ width: "150px" }}>Location</th>
              <th style={{ width: "150px" }}>Name</th>
              <th style={{ width: "150px" }}>Edit</th>
              <th style={{ width: "150px" }}>Delete</th>
              <th style={{ width: "150px" }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <Image
                      width={108}
                      height={97}
                      src={item.picture}
                      alt={item.picture}
                    />
                  </td>
                  <td style={{ width: "150px", textAlign: "center" }}>
                    {item.country}, {item.state}
                  </td>
                  <td style={{ width: "150px", textAlign: "center" }}>
                    {item.fullName}
                  </td>
                  <td style={{ width: "150px", textAlign: "center" }}>
                    <Link to={`/adminpage/manage_agency/${item._id}`}>
                      <Button
                        variant="primary"
                        onClick={() => handleSelectedAgency(item._id)}
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td style={{ width: "150px", textAlign: "center" }}>
                    <Button
                      variant="secondary"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td style={{ width: "150px", textAlign: "center" }}>
                    <label>
                      <Input
                        variant="checkbox"
                        type="checkbox"
                        name={item._id}
                        value={item._id}
                        checked={selectedIds.includes(item._id)}
                        onChange={handleCheckboxChange}
                      />
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <DataTable data={rowsToDisplay} /> */}
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

export default AgencyTable;
