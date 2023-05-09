import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../ATOMIC/templates/Layout";
import ClientCardTab from "../../ATOMIC/organisms/clients/ClientCardTab";
import Container from "../../ATOMIC/atoms/container/Container";
import ClientsTable from "../../ATOMIC/organisms/clients/ClientsTable";
import { useDispatch } from "react-redux";
import { makeGet } from "../../redux/apiCalls";

const ManageClients = () => {
  const dispatch = useDispatch();

  const [client, setClient] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const fetchAgency = useCallback(() => {
    makeGet(dispatch, "/client/clients", setClient);
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = fetchAgency();
    return () => unsubscribe;
  }, [isDelete]);

  return (
    <Container variant="normal">
      <Container variant="container_fit">
        <Layout>
          <ClientCardTab client={client} />
          <ClientsTable
            client={client}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
          />
        </Layout>
      </Container>
    </Container>
  );
};

export default ManageClients;
