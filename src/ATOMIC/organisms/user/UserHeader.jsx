import React, { useState } from "react";
import Button from "../../atoms/button/Button";
import Container from "../../atoms/container/Container";
import { v4 } from "uuid";
import "./user.scss";
import Icons from "../../atoms/icons/Icons";
import { useNavigate } from "react-router-dom";
import {
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";

const UserHeader = ({ users, handleQuery }) => {
  const navigate = useNavigate();
  const modelLen = users.filter((user) => user.role === "model");
  const agencyLen = users.filter((user) => user.role === "agency");
  const clientLen = users.filter((user) => user.role === "client");

  const handleHistory = () => {
    navigate("/adminpage/users/add_user");
  };
  const schema = [
    { name: "All", number: users?.length },
    // { name: "Administrator", number: "(1)" },
    { name: "Model", number: modelLen?.length },
    { name: "Client", number: clientLen?.length },
    { name: "Agency", number: agencyLen?.length },
  ];
  return (
    <div className="user-header">
      <Container variant="gapped">
        <Button variant="transparent">Users</Button>
        <Button variant="outlined" onClick={handleHistory}>
          Add New
        </Button>
      </Container>
      <Container variant="flexed">
        <Container variant="gapped">
          {schema.map((item) => {
            return (
              <div id={v4} className="wrapper">
                <p className="item">
                  {item.name} <span>{item.number}</span>
                </p>
                <div className="vr"></div>
              </div>
            );
          })}
        </Container>

        <input
          placeholder="Search for user by email..."
          onChange={handleQuery}
          style={{ padding: "15px", borderRadius: "10px" }}
        />
      </Container>
      <Container variant="flex-around">
        <Button variant="transparent">Apply</Button>
        <section className="top-pagination">
          <div>
            <p>{users?.length} users</p>
          </div>
          <div className="users-calc">
            <Button>
              <NavigateBeforeOutlined />
            </Button>
            <div>
              <p>4</p>
              <p>of</p>
              <p>50</p>
            </div>
            <Button>
              <NavigateNextOutlined />
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default UserHeader;
