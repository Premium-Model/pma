import { useState } from "react";
import "./Amb-list.css";
import PayOut from "./withdraw";
import AmbItem from "./Amb-item";

import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../../firebase";

const Ambassador = ({ ambData, editPhoto }) => {
  const [toggleWithdrawal, setToggleWithdrawal] = useState(false);
  const [current, setCurrent] = useState({});
  const [newId, setNewId] = useState("");

  const formatMoney = (num = 0) => {
    return "#" + Number(num).toLocaleString("en-US");
    // return num.toLocaleString("en-Us", { style: "currency", currency: "NGN" });
  };

  // upload images
  const uploadFile = (file, id, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/models/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          editPhoto(id, { [urlType]: downloadURL });
        });
      }
    );
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
                id={amb._id}
                amb={amb}
                uploadFile={uploadFile}
                formatMoney={formatMoney}
                setToggleWithdrawal={setToggleWithdrawal}
                setCurrent={setCurrent}
                newId={newId}
                setNewId={setNewId}
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
