import "./edit.scss";
import Image from "mui-image";
import "../../UI/users/user.scss";
import { useLocation } from "react-router-dom";
import avatar from "../../Images/img/avatar.svg";
import Button from "../../ATOMIC/atoms/button/Button";
import { updateAgency } from "../../redux/agencyRedux";
import { useDispatch } from "react-redux";
import { makeGet, update } from "../../redux/apiCalls";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { useCallback, useEffect, useState } from "react";

const EditAgency = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  // states
  const [processing, setProcessing] = useState(false);
  const [agency, setAgency] = useState({});
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");

  const fetchClient = useCallback(() => {
    makeGet(dispatch, `/agency/${path}`, setAgency);
  }, [dispatch, path]);

  useEffect(() => {
    let unsubscribe = fetchClient();
    return () => unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAgency = { name, email, photoUrl, password };

    try {
      const url = `/agency/${agency._id}`;
      await update(dispatch, url, updatedAgency, setMsg);
      // handle success
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  // how do i use the above code to update users info  and display the success message on success in another component?

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
        <div>{msg && <p>{msg}</p>}</div>
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
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">User Details</span>
              <div className="userShowInfo">
                <p>Full name</p>
                <span className="userShowInfoTitle">{agency.fullName}</span>
              </div>
              <div className="userShowInfo">
                <p>Email</p>
                <span className="userShowInfoTitle">{agency.email}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    placeholder={agency.fullName}
                    className="userUpdateInput"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    required
                    type="text"
                    name="email"
                    placeholder={agency.email}
                    className="userUpdateInput"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    required
                    type="password"
                    name="password"
                    className="userUpdateInput"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="*******"
                  />
                </div>
                <div className="userUpdateHidden">
                  {/* <div className="userUpdateRight"> */}
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

                  <Button variant="normal" type="submit" disabled={processing}>
                    Update
                  </Button>
                  {/* </div> */}
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <label htmlFor="file" style={{ cursor: "pointer" }}>
                      <img
                        className="userUpdateImg"
                        src={agency.picture ? agency.picture : avatar}
                        alt=""
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* <AddAPhotoIcon/> */}
                        <span style={{ color: "white" }}>select img</span>
                      </div>
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>
                </div>
                <br />
                <div className="userUpdateButton">
                  <Button variant="normal" type="submit" disabled={processing}>
                    Update
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
