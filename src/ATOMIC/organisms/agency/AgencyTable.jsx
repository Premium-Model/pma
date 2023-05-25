import React, { useState } from "react";
import InputTab from "../InputTab";
import { Link } from "react-router-dom";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import Image from "mui-image";
import Pagination from "../../molecules/datatable/Pagination";
import { selectAgent } from "../../../redux/agencyRedux";
import { useDispatch } from "react-redux";
import avatar from "../../../Images/img/avatar.svg";
import { userRequest } from "../../../redux/requestMethod";
import Modal from "../../molecules/modal/Modal";
import "../../molecules/modal/modal.scss";

const AgencyTable = ({ agency, isDelete, setIsDelete, handleQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedIds, setSelectedIds] = useState([]);

  const totalRows = agency.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handleDelete = async (id) => {
    await userRequest.delete(`/admin/agency/${id}`);
    setIsDelete(!isDelete);
  };

  const reverseAgency = [...agency].reverse()
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

  const handleAgencyClick = () => {
    const randomIndex = Math.floor(Math.random() * rowsToDisplay.length);
    const randomAgent = rowsToDisplay[randomIndex];
    const randomId = randomAgent._id;
    handleDelete(randomId)
    setIsModalOpen(false);
  }

  const handleSelectedAgency = (id) => {
    dispatch(selectAgent(id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p className="modal-text">Are you sure you want to delete this user?</p>
        <div className="btn-group">
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleAgencyClick}
          >
            delete
          </Button>
        </div>
      </Modal>
      <div className="table_container">
        <InputTab
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChangeFromInput}
          totalRows={totalRows}
          handleQuery={handleQuery}
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
            {reverseAgency.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="table_img">
                      <Image
                        width={100}
                        height={97}
                        src={item.picture ? item.picture : avatar}
                        alt={item.picture}
                      />
                    </div>
                  </td>
                  <td style={{ width: "150px", textAlign: "center" }}>
                    <div>
                      {item.country && item.state ? (
                        <p>
                          {item.country}, {item.state}
                        </p>
                      ) : (
                        <span>No Location</span>
                      )}
                    </div>
                  </td>
                  <td style={{ width: "150px", textAlign: "center" }}>
                    {item.fullName}
                  </td>
                  <td style={{ width: "150px", textAlign: "center" }}>
                    <Link to={`/adminpage/manage_agency/${item.uuid}`}>
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
                      onClick={handleOpenModal}
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
