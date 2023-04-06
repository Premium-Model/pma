import React from "react";
import Layout from "../../ATOMIC/templates/Layout";
import ClientCardTab from "../../ATOMIC/organisms/clients/ClientCardTab";
import Container from "../../ATOMIC/atoms/container/Container";
import ClientsTable from "../../ATOMIC/organisms/clients/ClientsTable";

const ManageClients = () => {
  return (
    <Container variant="normal">
      <Layout>
        <ClientCardTab />
        <ClientsTable/>
      </Layout>
    </Container>
  );
};

export default ManageClients;
