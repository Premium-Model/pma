import React from "react";
import { v4 } from "uuid";
import Image from "mui-image";
import Button from "../../atoms/button/Button";
import "./table.scss";

const DataTable = ({ data }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>picture</th>
          <th>location</th>
          <th>Name</th>
          <th>Category</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => {
          <tr key={i}>
            <td>3</td>
            <td>
              <Image src={item.img} alt={item.name} />
            </td>
            <td>{item.location}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>
              <Button>{item.name}</Button>
            </td>
            <td>
              <Button>{item.name}</Button>
            </td>
            <td>{item.location}</td>
          </tr>;
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
