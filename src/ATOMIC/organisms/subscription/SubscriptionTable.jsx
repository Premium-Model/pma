import React from "react";
import { v4 } from "uuid";
import Button from "../../atoms/button/Button";
import Card from "../../atoms/card/Card";
import '../../../ATOMIC/molecules/datatable/table.scss'

const SubscriptionTable = () => {
  const schema = [
    {
      user: "joyabazu@gmail.com",
      category: "Agency",
      fee: "2,000",
      duration: "365 days",
      gateway: "paystack",
      transID: "Payment: 79A99E7C2 Subscription",
      status: "Active",
      date: " March 22, 2023 at 10:18am",
    },
    {
      user: "emmanuelabazu@gmail.com",
      category: "Model",
      fee: "3,300",
      duration: "365 days",
      gateway: "paystack",
      transID: "Payment: 79A99E7C2 Subscription",
      status: "Success",
      date: " March 22, 2023 at 10:18am",
    },
    {
      user: "models@gmail.com",
      category: "Client",
      fee: "2,000",
      duration: "200 days",
      gateway: "paystack",
      transID: "Payment: 79A99E7C2 Subscription",
      status: "Pending",
      date: " March 22, 2023 at 10:18am",
    },
    {
      user: "emmanuelabazu@gmail.com",
      category: "Model",
      fee: "2,000",
      duration: "365 days",
      gateway: "paystack",
      transID: "Payment: 79A99E7C2 Subscription",
      status: "Active",
      date: " March 22, 2023 at 10:18am",
    },
    {
      user: "emmanuelabazu@gmail.com",
      category: "Model",
      fee: "2,000",
      duration: "365 days",
      gateway: "paystack",
      transID: "Payment: 79A99E7C2 Subscription",
      status: "Active",
      date: " March 22, 2023 at 10:18am",
    },
    {
      user: "emmanuelabazu@gmail.com",
      category: "Model",
      fee: "2,000",
      duration: "365 days",
      gateway: "paystack",
      transID: "Payment: 79A99E7C2 Subscription",
      status: "Active",
      date: " March 22, 2023 at 10:18am",
    },
  ];
  return (
    <div>
      <Card variant="full_width">Available Subscriptions</Card>
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
          {schema.map((item, i) => {
            return (
              <tr key={v4}>
                <td>{i + 1}</td>
                <td>{item.user}</td>
                <td>{item.category}</td>
                <td>{item.fee}</td>
                <td>{item.duration}</td>
                <td>{item.gateway}</td>
                <td>{item.transID}</td>
                <td>
                  <Button variant="blur">{item.status}</Button>
                </td>
                <td>{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionTable;
