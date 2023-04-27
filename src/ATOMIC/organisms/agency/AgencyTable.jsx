import React, { useState } from "react";
import InputTab from "../InputTab";
import DataTable from "../../molecules/datatable/DataTable";
import client1 from "../../../Images/img/client1.jpg";
import client2 from "../../../Images/img/client2.jpg";
import client3 from "../../../Images/img/client3.jpg";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import Image from "mui-image";
import Pagination from "../../molecules/datatable/Pagination";
import { selectAgent } from "../../../redux/agencyRedux";
import { useSelector, useDispatch } from "react-redux";

const AgencyTable = () => {
  const agency = useSelector((state) => state.agency.agency);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState([]);

  const totalRows = agency.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

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
              <th>Location</th>
              <th>Name</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay.map((item, i) => {
              return (
                <tr key={v4}>
                  <td>{i + 1}</td>
                  <td>
                    <Image
                      width={108}
                      height={97}
                      src={item.img}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.location}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    <Link to={`/adminpage/manage_agency/:${item.id}`}>
                      <Button
                        variant="primary"
                        onClick={() => handleSelectedAgency(item.id)}
                      >
                        {item.edit}
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button variant="secondary">{item.delete}</Button>
                  </td>
                  <td>
                    <label>
                      <Input
                        variant="checkbox"
                        type="checkbox"
                        name={item.id}
                        value={item.id}
                        checked={selectedIds.includes(item.id)}
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
