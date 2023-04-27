import React from "react";
import UserDataTable from "../../molecules/datatable/UserDataTable";
import client1 from "../../../Images/img/client1.jpg";
import client2 from "../../../Images/img/client2.jpg";
import client3 from "../../../Images/img/client3.jpg";

const UserTable = () => {
  const data = [
    {
      id: 1,
      img: client1,
      name: "Emmanuel Abazu",
      email: "abazu99@gmail.com",
      role: "Model",
    },
    {
      id: 2,
      img: client2,
      name: "Fourwall Models",
      email: "models9@gmail.com",
      role: "client",
    },
    {
      id: 3,
      img: client3,
      name: "Spohia Ojemba",
      email: "ojemba@gmail.com",
      role: "Agency",
    },
    {
      id: 4,
      img: client2,
      name: "Emmanuel Abazu",
      email: "abazu99@gmail.com",
      role: "Model",
    },
    {
      id: 5,
      img: client1,
      name: "Spohia Ojemba",
      email: "ojemba@gmail.com",
      role: "Client",
    },
    {
      id: 6,
      img: client3,
      name: "Fourwall Models",
      email: "models9@gmail.com",
      role: "Agency",
    },
    {
      id: 7,
      img: client2,
      name: "Emmanuel Abazu",
      email: "abazu99@gmail.com",
      role: "Model",
    },
  ];
  return (
    <div className="table_container">
      <UserDataTable data={data} />
    </div>
  );
};

export default UserTable;
