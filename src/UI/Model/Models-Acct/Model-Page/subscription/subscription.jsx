import { useCallback, useEffect, useState } from "react";
import FadeIn from "../../../../../Components/FadeIn/fade_in";
import "./subscription.scss";
import SubscriptionDetail from "./subscription_detail";
import { useDispatch } from "react-redux";
import { makeGet } from "../../../../../redux/apiCalls";
import moment from "moment";

const ModelSubscription = () => {
  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState(false);
  const [paymentInvoice, setPaymentInvoice] = useState([]);
  const [paymentInvoiceId, setPaymentInvoiceId] = useState("");

  const fetchInvoice = useCallback(() => {
    makeGet(dispatch, "/payment/payments/user", setPaymentInvoice);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchInvoice();
    return () => unsubscribe;
  }, []);
  const reverse = [...paymentInvoice].reverse();

  const openDetails = (id) => {
    setShowDetails(true);
    setPaymentInvoiceId(id);
  };
  const removeDetails = (e) => {
    if (e.target.id === "bg") setShowDetails(false);
  };

  return (
    <FadeIn>
      <div id="model_subscription">
        <h3>Subscription</h3>
        <div id="container" className="dashboard-cards">
          <header>Available Subscriptions</header>
          <table>
            <thead>
              <tr>
                <th># ID</th>
                <th>Subscription Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {reverse?.length === 0 && (
                <p style={{ textAlign: "center" }}>No subscription found!</p>
              )}
              {reverse.map((item, index) => {
                const createdAt = new Date(item.createdAt);
                const endDate = new Date(
                  createdAt.getFullYear() + 1,
                  createdAt.getMonth(),
                  createdAt.getDate()
                );
                return (
                  <tr key={index}>
                    <td>
                      #123 <span>model</span>
                    </td>
                    <td>{item?.desc}</td>
                    <td>NGN {item?.amount}</td>
                    <td>
                      {moment(item?.endDate ? item?.endDate : endDate).format(
                        "DD-MM-YYYY"
                      )}
                    </td>
                    <td className="active">Active</td>
                    <td>
                      <button onClick={() => openDetails(item?._id)}>
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>

        {showDetails && (
          <div id="bg" onClick={removeDetails}>
            <SubscriptionDetail paymentInvoiceId={paymentInvoiceId} />
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default ModelSubscription;
