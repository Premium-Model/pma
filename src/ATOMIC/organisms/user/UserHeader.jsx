import React from "react";
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

const UserHeader = () => {
  const navigate = useNavigate()
  const handleHistory = () => {
    navigate("/adminpage/users/add_user");
  };
  const schema = [
    { name: "All", number: "(5,354)" },
    { name: "Administrator", number: "(1)" },
    { name: "Model", number: "(2,654)" },
    { name: "Client", number: "(2,654)" },
    { name: "Agency", number: "(2,654)" },
  ];
  return (
    <div className="user-header">
      <Container variant="gapped">
        <Button variant="transparent">Users</Button>
        <Button variant="outlined" onClick={handleHistory} >
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
        <Button variant="outlined">Search user</Button>
      </Container>
      <Container variant="flex-around">
        <Button variant="transparent">Apply</Button>
        <section className="top-pagination">
          <div>
            <p>2390 users</p>
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
