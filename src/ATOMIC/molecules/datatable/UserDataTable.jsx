import React from "react";
import Input from "../../atoms/input/Input";
import Image from "mui-image";
import Button from "../../atoms/button/Button";
import { userRequest } from "../../../redux/requestMethod";
import "./table.scss";
import avatar from "../../../Images/img/avatar.svg";
import Modal from "../modal/Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const UserDataTable = ({ data, setIsDelete, isDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataId, setDataId] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalRows = data?.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const rowsToDisplay = data?.slice(startIndex, endIndex);

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

  const handleDelete = async (id) => {
    await userRequest.delete(`/user/${id}`);
    setIsDelete(!isDelete);
    setIsModalOpen(false);
  };

  const handleOpenModal = (id) => {
    setIsModalOpen(true);
    setDataId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="table_container">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p className="modal-text">
          Are you sure you want to delete this user? Action cannot be undone!
        </p>
        <div className="btn-group">
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleDelete(dataId)}>
            delete
          </Button>
        </div>
      </Modal>

      <table className="data-table2">
        <thead>
          <tr>
            <th>
              <label>
                <Input
                  variant="checkbox"
                  type="checkbox"
                  //   checked={selectedIds.includes(item.id)}
                  //   onChange={handleCheckboxChange}
                />
              </label>
            </th>
            <th>User</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {rowsToDisplay?.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  <label>
                    <Input
                      variant="checkbox"
                      type="checkbox"
                      name={item._id}
                      value={item._id}
                    />
                  </label>
                </td>
                <td>
                  <div className="table_img">
                    <Image
                      width={60}
                      height={50}
                      src={item.picture ? item.picture : avatar}
                      alt={item.picture}
                    />
                  </div>
                </td>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <Link
                    to={
                      item.role === "model"
                        ? `/adminpage/manage_models/${item._id}`
                        : item.role === "agency"
                        ? `/adminpage/manage_agency/${item._id}`
                        : `/adminpage/manage_clients/${item._id}`
                    }
                    variant="transparent"
                  >
                    edit
                  </Link>
                </td>
                <td>
                  <Button
                    variant="transparent"
                    onClick={() => handleOpenModal(item._id)}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
      />
    </div>
  );
};

export default UserDataTable;
