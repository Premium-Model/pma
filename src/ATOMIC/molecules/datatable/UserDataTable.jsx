import React from "react";
import { v4 } from "uuid";
import Input from "../../atoms/input/Input";
import Image from "mui-image";
import Button from "../../atoms/button/Button";

const UserDataTable = ({ data }) => {
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
          {data.map((item, i) => {
            return (
              <tr key={v4}>
                <td>
                  <label>
                    <Input
                      variant="checkbox"
                      type="checkbox"
                      name={item.id}
                      value={item.id}
                    />
                  </label>
                </td>
                <td>
                  <div className="table_img">
                    <Image
                      width={60}
                      height={50}
                      src={item.img}
                      alt={item.name}
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <Button variant="transparent">edit</Button>
                </td>
                <td>
                  <Button variant="transparent">delete</Button>
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
