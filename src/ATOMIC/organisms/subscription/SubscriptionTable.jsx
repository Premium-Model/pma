import React, { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import Button from "../../atoms/button/Button";
import Card from "../../atoms/card/Card";
import "../../../ATOMIC/molecules/datatable/table.scss";
import { useDispatch } from "react-redux";
import { makeEdit, makeGet } from "../../../redux/apiCalls";
import moment from "moment";
import "../../../ATOMIC/organisms/clients/tableSection.scss";
import { userRequest } from "../../../redux/requestMethod";
import Table from "./Table";
import Pagination from "../../molecules/datatable/Pagination";

const SubscriptionTable = () => {
  const dispatch = useDispatch();

  const [subscriptions, setSubscriptons] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [query, setQuery] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const totalRows = subscriptions?.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const reversed = [...subscriptions].reverse();
  const rowsToDisplay = reversed?.slice(startIndex, endIndex);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchSubscriptions = () => {
    makeGet(dispatch, `/payment/payments/?payment=${query}`, setSubscriptons);
  };

  useEffect(() => {
    let unsubscribe = fetchSubscriptions();
    return () => unsubscribe;
  }, [isApproved, isDelete, query]);

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

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
      <Card variant="full_width">
        Available Subscriptions{" "}
        <input
          type="text"
          placeholder="Search by email..."
          style={{ padding: "10px" }}
          onChange={handleQuery}
        />
      </Card>
      <section className="table_container">
        <table className="subs-table">
          <thead>
            <tr>
              <th># ID</th>
              <th>USER</th>
              <th>PHONE</th>
              <th>CATEGORY</th>
              <th>FEE</th>
              {/* <th>EMAIL</th> */}
              <th>TRANSACTION ID</th>
              {/* <th>STATUS</th> */}
              <th>START DATE</th>
              <th>END DATE</th>
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay?.map((item, i) => {
              return <Table item={item} key={i} i={i} />;
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
      </section>
    </div>
  );
};

export default SubscriptionTable;
