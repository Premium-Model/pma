import "../../../../scss/kyc-forms.scss";
import "../Settings/Btn.scss";
import { useOutletContext } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../../firebase";
import { AlertModal } from "../../../../Pages/LoginSignup/Sign-Up/signUpForm/Modal";
import { makeEdit, makeGet, update } from "../../../../redux/apiCalls";
import "./Profile.css";
import EditBtn from "./Edit-btn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router";

import { categoryInput, jobsInput, SocialMedia, statsInput } from "../utils";
import { Country, State } from "country-state-city";
import KycHeader from "../Kyc-Section/Component/kyc-header/kyc-header";
import { BiCloudUpload } from "react-icons/bi";
import {
  FaTimes,
  FaCheckCircle,
  FaStar,
  FaInbox,
  FaAngleDoubleRight,
  FaTruckLoading,
} from "react-icons/fa";
import { VscDiscard } from "react-icons/vsc";
import { Save } from "@mui/icons-material";
function Stats({}) {
  const user = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    darkmode,
    HandleTheme,
    handleActiveEdit,
    model,
    activeEdit,
    resetDiscard,
    handleActiveSet,
  } = useOutletContext(); // Access props
  const [inputs, setInputs] = useState({});
  const path = location.pathname.split("/")[2];
  const imageRef = useRef();
  const [progress, setProgress] = useState(0);
  const [picture, setPicture] = useState(undefined);
  const [message, setMessage] = useState("");
  const [modalTxt, setModalTxt] = useState("");
  const [modal, setModal] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [ActiveSettings, setActiveSettings] = useState(true);

  const [category, setCategory] = useState(user?.model?.category);
  const [interestedJob, setInterestedJob] = useState(
    user?.model?.interestedJob
  );

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    },
    [setInputs]
  );

  const handleCheckboxChange = useCallback(
    (type) => {
      type = "category";
      setInputs((prev) => {
        return { ...prev, [type]: category };
      });
    },
    [category]
  );

  const handleCheckboxChange2 = useCallback(
    (type) => {
      type = "interestedJob";
      setInputs((prev) => {
        return { ...prev, [type]: interestedJob };
      });
    },
    [interestedJob]
  );

  useEffect(() => {
    if (category && category.length <= 2) {
      handleCheckboxChange(category, "category");
    }
    if (interestedJob) {
      handleCheckboxChange2(interestedJob, "interestedJob");
    }
  }, [category, interestedJob]);

  //handle save
  const handleSave = () => {
    update(dispatch, "/model/", { ...inputs }, setMessage, setModalTxt);
  };

  // Function to handle focus and blur on form inputs
  const FocusBlur = () => {
    const focusInputs = document.querySelectorAll(".input-textarea");

    focusInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentNode.classList.add("focus", "not-empty");
      });

      input.addEventListener("blur", () => {
        if (input.value === "") {
          input.parentNode.classList.remove("not-empty", "focus");
        }
      });
    });
  };

  useEffect(() => {
    FocusBlur();
  });

  console.log(inputs);
  console.log(user);

  return (
    <>
      <section
        className={
          !darkmode
            ? "Forms KycForms light-theme  "
            : "Forms KycForms light-theme dark-theme"
        }
      >
        <header></header>
        <main>
          <section className="signupform-contact">
            <div className="signupform-container">
              <div className="form-left">
                <div className="form-left-wrapper">
                  <div className="form-left-heading">
                    <h3>
                      <div className="logo-user-wrapper">
                        <span className="logo-user01">
                          {user?.firstName ? user?.firstName : "models"}{" "}
                        </span>
                        <span className="logo-user02">
                          {" "}
                          {user?.lastName ? user?.lastName : "Premium"}
                        </span>
                      </div>
                    </h3>
                    <h1>
                      Editing Your Model
                      <br></br> Stats
                      <span className="dots-hide-on-mobile">.</span>
                    </h1>

                    <p className="form-text">
                      Customize your <a>profile</a> stats
                    </p>
                  </div>

                  <form
                    className="form-left-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <AlertModal modalTxt={modalTxt} setModalTxt={setModalTxt} />
                    <ToastContainer position="top-center" />
                    <>
                      <div className="form-titles-wrapper">
                        <h2 className="form-titles">Model Stats </h2>
                        <EditBtn
                          btnText={
                            activeEdit === "model-statistic" ? "Done" : "Edit"
                          }
                          section="model-statistic"
                          handleActiveEdit={handleActiveEdit}
                        />
                        {activeEdit === "model-statistic" && (
                          <p className="form-descriptions">
                            <FaAngleDoubleRight />
                            Setting your measurements allows your profile to be
                            found in search results.
                          </p>
                        )}

                        {activeEdit === "model-statistic" && (
                          <p className="form-descriptions">
                            <FaAngleDoubleRight />
                            Do your best to be as accurate as possible.
                          </p>
                        )}
                      </div>

                      <div className="form-stats-column">
                        <div className="form-container">
                          <div className="form-wrapper">
                            <span className="stats-item-text">height: </span>
                            <input
                              defaultValue={user?.model?.height}
                              autoFocus={activeEdit === "model-statistic"}
                              readOnly={activeEdit !== "model-statistic"}
                              name="height"
                              onChange={handleChange}
                              className="input-textarea"
                            />
                          </div>
                        </div>
                        <div className="form-container">
                          <div className="form-wrapper">
                            <span className="stats-item-text">waist: </span>
                            <input
                              defaultValue={user?.model?.waist}
                              readOnly={activeEdit !== "model-statistic"}
                              name="waist"
                              onChange={handleChange}
                              className="input-textarea"
                            />
                          </div>
                        </div>

                        {user?.model?.gender.toLowerCase() !== "m" && (
                          <>
                            <div className="form-container">
                              <div className="form-wrapper">
                                <span className="stats-item-text">hip: </span>
                                <input
                                  defaultValue={user?.model?.hip}
                                  readOnly={activeEdit !== "model-statistic"}
                                  name="hip"
                                  onChange={handleChange}
                                  className="input-textarea"
                                />
                              </div>
                            </div>
                          </>
                        )}
                        {user?.model?.gender.toLowerCase() === "m" && (
                          <>
                            <div className="form-container">
                              <div className="form-wrapper">
                                <span className="stats-item-text">chest: </span>
                                <input
                                  defaultValue={user?.model?.chest}
                                  readOnly={activeEdit !== "model-statistic"}
                                  name="chest"
                                  onChange={handleChange}
                                  className="input-textarea"
                                />
                              </div>
                            </div>
                            <div className="form-container">
                              <div className="form-wrapper">
                                <span className="stats-item-text">
                                  shoulder:{" "}
                                </span>
                                <input
                                  defaultValue={user?.model?.shoulder}
                                  readOnly={activeEdit !== "model-statistic"}
                                  name="shoulder"
                                  onChange={handleChange}
                                  className="input-textarea"
                                />
                              </div>
                            </div>
                          </>
                        )}
                        <div className="form-container">
                          <div className="form-wrapper">
                            <span className="stats-item-text">size: </span>
                            <input
                              defaultValue={user?.model?.size}
                              readOnly={activeEdit !== "model-statistic"}
                              name="size"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-container">
                          <div className="form-wrapper">
                            <span className="stats-item-text">shoe: </span>
                            <input
                              defaultValue={user?.model?.shoe}
                              readOnly={activeEdit !== "model-statistic"}
                              name="shoe"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-container">
                          <div className="form-wrapper">
                            <span className="stats-item-text">eyes: </span>
                            <input
                              defaultValue={user?.model?.eyes}
                              readOnly={activeEdit !== "model-statistic"}
                              name="eyes"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-container">
                          <div className="form-wrapper">
                            <span className="stats-item-text">Skincolor: </span>
                            <input
                              defaultValue={user?.model?.skinColor}
                              readOnly={activeEdit !== "model-statistic"}
                              name="skinColor"
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="stats-item">
                          <span className="stats-item-text">Haircolor: </span>
                          <input
                            defaultValue={user?.model?.hairColor}
                            readOnly={activeEdit !== "model-statistic"}
                            name="hairColor"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="stats-item">
                          <span className="stats-item-text">hairLength: </span>
                          <input
                            defaultValue={user?.model?.hairLength}
                            readOnly={activeEdit !== "model-statistic"}
                            name="hairLength"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="stats-item">
                          <span className="stats-item-text">tattoos: </span>
                          <select
                            disabled={activeEdit !== "model-statistic"}
                            name="tattoos"
                            onChange={handleChange}
                          >
                            <option value={user?.model?.tattoos}>
                              {user?.model?.tattoos ? "Yes" : "No"}
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div className="stats-item">
                          <span className="stats-item-text">ethnicity: </span>
                          <input
                            defaultValue={user?.model?.ethnicity}
                            readOnly={activeEdit !== "model-statistic"}
                            name="ethnicity"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="stats-item">
                          <span className="stats-item-text">language: </span>
                          <input
                            defaultValue={user?.model?.language}
                            readOnly={activeEdit !== "model-statistic"}
                            name="language"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="stats-item">
                          <span className="stats-item-text">agency: </span>
                          <input
                            defaultValue={user?.model?.agency}
                            readOnly={activeEdit !== "model-statistic"}
                            name="agency"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="stats-item" style={{ width: "48%" }}>
                          <span className="stats-item-text">
                            available For Travel:{" "}
                          </span>
                          <select
                            disabled={activeEdit !== "model-statistic"}
                            name="availableForTravel"
                            onChange={handleChange}
                          >
                            <option value={user?.model?.availableForTravel}>
                              {user?.model?.availableForTravel ? "Yes" : "No"}
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div className="stats-item" style={{ width: "48%" }}>
                          <span className="stats-item-text">
                            Mininum booking price:{" "}
                          </span>
                          <input
                            defaultValue={`#${user?.model?.minPrice}`}
                            readOnly={activeEdit !== "model-statistic"}
                            name="minPrice"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* category section*/}
                      <div className="set_sections-title-rapper">
                        <h2 className="set_sections-title">
                          Models categories
                        </h2>
                        <EditBtn
                          btnText={
                            activeEdit === "model-categories" ? "Done" : "Edit"
                          }
                          section="model-categories"
                          handleActiveEdit={handleActiveEdit}
                        />
                        {activeEdit === "model-categories" && (
                          <p className="category-text-2">
                            choose which type of model you suited (2max)
                          </p>
                        )}
                      </div>
                      {activeEdit === "model-categories" && (
                        <p className="category-text-1">
                          choose which type of model you suited (2max)
                        </p>
                      )}

                      {/* category read only section */}
                      {activeEdit !== "model-categories" && (
                        <ul className="set_category-list">
                          {user?.model?.category.map((item) => (
                            <li key={item} className="category-item">
                              {item} Model
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* category edit section */}
                      {activeEdit === "model-categories" && (
                        <ul className="set_model-categories">
                          {categoryInput.map((item) => {
                            return (
                              <li
                                className="setting_input-container"
                                key={item.id}
                              >
                                <label
                                  className="setting_check-box-label colored-hover"
                                  htmlFor={item.id}
                                >
                                  {item.label}
                                  <input
                                    onChange={(e) => {
                                      if (
                                        e.target.checked &&
                                        category.length >= 3
                                      ) {
                                        return; // prevent checkbox from being checked
                                      }
                                      setCategory((prev) =>
                                        e.target.checked === false
                                          ? prev.filter(
                                              (item) => item !== e.target.value
                                            )
                                          : [...prev, e.target.value]
                                      );
                                    }}
                                    className="setting_check-box"
                                    type={item.type}
                                    id={item.id}
                                    name="category"
                                    value={item.value}
                                    checked={
                                      category.find(
                                        (value) => value === item.value
                                      )
                                        ? true
                                        : false
                                    }
                                  />
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {/* work interest section */}
                      <div className="set_sections-title-rapper">
                        <h2 className="set_sections-title">
                          Jobs interested in
                        </h2>
                        <EditBtn
                          btnText={
                            activeEdit === "job-interest" ? "Done" : "Edit"
                          }
                          section="job-interest"
                          handleActiveEdit={handleActiveEdit}
                        />
                      </div>
                      {/* work-interest read only section */}
                      {activeEdit !== "job-interest" && (
                        <ul className="set_job-list">
                          {user?.model?.interestedJob?.map((item) => (
                            <li key={item} className="job-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* work-interest edit section */}
                      {activeEdit === "job-interest" && (
                        <ul className="set_job-interest">
                          {jobsInput.map((item) => {
                            return (
                              <li
                                className="setting_input-container"
                                key={item.id}
                              >
                                <label
                                  className="setting_check-box-label colored-hover"
                                  htmlFor={item.id}
                                >
                                  {item.label}
                                  <input
                                    onChange={(e) =>
                                      setInterestedJob((prev) =>
                                        e.target.checked === false
                                          ? prev.filter(
                                              (item) => item !== e.target.value
                                            )
                                          : [...prev, e.target.value]
                                      )
                                    }
                                    className="setting_check-box"
                                    type={item.type}
                                    id={item.id}
                                    name="job-interest"
                                    value={item.value}
                                    checked={
                                      interestedJob.find(
                                        (value) => value === item.value
                                      )
                                        ? true
                                        : false
                                    }
                                  />
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {/* social media section */}
                      <div className="set_sections-title-rapper">
                        <h2 className="set_sections-title">Instagram Handle</h2>
                        <EditBtn
                          btnText={
                            activeEdit === "social-media" ? "Done" : "Edit"
                          }
                          section="social-media"
                          handleActiveEdit={handleActiveEdit}
                        />
                      </div>
                      {/* social-media  read only section */}
                      {activeEdit !== "social-media" && (
                        <ul className="set_social-list">
                          <li className="social-item">
                            {user?.model?.instagram}
                          </li>
                        </ul>
                      )}
                      {/* social-media  edit section */}
                      {activeEdit === "social-media" && (
                        <ul className="set_social-media-link">
                          {SocialMedia.map((item) => {
                            return (
                              <li
                                className="setting_input-container"
                                key={item.id}
                              >
                                <label
                                  className="setting_input-label"
                                  htmlFor={item.id}
                                >
                                  {item.label}
                                  <input
                                    onChange={handleChange}
                                    className="setting_input-field"
                                    type={item.type}
                                    id={item.id}
                                    name={item.id}
                                    placeholder={item.placeholder}
                                    spellCheck={false}
                                    required
                                  />
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      <div className="form-titles-wrapper">
                        <h2 className="form-titles">Model Bio</h2>
                        <EditBtn
                          btnText={activeEdit === "model-bio" ? "Done" : "Edit"}
                          section="model-bio"
                          handleActiveEdit={handleActiveEdit}
                        />
                        {activeEdit === "model-bio" && (
                          <>
                            <p className="form-descriptions">
                              <FaAngleDoubleRight />
                              <span>
                                {" "}
                                Share a little about your self, including years
                                of modeling experience, previous clients, etc.
                              </span>
                            </p>
                            <p className="form-descriptions">
                              <FaAngleDoubleRight />
                              <span>
                                {" "}
                                Don't be afraid to express your personality so
                                you can stand out from the crowd.
                              </span>
                            </p>
                          </>
                        )}
                      </div>

                      {activeEdit === "model-bio" && (
                        <div className="form-container" id="bio">
                          <div className="form-wrapper">
                            <textarea
                              name="bio"
                              onChange={handleChange}
                              id="bio"
                              cols="30"
                              rows="10"
                              className="input-textarea"
                              required
                            ></textarea>
                            <label>Write your bio here...</label>
                            <FaInbox />
                          </div>
                        </div>
                      )}

                      {activeEdit !== "model-bio" && (
                        <div className="form-container" id="bio">
                          <div className="form-wrapper read-only-wrapper">
                            <textarea
                              cols="30"
                              rows="10"
                              readOnly
                              className="input-textarea read-only-textarea"
                              required
                            ></textarea>

                            <div
                              style={{
                                position: "absolute",
                                top: "23px",
                                left: "20px",
                                color: "var(--text-color)",
                              }}
                            >
                              {user?.role === "agency" ? (
                                <div className="read-only-infobox">
                                  {model?.model?.bio && updated === true
                                    ? model?.model?.bio
                                    : !inputs.bio
                                    ? model?.model?.bio
                                    : inputs?.bio}
                                </div>
                              ) : (
                                <div className="read-only-infobox">
                                  {user?.model?.bio && updated === true
                                    ? user?.model?.bio
                                    : !inputs.bio
                                    ? user?.model?.bio
                                    : inputs?.bio}
                                </div>
                              )}
                            </div>

                            <FaInbox />
                          </div>
                        </div>
                      )}

                      <div className="kyc-btn-container">
                        {/* btn section  */}

                        {/*  <button
                          onClick={() => resetDiscard(() => handleSave)}
                          className=" editable-btn discard-edit-btn btn_shadow"
                        >
                          <div className="edit-loader-wrapper">
                            <VscDiscard className="edit-icon" />
                            <span>Discard All Changes</span>
                          </div>
                        </button> */}
                        <button
                          style={{
                            backgroundColor: activeEdit !== "Done" && "#bbbb",
                          }}
                          disabled={activeEdit !== "Done" && true}
                          onClick={handleSave}
                          className=" editable-btn save-edit-btn btn_shadow "
                        >
                          {isFetching ? (
                            <div className="edit-loader-wrapper">
                              <div class="edit-loader"></div>
                              <span>Saving...</span>
                            </div>
                          ) : (
                            <div className="edit-loader-wrapper">
                              <Save
                                className="edit-icon"
                                id={activeEdit !== "Done" && "disabled-texts"}
                              />
                              <span
                                id={activeEdit !== "Done" && "disabled-texts"}
                              >
                                Save All Changes
                              </span>
                            </div>
                          )}
                        </button>
                      </div>
                      <p className="error-text">{message}</p>
                    </>
                  </form>
                </div>
              </div>

              <div className="form-right">
                <div className="form-img-wrapper">
                  {picture ? (
                    <img
                      src={URL.createObjectURL(picture)}
                      className="form-img"
                    />
                  ) : user?.picture ? (
                    <img src={user?.picture} className="form-img" />
                  ) : (
                    <img
                      src={"/images/sign-up/model2.jpg"}
                      className="form-img"
                    />
                  )}

                  <div className="wave-wrap">
                    <svg
                      className="wave"
                      viewBox="0 0 783 1536"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="wave"
                        d="M236.705 1356.18C200.542 1483.72 64.5004 1528.54 1 1535V1H770.538C793.858 63.1213 797.23 196.197 624.165 231.531C407.833 275.698 274.374 331.715 450.884 568.709C627.393 805.704 510.079 815.399 347.561 939.282C185.043 1063.17 281.908 1196.74 236.705 1356.18Z"
                      />
                    </svg>
                  </div>
                  <svg
                    viewBox="0 0 345 877"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="dashed-wave"
                  >
                    <path
                      id="dashed-wave"
                      d="M0.5 876C25.6667 836.167 73.2 739.8 62 673C48 589.5 35.5 499.5 125.5 462C215.5 424.5 150 365 87 333.5C24 302 44 237.5 125.5 213.5C207 189.5 307 138.5 246 87C185 35.5 297 1 344.5 1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}

export default Stats;
