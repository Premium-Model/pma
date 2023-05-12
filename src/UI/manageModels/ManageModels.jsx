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
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const fetchModel = () => {
    makeGet(dispatch, `/model/models/?model=${query}`, setModels);
  };

  useEffect(() => {
    const unsubscribe = fetchModel();
    return () => unsubscribe;
  }, [isDelete, query]);

  return (
    <Container variant="normal">
      <Container variant="container_fit">
        <Layout>
          <ModelsCardTab models={models} />
          <ModelsTable models={models} isDelete={isDelete} setIsDelete={setIsDelete} handleQuery={handleQuery} /> 
        </Layout>
      </Container>
    </Container>
  );
};

export default ManageModels;