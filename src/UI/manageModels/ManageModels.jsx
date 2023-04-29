import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../ATOMIC/templates/Layout";
import ModelsTable from "../../ATOMIC/organisms/models/ModelsTable";
import ModelsCardTab from "../../ATOMIC/organisms/models/ModelsCardTab";
import Container from "../../ATOMIC/atoms/container/Container";
import { makeGet } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";


const ManageModels = () => {
  const dispatch = useDispatch();

  const [models, setModels] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const fetchModel = useCallback(() => {
    makeGet(dispatch, "/model/models", setModels);
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = fetchModel();
    return () => unsubscribe;
  }, [isDelete]);

  return (
    <Container variant="normal">
      <Container variant="container_fit">
        <Layout>
          <ModelsCardTab models={models} />
          <ModelsTable models={models} isDelete={isDelete} setIsDelete={setIsDelete} /> 
        </Layout>
      </Container>
    </Container>
  );
};

export default ManageModels;