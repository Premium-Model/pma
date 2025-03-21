import "./Models-Acct.css";
import ModelPage from "../Models-Acct/Model-Page/model_page";
import ModelsForms from "./Kyc-Section/Models-Kyc-Forms";
import KycNotice from "../../Notification/kyc-notice";
import { useEffect, useState } from "react";
import "../../../scss/dashboards.scss";

function ModelsAcct({ showNavbar, darkmode, HandleTheme, setShowNavbar, user, setNotice, notice }) {

  return (
    <>
      {!user?.isUpdated && <KycNotice />}

      {!user?.isUpdated ? (
        <ModelsForms showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      ) : (
        <ModelPage
          showNavbar={showNavbar}
          darkmode={darkmode}
          HandleTheme={HandleTheme}
          setShowNavbar={setShowNavbar}
          setNotice={setNotice}
          notice={notice}
        />
      )}

      {/*---> this is used for testing  */}

      {/* <ModelPage
        showNavbar={showNavbar}
        setShowNavbar={setShowNavbar}
        setNotice={setNotice}
        notice={notice}
      /> */}
    </>
  );
}

export default ModelsAcct;
