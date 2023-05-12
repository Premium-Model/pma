import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "mui-image";
import Button from "../../ATOMIC/atoms/button/Button";
import "../../UI/users/user.scss";
import { useLocation } from "react-router-dom";
import { makeEdit, makeGet } from "../../redux/apiCalls";
import "./edit.scss";
import avatar from "../../Images/img/avatar.svg";
import { userLogout } from "../../redux/apiCalls";
import moment from "moment";

const Editmodel = () => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.process);
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const [isVisible, setIsVisible] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [model, setModel] = useState({});
  const [inputs, setInputs] = useState({});

  // update a user info
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const fetchModel = useCallback(() => {
    makeGet(dispatch, `/user/${path}`, setModel);
  }, [dispatch, path]);

  useEffect(() => {
    let unsubscribe = fetchModel();
    return () => unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    makeEdit(dispatch, `/admin/${path}/edit-user`, { ...inputs });
  };

  // automatically logout a user when session expires
  // const userA = useSelector((state) => state.user.currentUser);

  // const handleLogout = () => {
  //   userLogout(dispatch);
  // };

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
                src={model?.picture ? model?.picture : avatar}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {model?.model?.fullName}
                </span>
                {/* <span className="userShowUserTitle">{model.country}</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">User Details</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Name: {model?.model?.fullName}
                </span>
              </div>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Category: {model?.model?.category}
                </span>
              </div>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Agency: {model?.model?.agency}
                </span>
              </div>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Bio: {model?.model?.bio}
                </span>
              </div>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Gender: {model?.model?.gender === "m" ? "male" : "female"}
                </span>
              </div>

              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Date joined: {moment(model?.createdAt).format("DD-MM-YYYY")}
                </span>
              </div>

              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">Email: {model?.email}</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Location: {model?.state}, {model?.country}
                </span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Instagram: {model?.model?.instagram}
                </span>
              </div>
            </div>
          </div>

          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={model?.username}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={model?.firstName}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={model?.email}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="mobileNo"
                    defaultValue={model?.mobileNo}
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
                    <option defaultValue={model?.isVerified}>
                      {model?.isVerified ? "Yes" : "No"}
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
                    <option defaultValue={model?.isUpdated}>
                      {model?.isUpdated ? "Yes" : "No"}
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
                    src={model?.picture ? model?.picture : avatar}
                    alt=""
                  />
                  <label htmlFor="file">
                    {/* <Publish className="userUpdateIcon" /> */}
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>

                <div className="userUpdateItem">
                  <label>User Subscribed</label>
                  <select
                    name="isSubscribed"
                    id=""
                    className="userUpdateInput"
                    onChange={handleChange}
                  >
                    <option defaultValue={model?.isSubscribed}>
                      {model?.isSubscribed ? "Yes" : "No"}
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>User Featured</label>
                  <select
                    name="isFeatured"
                    id=""
                    className="userUpdateInput"
                    onChange={handleChange}
                  >
                    <option defaultValue={model?.model?.isFeatured}>
                      {model?.model?.isFeatured ? "Yes" : "No"}
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="userUpdateInput"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="*******"
                  />
                </div>

                <br />
                <Button
                  variant="normal"
                  className="userUpdateButton"
                  type="submit"
                  disabled={isFetching}
                >
                  {isFetching?  "Please wait..." : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Editmodel;
