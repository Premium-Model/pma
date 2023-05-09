import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "mui-image";
import Button from "../../ATOMIC/atoms/button/Button";
import '../../UI/users/user.scss';
import { useLocation } from "react-router-dom";
import { makeGet } from "../../redux/apiCalls";
import "./edit.scss";
import avatar from '../../Images/img/avatar.svg'
import { userLogout } from "../../redux/apiCalls";

const EditAgency = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const [isVisible, setIsVisible] = useState(true);
  const [agency, setAgency] = useState({});

  const fetchClient = useCallback(() => {
    makeGet(dispatch, `/agency/${path}`, setAgency);
  }, [dispatch, path]);

  useEffect(() => {
    let unsubscribe = fetchClient();
    return () => unsubscribe;
  }, []);

  // update a user info
  const [inputs, setInputs] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              src={agency.picture ? agency.picture : avatar}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{agency.fullName}</span>
              {/* <span className="userShowUserTitle">{agency.country}</span> */}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">User Details</span>
            <div className="userShowInfo">
              {/* <PermIdentity className="userShowIcon" /> */}
              <span className="userShowInfoTitle">{agency.fullName}</span>
            </div>
            
            <div className="userShowInfo">
              {/* <CalendarToday className="userShowIcon" /> */}
              <span className="userShowInfoTitle">
                {/* {dateformat(user.createdAt, "mmmm dd yyyy")} */}
              </span>
            </div>
            <div className="userShowInfo">
              {/* <Wc className="userShowIcon" /> */}
              <span className="userShowInfoTitle">{agency.country}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              {/* <PhoneAndroid className="userShowIcon" /> */}
              <span className="userShowInfoTitle">{agency.category}</span>
            </div>
            <div className="userShowInfo">
              {/* <MailOutline className="userShowIcon" /> */} 
              <span className="userShowInfoTitle">{agency.email}</span>
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
                  placeholder={agency.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={agency.fullName}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={agency.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder={agency.phoneNumber}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={agency.picture ? agency.picture : avatar}
                  alt=""
                />
                <label htmlFor="file">
                  {/* <Publish className="userUpdateIcon" /> */}
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <br />
              <Button
              variant="normal"
                className="userUpdateButton"
                type="submit"
                disabled={processing}
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};
export default EditAgency;
