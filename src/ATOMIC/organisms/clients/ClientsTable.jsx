import React from "react";
import InputTab from "./InputTab";
import DataTable from "../../molecules/datatable/DataTable";
import client1 from '../../../Images/img/client1.jpg'
import client2 from '../../../Images/img/client2.jpg'
import client3 from '../../../Images/img/client3.jpg'

const ClientsTable = () => {
  const data = [
    {
      img: client1,
      location: "Lagos, Nigeria",
      name: "HNK FASHION",
      category: "Fashion designer",
    },
    {
      img: client2,
      location: "Abuja, Nigeria",
      name: "JOY FACEBEAT",
      category: "MakeUp artist",
    },
    {
      img: client3,
      location: "Ekiti, Nigeria",
      name: "TALENT MANAGER",
      category: "Agent",
    },
  ];
  return (
    <main>
      <InputTab />
      <DataTable data={data}/>
    </main>
  );
};

export default ClientsTable;
