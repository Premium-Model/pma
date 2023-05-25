import React from "react";
import moment from "moment";
import { makeGet } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Table = ({ item, i }) => {
  const dispatch = useDispatch();
  const [sender, setSender] = useState({});

  const createdAt = new Date(item.createdAt);
  const endDate = new Date(
    createdAt.getFullYear() + 1,
    createdAt.getMonth(),
    createdAt.getDate()
  );

  const fetchSender = useCallback(() => {
    makeGet(dispatch, `/user/user/${item.sender}`, setSender);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchSender();
    return () => unsubscribe;
  }, []);

  return (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{item.senderEmail}</td>
      <td>{sender?.mobileNo}</td>
      <td>{item.desc}</td>
      <td>{item.amount}</td>
      {/* <td>{item.senderEmail}</td> */}
      <td>{item._id}</td>
      <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
      <td>{moment(item?.endDate ? item?.endDate : endDate).format("DD-MM-YYYY")}</td>
      {/* <td>
        <Button variant="blur">
            {item.isApproved ? "Verified" : "Pending"}
        </Button>
        {!item.isApproved && (
            <Button
            variant="blur"
            onClick={() => handleApprovePayment(item._id)}
            >
            Approve payment
            </Button>
        )}
        </td> */}
      {/* <td>
        <Button
            variant="blur"
            onClick={() => handleDeletePayment(item._id)}
        >
            Delete
        </Button>
        </td> */}
    </tr>
  );
};

export default Table;
