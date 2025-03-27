import { useState } from "react";
import "./Amb-list.css";
import PayOut from "./withdraw";
import AmbItem from "./Amb-item";

import { ambassadorsRequest } from "../../../../redux/requestMethod";
import Modal from "../../../../Components/Modal/Modal";

const Ambassador = ({ ambData }) => {
  const [toggleWithdrawal, setToggleWithdrawal] = useState(false);
  const [current, setCurrent] = useState({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [toggleAlert, setToggleAlert] = useState(false);
  const [deletedIds, setDeletedIds] = useState([]);

  const formatMoney = (num = 0) => {
    return "#" + Number(num).toLocaleString("en-US");
  };

  const deleteAmbassador = async (ambassador) => {
    try {
      if (!ambassador._id) {
        console.error("Ambassador ID is missing");
        return;
      }

      await ambassadorsRequest.delete(`/admin/amb-delete/${ambassador._id}`);
      setMessage("Ambassador deleted successfully!");
      setIsSuccess("Yes");
      setDeletedIds((prev) => [...prev, ambassador._id]);
    } catch (err) {
      console.error("Error deleting ambassador:", err);
      setMessage("Failed to delete ambassador!");
      setIsSuccess("No");
    } finally {
      setToggleAlert(true);
    }
  };

  return (
    <section className="Ambassador-section">
      <h1 className="Abs-title">Ambassadors</h1>
      <ul className="Abs-list">
        {ambData.length !== 0 ? (
          ambData
            .filter((amb) => !deletedIds.includes(amb._id))
            .map((amb) => (
              <AmbItem
                key={amb.code}
                amb={amb}
                setMessage={setMessage}
                setToggleAlert={setToggleAlert}
                formatMoney={formatMoney}
                deleteAmbassador={() => deleteAmbassador(amb)}
                setCurrent={setCurrent}
              />
            ))
        ) : (
          <div className="Abs-not-found">Ambassadors Not Found!</div>
        )}
      </ul>

      {/* Render the Modal */}
      {toggleAlert && (
        <Modal
          toggleAlert={toggleAlert}
          setToggleAlert={setToggleAlert}
          message={message}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      )}

      {/* withdrawal section */}
      <PayOut
        toggleWithdrawal={toggleWithdrawal}
        setToggleWithdrawal={setToggleWithdrawal}
        formatMoney={formatMoney}
        amb={current}
      />
    </section>
  );
};

export default Ambassador;
