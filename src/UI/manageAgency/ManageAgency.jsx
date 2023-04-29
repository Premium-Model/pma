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

  const fetchAgency = useCallback(() => {
    makeGet(dispatch, "/agency", setAgency);
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = fetchAgency();
    return () => unsubscribe;
  }, [isDelete]);

  return (
    <Container variant="normal">
      <Container variant="container_fit">
        <Layout>
          <AgencyCardTab agency={agency} />
          <AgencyTable
            agency={agency}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
          />
        </Layout>
      </Container>
    </Container>
  );
};

export default ManageAgency;
