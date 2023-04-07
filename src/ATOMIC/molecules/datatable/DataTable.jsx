import React from "react";
// import { v4 } from "uuid";
import Image from "mui-image";
import Button from "../../atoms/button/Button";
import "./table.scss";
import Input from "../../atoms/input/Input";
import { useState } from "react";

const DataTable = ({ data }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    if (event.target.checked) {
      setSelectedIds([...selectedIds, itemId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    }
  };

  return (
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
        {data.map((item, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Image width={108} height={97} src={item.img} alt={item.name} />
              </td>
              <td>{item.location}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>
                <Button variant="primary">{item.edit}</Button>
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
  );
};

export default DataTable;
