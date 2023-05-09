import React, { useEffect, useState } from "react";
import Input from "../../atoms/input/Input";
import Image from "mui-image";
import Button from "../../atoms/button/Button";
import { userRequest } from "../../../redux/requestMethod";

const UserDataTable = ({ data, setIsDelete, isDelete }) => {
  const handleDelete = async (id) => {
    await userRequest.delete(`/user/${id}`);
    setIsDelete(!isDelete);
  };

  return (
    <div>
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
            <th> </th>
            <th> </th>
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
                      src={item.picture}
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
                    onClick={() => handleDelete(item._id)}
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
