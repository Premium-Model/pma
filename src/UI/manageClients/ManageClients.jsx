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
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const fetchAgency = () => {
    makeGet(dispatch, `/client/clients/?client=${query}`, setClient);
  };

  useEffect(() => {
    const unsubscribe = fetchAgency();
    return () => unsubscribe;
  }, [isDelete, query]);

  return (
    <Container variant="normal">
      <Container variant="container_fit">
        <Layout>
          <ClientCardTab client={client} />
          <ClientsTable
            client={client}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            handleQuery={handleQuery}
          />
        </Layout>
      </Container>
    </Container>
  );
};

export default ManageClients;
