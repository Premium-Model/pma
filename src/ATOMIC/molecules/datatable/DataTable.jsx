import "./table.scss";
import { v4 } from "uuid";
import React from "react";
import Image from "mui-image";
import { useState } from "react";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import Container from "../../atoms/container/Container";

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
    <main>
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
      <Container variant="gapped-top-center">
        <Input variant="normal" type="text" placeholder="#" />
        <Input variant="normal" type="text" placeholder="location" />
        <Input variant="normal" type="text" placeholder="name" />
        <Input variant="normal" type="text" placeholder="category" />
      </Container>
    </main>
  );
};

export default DataTable;
