import React, { useCallback, useState } from "react";
import "../../ATOMIC/organisms/user/user.scss";
import Button from "../../ATOMIC/atoms/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { makePost } from "../../redux/apiCalls";
import { useLocation } from "react-router-dom";

const GenerateInvoice = () => {
  const { isFetching } = useSelector((state) => state.process);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

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
    makePost(dispatch, `/payment/admin/make-payment/${path}`, { ...inputs }, setMessage);
  };

  message &&
    setTimeout(() => {
      setMessage("");
    }, 2000);

  return (
    <main className="user-container">
      <div className="new-user-header">
        <h3>Generate New Subscription Invoice</h3>
      </div>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-items">
          <div>
            <label style={{ width: "200px" }}>
              Amount <span>*</span>
            </label>
            <input
              type="number"
              placeholder="amount"
              name="amount"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="btn">
          <Button variant="normal">
            {isFetching ? "Please wait..." : "Add Subscription"}
          </Button>
        </div>
      </form>
      {message && alert(message)}
    </main>
  );
};

export default GenerateInvoice;
