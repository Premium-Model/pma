import "./table.scss";
import React from "react";
import Input from "../../atoms/input/Input";
import Container from "../../atoms/container/Container";


const DataTable = () => {
   return (
    <main>
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
