import { useState } from "react";
import "./Amb-list.css";
import PayOut from "./withdraw";

import AmbItem from "./Amb-item";

const Ambassador = ({ ambData }) => {
  const [toggleWithdrawal, setToggleWithdrawal] = useState(false);
  const [current, setCurrent] = useState({});

  const formatMoney = (num = 0) => {
    return "#" + Number(num).toLocaleString("en-US");
    // return num.toLocaleString("en-Us", { style: "currency", currency: "NGN" });
  };

  return (
    <section className="Ambassador-section">
      <h1 className="Abs-title">Ambassadors</h1>
      <ul className="Abs-list">
        {ambData.length !== 0 ? (
          ambData.map((amb) => {
            return (
              <AmbItem
                key={amb.code}
                amb={amb}
                formatMoney={formatMoney}
                setToggleWithdrawal={setToggleWithdrawal}
                setCurrent={setCurrent}
              />
            );
          })
        ) : (
          <div className="Abs-not-found">Ambassadors Not Found!</div>
        )}
      </ul>

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
