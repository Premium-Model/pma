import React, { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import Button from "../../atoms/button/Button";
import Card from "../../atoms/card/Card";
import "../../../ATOMIC/molecules/datatable/table.scss";
import { useDispatch } from "react-redux";
import { makeEdit, makeGet } from "../../../redux/apiCalls";
import moment from "moment";
import '../../../ATOMIC/organisms/clients/tableSection.scss'
import { userRequest } from "../../../redux/requestMethod";

const SubscriptionTable = () => {
  const dispatch = useDispatch();

  const [subscriptions, setSubscriptons] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const fetchSubscriptions = useCallback(() => {
    makeGet(dispatch, "/payment/payments", setSubscriptons);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchSubscriptions();
    return () => unsubscribe;
  }, [isApproved, isDelete]);

  const reversed = [...subscriptions].reverse();

  const handleApprovePayment = (id) => {
    makeEdit(dispatch, `/payment/approve/${id}`);
    setIsApproved(!isApproved);
  };

  const handleDeletePayment = async (id) => {
    await userRequest.delete(`/payment/delete/${id}`);
    setIsDelete(!isDelete);
  };

  return (
    <div>
      <Card variant="full_width">Available Subscriptions</Card>
      <section className="table_container">
        <table className="subs-table">
          <thead>
            <tr>
              <th># ID</th>
              <th>USER</th>
              <th>CATEGORY</th>
              <th>FEE</th>
              <th>DURATION</th>
              <th>GATEWAY</th>
              <th>TRANSACTION ID</th>
              <th>STATUS</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {reversed?.map((item, i) => {
              return (
                <tr key={v4}>
                  <td>{i + 1}</td>
                  <td>{item.senderEmail}</td>
                  <td>{item.desc}</td>
                  <td>{item.amount}</td>
                  <td>365d</td>
                  <td>Paystack</td>
                  <td>{item._id}</td>
                  <td>
                    <Button variant="blur">
                      {item.isApproved ? "Verified" : "Pending"}
                    </Button>
                    {/* {!item.isApproved && (
                      <Button
                        variant="blur"
                        onClick={() => handleApprovePayment(item._id)}
                      >
                        Approve payment
                      </Button>
                    )} */}
                  </td>
                  <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
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
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SubscriptionTable;
