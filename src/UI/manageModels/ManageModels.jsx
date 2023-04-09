import React from "react";
import Layout from "../../ATOMIC/templates/Layout";
import ModelsTable from "../../ATOMIC/organisms/models/ModelsTable";
import ModelsCardTab from "../../ATOMIC/organisms/models/ModelsCardTab";
import Container from "../../ATOMIC/atoms/container/Container";

const ManageModels = () => {
  return (
    <Container variant="normal">
      <Container variant="container_fit">
        <Layout>
          <ModelsCardTab />
          <ModelsTable /> 
        </Layout>
      </Container>
    </Container>
  );
};

export default ManageModels;