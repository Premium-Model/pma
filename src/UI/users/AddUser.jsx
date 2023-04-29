import React, { useCallback, useState } from "react";
import "../../ATOMIC/organisms/user/user.scss";
import Button from "../../ATOMIC/atoms/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginRegister, makePost } from "../../redux/apiCalls";

const AddUser = () => {
  const { isFetching } = useSelector((state) => state.process);
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makePost(dispatch, "/admin/add-user", { ...inputs }, setMessage);
  };

  message && setTimeout(() => {
    setMessage('')
  }, 2000);

  return (
    <main className="user-container">
      <div className="new-user-header">
        <h3>Add New User</h3>
        <p>Create a new user and add them to the platform</p>
      </div>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-items">
          <div>
            <label style={{ width: "200px" }}>
              Role <span>*</span>
            </label>
            <select
              name="role"
              id="role"
              style={{ width: "100%", height: "30px" }}
              required
              onChange={handleChange}
            >
              <option value="">Choose user role</option>
              <option value="client">Client</option>
              <option value="model">Model</option>
              <option value="agency">Agency</option>
            </select>
          </div>
          <div>
            <label style={{ width: "200px" }}>
              Email <span>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ width: "200px" }}>
              First name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="first name"
              name="firstName"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ width: "200px" }}>
              Last name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="last name"
              name="lastName"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ width: "200px" }}>
              Mobile No <span>*</span>
            </label>
            <input
              type="number"
              placeholder="number"
              name="mobileNo"
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ width: "200px" }}>
              Password <span>*</span>
            </label>
            <input
              type={visibility ? "text" : "password"}
              placeholder="password"
              name="password"
              required
              onChange={handleChange}
            />
            <Button
              variant="outlined"
              onClick={() => setVisibility(!visibility)}
            >
              {visibility ? "Hide" : "Show"}
            </Button>
          </div>
        </div>
        <div className="user-notification">
          <p>Send user notification?</p>
          <div>
            <label htmlFor="">
              <input type="checkbox" name="" id="" />
            </label>
          </div>
          <p>Send the new user a mail about their account?</p>
        </div>
        <div className="btn">
          <Button variant="normal">
            {isFetching ? "Please wait..." : "Add New user"}
          </Button>
        </div>
      </form>
      {message && alert(message)}
    </main>
  );
};

export default AddUser;
