import React, { useState } from "react";
import "../../ATOMIC/organisms/user/user.scss";
import Button from "../../ATOMIC/atoms/button/Button";

const AddUser = () => {
  const [visibility, setVisibility] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <main className="user-container">
      <div className="new-user-header">
        <h3>Add New User</h3>
        <p>Create a new user and add them to the platform</p>
      </div>
      <form action="" className="user-form" onSubmit={handleSubmit}>
        <div className="form-items">
          <div>
            <label>
              User name <span>*</span>{" "}
            </label>
            <input type="text" placeholder="username" />
          </div>
          <div>
            <label>
              Email <span>*</span>
            </label>
            <input type="email" placeholder="email" />
          </div>
          <div>
            <label>
              First name <span>*</span>
            </label>
            <input type="text" placeholder="username" />
          </div>
          <div>
            <label>
              Last name <span>*</span>
            </label>
            <input type="text" placeholder="username" />
          </div>
          <div>
            <label>
              Mobile No <span>*</span>
            </label>
            <input type="number" placeholder="number" autoComplete="off" />
          </div>
          <div>
            <label>
              Password <span>*</span>
            </label>
            <input
              type={visibility ? "text" : "password"}
              placeholder="password"
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
          <Button variant="normal">Add New user</Button>
        </div>
      </form>
    </main>
  );
};

export default AddUser;
