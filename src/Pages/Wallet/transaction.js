import {
  AccountBalanceWallet,
  AccountBalanceWalletTwoTone,
  Wallet,
  WalletOutlined,
  WalletTwoTone,
} from "@mui/icons-material";
import moment from "moment";
import { useSelector } from "react-redux";

function Transaction({ details, detailsId, viewDetails, handleViewDetails }) {
  const user = useSelector((state) => state.user.currentUser);

  let NigeriaNGN = Intl.NumberFormat("en-US");
  const { id, type, avatar, name, brand, amount, date, time } = details;
  // console.log(details.withdrawBy, user.username);

  return (
    <li>
      <div
        onClick={() => handleViewDetails && handleViewDetails(details._id)}
        className="transaction-item"
      >
        <div className="transaction-avatar">
          {details?.withdrawBy ? (
            <AccountBalanceWalletTwoTone />
          ) : details?.desc ||
            details?.receiver === user?.username ||
            details?.receiverId === user?._id ? (
            <AccountBalanceWallet />
          ) : (
            <AccountBalanceWalletTwoTone />
          )}
        </div>
        <div className="transaction-text">
          <span>
            <h4 className="transaction-title">
              {details?.withdrawBy
                ? "Withdrawn"
                : details?.desc
                ? details?.desc
                : details?.receiver === user?.username
                ? "Money Received"
                : details?.receiverId === user?._id
                ? "Money received"
                : "Money sent"}
            </h4>
            <p className="transaction-time">
              {moment(details?.createdAt).format("DD-MM-YYYY")}{" "}
              {details?.withdrawBy
                ? ""
                : details?.desc === "Wallet funding"
                ? ""
                : details?.receiver === user?.username
                ? `- ${details?.sender}`
                : details?.receiverId === user?._id
                ? `- ${details?.sender}`
                : details?.receiver
                ? `- ${details?.receiver}`
                : ""}
            </p>
            <p className="transaction-sub-title">{brand}</p>
          </span>
          <span className="transaction-amount-wrapper">
            <p
              className="transaction-amount"
              style={{
                color: details?.withdrawBy
                  ? "var(--dimpink)"
                  : details?.desc === "Wallet funding"
                  ? "rgb(9 255 110)"
                  : details?.receiver === user?.username
                  ? "rgb(9 255 110)"
                  : details?.receiverId === user?._id
                  ? "rgb(9 255 110)"
                  : "var(--dimpink)",
              }}
            >
              {details?.withdrawBy
                ? "-"
                : details?.desc === "Wallet funding"
                ? "+"
                : details?.receiver === user?.username
                ? "+"
                : details?.receiverId === user?._id
                ? "+"
                : "-"}
              &#8358;
              {NigeriaNGN.format(amount)}
            </p>
            <p className="transaction-sub-title">Successful</p>
          </span>
        </div>
      </div>

      {/* transaction detail  section*/}
      <div
        style={{ display: id === detailsId && viewDetails ? "flex" : "none" }}
        className="transaction-details"
      >
        <div className="transaction-details-top">
          <h4 className="details-title">
            {type === "credit" ? "From" : "To"} {name}
          </h4>
          <span>
            <p
              className="details-amount"
              style={{ color: type === "credit" ? "#07ab28f5" : "#d40707" }}
            >
              {type === "credit" ? "+" : "-"}
              &#8358;
              {NigeriaNGN.format(amount)}
            </p>
            <p className="details-status">
              <i
                style={{ color: "#07ab28f5" }}
                className="fa-solid fa-check-circle"
              ></i>
              {type === "credit" ? " Received" : " Successful"}
            </p>
          </span>
        </div>
        <ul className="transaction-details-main">
          <li>
            <span>Amount:</span>
            <span
              style={{ color: type === "credit" ? "#07ab28f5" : "#d40707" }}
              className="details-param"
            >
              {type === "credit" ? "+" : "-"}
              &#8358;
              {NigeriaNGN.format(amount)}
            </span>
          </li>
          <li>
            <span>Time:</span>
            <span className="details-param">
              {time}, {date}
            </span>
          </li>
          <li>
            <span>Method:</span>
            <span className="details-param">
              {type === "credit" ? "Pay Model" : "Withdraw"}
            </span>
          </li>
          <li>
            <span>{type === "credit" ? "Sender" : "Receiver"} Name:</span>
            <span className="details-param">{name}</span>
          </li>
          <li>
            <span>{type === "credit" ? "Sender" : "Receiver"} Bank:</span>
            <span className="details-param">{"Access Bank"}</span>
          </li>
          <li>
            <span>{type === "credit" ? "Sender" : "Receiver"} Account:</span>
            <span className="details-param">{122345667}</span>
          </li>
          <li>
            <span>Remark:</span>
            <span className="details-param">
              {"payment for service rendered"}
            </span>
          </li>

          <li>
            <span>Transaction Id:</span>
            <span className="details-param">{id}</span>
          </li>
          <li>
            <span>status:</span>
            <span className="details-param">
              <i
                style={{ color: "#07ab28f5" }}
                className="fa-solid fa-check-circle"
              ></i>
              {type === "credit" ? " Received" : " Successful"}
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
}

export default Transaction;
