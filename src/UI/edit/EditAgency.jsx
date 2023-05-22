import "./edit.scss";
import Image from "mui-image";
import "../../UI/users/user.scss";
import { useLocation } from "react-router-dom";
import avatar from "../../Images/img/avatar.svg";
import Button from "../../ATOMIC/atoms/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { makeEdit, makeGet } from "../../redux/apiCalls";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

const EditAgency = () => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.process);
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  // states
  const [processing, setProcessing] = useState(false);
  const [inputs, setInputs] = useState({});
  const [agency, setAgency] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const fetchClient = useCallback(() => {
    makeGet(dispatch, `/user/${path}`, setAgency);
  }, [dispatch, path]);

  useEffect(() => {
    let unsubscribe = fetchClient();
    return () => unsubscribe;
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    makeEdit(dispatch, `/admin/${path}/edit-user`, { ...inputs });
  };


  // handle input change function
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setInputs((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  //handle submit function
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const url = `/agency/${agency._id}`;
  //     await makeEdit(dispatch, url, inputs);
  //     setMsg("updated succesfully");
  //     dispatch(updateAgency({ id: agency._id, ...inputs }));
  //   } catch (err) {
  //     console.error(err);
  //     setMsg("Error uploading data");
  //   }
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
                src={agency?.picture ? agency?.picture : avatar}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {agency?.agency?.fullName}
                </span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">User Details</span>
              <div className="userShowInfo">
                <p>Full name</p>
                <span className="userShowInfoTitle">
                  {agency?.agency?.fullName}
                </span>
              </div>

              <div className="userShowInfo">
                <p>Email</p>
                <span className="userShowInfoTitle">{agency?.email}</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  Date joined: {moment(agency?.createdAt).format("DD-MM-YYYY")}
                </span>
              </div>
              <div className="userShowInfo">
                <Button
                  variant="normal"
                  className="userUpdateButton"
                  type="submit"
                  disabled={isFetching}
                >
                  <a
                    href={`/adminpage/add-subscription/${agency?.agency?.uuid}`}
                    style={{ color: "white" }}
                  >
                    Add new subscription
                  </a>
                </Button>
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
                    defaultValue={agency?.firstName}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={agency?.lastName}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={agency.email}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="mobileNo"
                    className="userUpdateInput"
                    defaultValue={agency?.mobileNo}
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
                    <option defaultValue={agency?.isVerified}>
                      {agency?.isVerified ? "Yes" : "No"}
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
                    <option defaultValue={agency?.isUpdated}>
                      {agency?.isUpdated ? "Yes" : "No"}
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
                    src={agency?.picture ? agency?.picture : avatar}
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
                    <option defaultValue={agency?.isSubscribed}>
                      {agency?.isSubscribed ? "Yes" : "No"}
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
                <div className="userUpdateButton">
                  <Button variant="normal" type="submit" disabled={isFetching}>
                    {isFetching ? "Please wait..." : "Update"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditAgency;
