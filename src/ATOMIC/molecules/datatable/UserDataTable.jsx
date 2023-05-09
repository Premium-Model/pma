import React from "react";
import Input from "../../atoms/input/Input";
import Image from "mui-image";
import Button from "../../atoms/button/Button";
import { userRequest } from "../../../redux/requestMethod";
import "./table.scss";
import avatar from "../../../Images/img/avatar.svg";
import Modal from "../modal/Modal";
import { useState } from "react";

const UserDataTable = ({ data, setIsDelete, isDelete }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    await userRequest.delete(`/user/${id}`);
    setIsDelete(!isDelete);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="table_container">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p className="modal-text">Are you sure you want to delete this user?</p>
        <div className="btn-group">
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleDelete(data._id)}
          >
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
          {data?.map((item, i) => {
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
                  <Button variant="transparent">edit</Button>
                </td>
                <td>
                  <Button
                    variant="transparent"
                    onClick={handleOpenModal}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
