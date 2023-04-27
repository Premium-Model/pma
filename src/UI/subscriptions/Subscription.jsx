import React from "react";
import SubscriptionTable from "../../ATOMIC/organisms/subscription/SubscriptionTable";
import '../../ATOMIC/organisms/subscription/sub.scss'

const Subscription = () => {
  return (
    <div className="subscription-container">
      <h2>SUBSCRIPTIONS</h2>
      <SubscriptionTable />
    </div>
  );
};

export default Subscription;
