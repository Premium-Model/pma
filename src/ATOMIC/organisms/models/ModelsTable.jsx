import React, { useState } from "react";
import InputTab from "../InputTab";
import Button from "../../atoms/button/Button";
import Image from "mui-image";
import Input from "../../atoms/input/Input";
import { Link } from "react-router-dom";
import Pagination from "../../molecules/datatable/Pagination";
import { useDispatch } from "react-redux";
import avatar from "../../../Images/img/avatar.svg";
import { selectModel } from "../../../redux/modelsRedux";
import { userRequest } from "../../../redux/requestMethod";
import Modal from "../../molecules/modal/Modal";
import "../../molecules/modal/modal.scss";

const ModelsTable = ({ models, isDelete, setIsDelete, handleQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState([]);

  const totalRows = models?.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handleDelete = async (id) => {
    await userRequest.delete(`/admin/model/${id}`);
    setIsDelete(!isDelete);
  };

  const reverseModel = [...models].reverse()
  const rowsToDisplay = reverseModel?.slice(startIndex, endIndex);
  

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

  const handleModelClick = () => {
    const randomIndex = Math.floor(Math.random() * rowsToDisplay.length);
    const randomModel = rowsToDisplay[randomIndex];
    const randomId = randomModel._id;
    handleDelete(randomId)
    setIsModalOpen(false);
  }

  const handleSelectedModel = (id) => {
    dispatch(selectModel(id));
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
            onClick={handleModelClick}
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
              <th style={{ width: "150px" }}>Category</th>
              <th style={{ width: "150px" }}>Edit</th>
              <th style={{ width: "150px" }}>Delete</th>
              <th style={{ width: "150px" }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay?.map((item, i) => (
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
                  <div>
                    {item.category ? (
                      <div>
                        {item.category[0]} & {item.category[1]}
                      </div>
                    ) : (
                      <div>none</div>
                    )}
                  </div>
                </td>
                <td style={{ width: "150px", textAlign: "center" }}>
                  <Link to={`/adminpage/manage_models/${item.uuid}`}>
                    <Button
                      variant="primary"
                      onClick={() => handleSelectedModel(item._id)}
                    >
                      Edit
                    </Button>
                  </Link>
                </td>
                <td style={{ width: "150px", textAlign: "center" }}>
                  <Button variant="secondary" onClick={handleOpenModal}>
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
            ))}
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

export default ModelsTable;
