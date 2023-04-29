import React, { useCallback, useEffect, useState } from "react";
import UserHeader from "../../ATOMIC/organisms/user/UserHeader";
import UserTable from "../../ATOMIC/organisms/user/UserTable";
import { useDispatch } from "react-redux";
import { makeGet } from "../../redux/apiCalls";

const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const fetchUsers = useCallback(() => {
    makeGet(dispatch, "/user", setUsers);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchUsers();
    return () => unsubscribe;
  }, [isDelete]);

  const reverse = [...users].reverse();

  return (
    <div>
      <UserHeader users={users} />
      <UserTable
        reverse={reverse}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
      />
    </div>
  );
};

export default Users;
