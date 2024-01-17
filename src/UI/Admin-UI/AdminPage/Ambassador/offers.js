import { useState } from "react";
import AbsForm from "./Amb-form";
import { ambassadorsRequest } from "../../../../redux/requestMethod";

const Offers = () => {
  const [message, setMessage] = useState("");
  const [toggleAlert, setToggleAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");

  const addAmbassador = async (data) => {
    try {
      const res = await ambassadorsRequest.post("/admin/create-ambassador", data);
      setMessage(res.data);
      setIsSuccess("Yes");
      setToggleAlert(true);
    } catch (err) {
      setMessage(err?.response?.data);
      setIsSuccess("No");
      setToggleAlert(true);
    }
  };

  return (
    <AbsForm
      addAmbassador={addAmbassador}
      message={message}
      isSuccess={isSuccess}
      setIsSuccess={setIsSuccess}
      toggleAlert={toggleAlert}
      setToggleAlert={setToggleAlert}
    />
  );
};
export default Offers;
