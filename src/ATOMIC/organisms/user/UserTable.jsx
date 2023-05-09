import React, { useCallback, useEffect, useState } from "react";
import UserDataTable from "../../molecules/datatable/UserDataTable";
import client1 from "../../../Images/img/client1.jpg";
import client2 from "../../../Images/img/client2.jpg";
import client3 from "../../../Images/img/client3.jpg";
import { useDispatch } from "react-redux";
import { makeGet } from "../../../redux/apiCalls";

const UserTable = ({ reverse, setIsDelete, isDelete }) => {
  return (
    <div className="table_container">
      <UserDataTable
        data={reverse}
        setIsDelete={setIsDelete}
        isDelete={isDelete}
      />
    </div>
  );
};

export default UserTable;
