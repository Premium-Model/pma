import { useState } from "react";
import "./withdraw.css";
import { ambassadorsRequest } from "../../../../redux/requestMethod";

const PayOut = ({ amb, toggleWithdrawal, setToggleWithdrawal, formatMoney }) => {
  const [showId, setShowId] = useState(false);
  const [message, setMessage] = useState("");
  const [toggleMsg, setToggleMsg] = useState(false);

  const [withdraw, setWithDraw] = useState({
    Amount: "",
    ID: "",
  });

  const handleWithDraw = (e) => {
    const { id, value } = e.target;

    setWithDraw((prev) => ({ ...prev, [id]: value }));
  };

  const payOut = async (data) => {
    try {
      const res = await ambassadorsRequest.put(`/admin/amb-edit/${amb._id}`, data);
      //console.log(res.data);
      setWithDraw({
        Amount: "",
        ID: "",
      });
      setToggleWithdrawal((prev) => !prev);
      setMessage("Transaction Successful!");
      setToggleMsg(true);
    } catch (err) {
      //console.log(err?.response?.data);
      setMessage("Transaction Failed!");
    }
  };

  const handlePayOut = () => {
    let newPayout = amb.payout + Number(withdraw.Amount);

    let newBal = amb.availableBal - Number(withdraw.Amount);

    if (withdraw.Amount > amb.availableBal) {
      setMessage("Error: Insufficient Fund!");
      setToggleMsg(true);
    } else if (withdraw.ID !== amb.code) {
      setMessage("Error: Incorrect Id!");
      setToggleMsg(true);
    } else {
      payOut({
        availableBal: newBal,
        payout: newPayout,
      });
    }
  };

  return (
    <>
      <section
        style={{ transform: toggleWithdrawal && `translateX(${0}%)` }}
        className="modal-container">
        <div className="withdraw-box">
          <div className="withdraw-top-text">
            <h3>Withdraw</h3>
            <i
              onClick={() => setToggleWithdrawal((prev) => !prev)}
              className="fa-solid fa-xmark noti-close colored-hover"></i>
          </div>

          <div className="withdraw-wrapper">
            <div className="withdraw-stats">
              <div className="stat-wrapper">
                <button className="stat-tag pink-tag">Earning</button>
                <p className="-stat">{formatMoney(amb.totalEarning)}</p>
              </div>
              <div className="stat-wrapper">
                <button className="stat-tag black-tag">Balance</button>
                <p className="-stat">{formatMoney(amb.availableBal)}</p>
              </div>
              <div className="stat-wrapper  ">
                <button className="stat-tag green-tag">PayOut</button>
                <p className="-stat">{formatMoney(amb.payout)}</p>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePayOut();
              }}
              className="withdraw-form">
              <label className="Abs-label" htmlFor="Amount">
                <input
                  id="Amount"
                  type="number"
                  value={withdraw.Amount}
                  onChange={handleWithDraw}
                  placeholder="Amount..."
                  spellCheck={false}
                  autoComplete="off"
                  required
                />
              </label>

              <label className="-Abs-label" htmlFor="ID">
                <input
                  id="ID"
                  type={showId ? "text" : "password"}
                  value={withdraw.ID}
                  onChange={handleWithDraw}
                  placeholder="Enter id..."
                  spellCheck={false}
                  autoComplete="off"
                  required
                />

                {showId ? (
                  <i
                    onClick={() => setShowId((prev) => !prev)}
                    className="fa-solid fa-eye viewPwd"></i>
                ) : (
                  <i
                    onClick={() => setShowId((prev) => !prev)}
                    className="fa-solid fa-eye-slash viewPwd"></i>
                )}
              </label>

              <button className="withdraw-btn">withdraw</button>
            </form>
          </div>
        </div>
      </section>

      {/* modal section.... // // displaying the response from the server */}
      <section className="modal-container" style={{ transform: toggleMsg && `translateX(${0}%)` }}>
        <div className="modal-box">
          {message === "Transaction Successful!" ? (
            <i className="fa-solid fa-circle-check fa-2x success-icon"></i>
          ) : (
            <i className="fa-solid fa-circle-xmark fa-2x error-icon"></i>
          )}

          <p className="modal-text">{message}</p>
          <div
            onClick={() => {
              setToggleMsg(false);
              setMessage("");
            }}
            className="modal-btn">
            Got it!
          </div>
        </div>
      </section>
    </>
  );
};
export default PayOut;
