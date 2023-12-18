import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "mui-image";
import Button from "../../ATOMIC/atoms/button/Button";
import "../../UI/users/user.scss";
import { useLocation } from "react-router-dom";
import { makeEdit, makeGet } from "../../redux/apiCalls";
import "./edit.scss";
import avatar from "../../Images/img/avatar.svg";
import moment from "moment";

const Editclient = () => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.process);
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const [isVisible, setIsVisible] = useState(true);
  const [client, setClient] = useState({});
  const [inputs, setInputs] = useState({});
  const [processing, setProcessing] = useState(false);

  const fetchClient = useCallback(() => {
    makeGet(dispatch, `/user/${path}`, setClient);
  }, [dispatch, path]);

  useEffect(() => {
    let unsubscribe = fetchClient();
    return () => unsubscribe;
  }, []);

  // update a user info
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    makeEdit(dispatch, `/admin/${path}/edit-user`, { ...inputs });
  };

  return (
    <>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <Image
                width={90}
                height={90}
                src={client?.picture ? client?.picture : avatar}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {client?.firstName} {client?.lastName}
                </span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">User Details</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  {client?.firstName} {client?.lastName}
                </span>
              </div>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Date joined: {moment(client?.createdAt).format("DD-MM-YYYY")}
                </span>
              </div>
              <div className="userShowInfo">
                {/* <Wc className="userShowIcon" /> */}
                <span className="userShowInfoTitle">{client.country}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">{client?.email}</span>
              </div>
              <span className="userShowTitle">Brand Photos</span>
              <div
                className="userShowInfo"
                style={{ flexDirection: "row", flexWrap: "wrap", gap: "10px", alignItems:'center', justifyContent:'center' }}
              >
                {client?.client?.jobPhotos?.map((item, index) => (
                  <img src={item} key={index} style={{ width: "160px" }} />
                ))}
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={client.firstName}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={client.lastName}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={client.email}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    defaultValue={client.mobileNo}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>User verified</label>
                  <select
                    name="isVerified"
                    id=""
                    className="userUpdateInput"
                    onChange={handleChange}
                  >
                    <option defaultValue={client?.isVerified}>
                      {client?.isVerified ? "Yes" : "No"}
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>User Updated</label>
                  <select
                    name="isUpdated"
                    id=""
                    className="userUpdateInput"
                    onChange={handleChange}
                  >
                    <option defaultValue={client?.isUpdated}>
                      {client?.isUpdated ? "Yes" : "No"}
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={client.picture ? client.picture : avatar}
                    alt=""
                  />
                  <label htmlFor="file">
                    {/* <Publish className="userUpdateIcon" /> */}
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>

                <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="userUpdateInput"
                    placeholder="********"
                    onChange={handleChange}
                  />
                </div>

                <br />
                <Button
                  variant="normal"
                  className="userUpdateButton"
                  type="submit"
                  disabled={isFetching}
                >
                  {isFetching ? "Please wait..." : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Editclient;
