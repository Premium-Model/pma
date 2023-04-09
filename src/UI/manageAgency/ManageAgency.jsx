import React from "react";
import Layout from "../../ATOMIC/templates/Layout";
import Container from "../../ATOMIC/atoms/container/Container";
import AgencyCardTab from "../../ATOMIC/organisms/agency/AgencyCardTab";
import AgencyTable from "../../ATOMIC/organisms/agency/AgencyTable";

const ManageAgency = () => {
  return (
    <Container variant="normal">
      <Container variant="container_fit">
        <Layout>
          <AgencyCardTab />
          <AgencyTable /> 
        </Layout>
      </Container>
    </Container>
  );
};

export default ManageAgency;