import React, { useCallback, useEffect, useState } from "react";
import UserDataTable from "../../molecules/datatable/UserDataTable";

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
