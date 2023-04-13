import React from "react";
import Input from "../atoms/input/Input";
import Container from "../atoms/container/Container";
import { useState } from "react";

const InputTab = ({pageSize, handlePageSizeChange, totalRows}) => {
  const [formValue, setFormField] = useState({
    field1: "",
    field2: 10,
  });

  const handleChange = (e) => {
    setFormField(e.target.value);
  };

  return (
    <Container variant="gapped-top">
      <Container variant="gapped">
        <div>Search</div>
        <Input
          variant="normal"
          type="text"
          value={formValue.field1}
          onChange={handleChange}
          placeholder="Enter here"
        />
      </Container>
      <Container variant="gapped">
        <div>Show</div>
        <Input
          variant="number"
          type="number"
          max={totalRows}
          value={pageSize}
          onChange={handlePageSizeChange}
        />
        <div>entries</div>
      </Container>
    </Container>
  );
};

export default InputTab;
