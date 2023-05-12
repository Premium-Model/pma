import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../ATOMIC/templates/Layout";
import Container from "../../ATOMIC/atoms/container/Container";
import AgencyCardTab from "../../ATOMIC/organisms/agency/AgencyCardTab";
import AgencyTable from "../../ATOMIC/organisms/agency/AgencyTable";
import { useDispatch } from "react-redux";
import { makeGet } from "../../redux/apiCalls";

const ManageAgency = () => {
  const dispatch = useDispatch();

  const [agency, setAgency] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const fetchAgency = () => {
    makeGet(dispatch, `/agency/?agency=${query}`, setAgency);
  };

  useEffect(() => {
    const unsubscribe = fetchAgency();
    return () => unsubscribe;
  }, [isDelete, query]);

  return (
    <Container variant="normal">
      <Container variant="container_fit">
        <Layout>
          <AgencyCardTab agency={agency} />
          <AgencyTable
            agency={agency}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            handleQuery={handleQuery}
          />
        </Layout>
      </Container>
    </Container>
  );
};

export default ManageAgency;
