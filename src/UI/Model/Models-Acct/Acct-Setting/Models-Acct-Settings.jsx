import "./Models-Acct-Setting.css";
import { useCallback, useEffect, useState } from "react";
import About from "./About";
import EmailAndPassword from "./Email-and-password";
import PaymentInfo from "./Wallet-setting";
import Stats from "./Stats";
import Photos from "./Photos";
import Videos from "./Videos";
import { navList1, navList2 } from "../utils";
import { NavLink } from "react-router-dom";
import { makeGet, update } from "../../../../redux/apiCalls";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function ModelAcctSetting({
  AlertModal,
  handleModal,
  userData,
  showNavbar,
  setShowNavbar,
}) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [activeSet, setActiveSet] = useState("about");
  const [toggleSetMenu, setToggleSetMenu] = useState(false);
  const [activeEdit, setActiveEdit] = useState("");

  const [discardFunc, setDiscardFunc] = useState("");
  const [toggleDiscard, setToggleDiscard] = useState(false);
  const [model, setModel] = useState({});

  const fetchData = useCallback(() => {
    makeGet(dispatch, `/model/${path}`, setModel);
  }, [dispatch]);

  useEffect(() => {
    // if (user?.role === "agency") {
    let unsubscribed = false;
    if (!unsubscribed) {
      fetchData();
    }
    return () => {
      unsubscribed = true;
    };
    // }
  }, []);
  // console.log(model)

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

  function handleActiveSet(set) {
    setActiveSet(set);
    setToggleSetMenu((prevSet) => !prevSet);
  }

  function handleToggleSetMenu() {
    setToggleSetMenu((prevSet) => !prevSet);
  }

  function handleActiveEdit(section, text) {
    text === "Done" ||
    text === "Update" ||
    text === "Check" ||
    text === "Reset" ||
    text === "Verify"
      ? setActiveEdit(text)
      : setActiveEdit(section);
  }

  //discarding changes
  function handleDiscard(response) {
    response === "Yes" && discardFunc();
    setToggleDiscard((prev) => !prev);
  }

  //setting discard alert
  function resetDiscard(fun) {
    setToggleDiscard((prev) => !prev);
    setDiscardFunc(fun);
  }

  //displaying discard alert
  function discardAlert() {
    return (
      <section
        style={{ transform: toggleDiscard && `translateX(${0}%)` }}
        className="modal-section"
      >
        <div className="alert-box">
          <h2 className="alert-title">Do you want to disCard changes?</h2>

          <p className="alert-text">
            <span className="bold-text colored-text">Note: </span>
            by clicking yes all unsaved changes will be deleted and progress
            lost!
          </p>

          <div className="alert-btn">
            <button
              onClick={() => handleDiscard("No")}
              className="del-alert-btn bold-text cancel-btn"
            >
              No?
            </button>
            <button
              onClick={() => handleDiscard("Yes")}
              className="del-alert-btn bold-text yes-btn"
            >
              Yes?
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {!showNavbar && (
        <div className="set_sections">
          {discardAlert()}
          {AlertModal()}

          {/* nav section */}

          <section
            style={{ transform: toggleSetMenu && `translateX(${0}%)` }}
            className="Acct-set-menu"
          >
            <div className="set-nav_title">
              <h2>Setting</h2>
              <i className="fa-solid fa-gear"></i>
            </div>

            <nav className="set-nav">
              <i
                className="fa-solid fa-xmark close-set colored-hover"
                onClick={handleToggleSetMenu}
              ></i>
              <ul className="set-nav_list">
                {navList1.map((item) => {
                  return (
                    <li
                      key={item}
                      className="set-nav_item colored-hover"
                      onClick={() => handleActiveSet(item)}
                      role="button"
                    >
                      {item === "about" ? (
                        <i className="fa-solid fa-address-book"></i>
                      ) : item === "stats" ? (
                        <i className="fa-solid fa-chart-simple"></i>
                      ) : item === "photos" ? (
                        <i className="fa-solid fa-image"></i>
                      ) : (
                        <i className="fa-brands fa-youtube"></i>
                      )}
                      {item}
                    </li>
                  );
                })}
              </ul>
              <ul className="set-nav_list">
                {navList2.map((item) => {
                  return (
                    <NavLink
                      to={item === "dashboard" && "/modelPage/dashboard"}
                    >
                      <li
                        key={item}
                        className="set-nav_item colored-hover"
                        onClick={() => handleActiveSet(item)}
                        role="button"
                      >
                        {item === "email/pass" ? (
                          <i className="fa-solid fa-envelope-circle-check"></i>
                        ) : item === "payment" ? (
                          <i className="fa-solid fa-landmark"></i>
                        ) : (
                          <i className="fa-solid fa-house"></i>
                        )}
                        {item}
                      </li>
                    </NavLink>
                  );
                })}
              </ul>
            </nav>
          </section>

          {/* main section */}

          <section
            className="Acct-set-main"
            style={{ backgroundColor: "white" }}
          >
            {/* settings header */}
            <div className="set_mobile-nav">
              <h2>
                Acct-<span className="mobile-nav-text">Settings</span>
              </h2>
              <i
                className="fa-solid fa-gear colored-hover"
                onClick={handleToggleSetMenu}
              ></i>
            </div>

            {/* About section */}

            {activeSet === "about" && (
              <About
                handleActiveEdit={handleActiveEdit}
                activeEdit={activeEdit}
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
                model={model}
              />
            )}

            {/* stats section */}

            {activeSet === "stats" && (
              <Stats
                // DomItems={DomItems}
                handleActiveEdit={handleActiveEdit}
                activeEdit={activeEdit}
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
                model={model}
              />
            )}

            {/* photo section */}

            {activeSet === "photos" && (
              <Photos
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
                model={model}
              />
            )}

            {/* video section */}

            {activeSet === "videos" && (
              <Videos
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
              />
            )}

            {/* email and password section */}

            {activeSet === "email/pass" && (
              <EmailAndPassword
                handleActiveEdit={handleActiveEdit}
                activeEdit={activeEdit}
                userData={userData}
                handleModal={handleModal}
                resetDiscard={resetDiscard}
              />
            )}

            {/* payment info section */}

            {activeSet === "payment" && (
              <PaymentInfo userData={userData} model={model} />
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default ModelAcctSetting;
