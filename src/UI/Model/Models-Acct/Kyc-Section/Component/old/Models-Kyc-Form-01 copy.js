import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import FormNavBtn from "../Form-nav-btn";
import { BiCloudUpload } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { info } from "../../utils";
import { storage } from "../../../../../firebase";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import forDark from "./img/logo.png";
import forLight from "./img/logo.png";
import axios from "axios";
import {
  FaSun,
  FaMoon,
  FaTimes,
  FaCheckCircle,
  FaStar,
  FaInbox,
  FaPlus,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "./KycForm.scss";
import "./svg/svg.scss";
import "./Models-Kyc-Form-1.css";
import "./FormImage.scss";
import KYCInput from "../FormInputs";

function ModelsKycForm1({
  handleNavigation,
  inputs,
  handleChange,
  setInputs,
  path,
  darkmode,
  FocusBlur,
  HandleTheme,
}) {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const imageRef = useRef();
  const [picture, setPicture] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState(false);
  // input progress
  const [progress, setProgress] = useState(0);
  const [uploadprogress, setUploadProgress] = useState(0);
  // get picutures (preview)

  const handleClick = () => {
    imageRef.current.click();
  };

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  // get access token for countries api
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await axios.get(
          "https://www.universal-tutorial.com/api/getaccesstoken",
          {
            headers: {
              Accept: "application/json",
              "api-token":
                "Ku2uq0eMGByhMQmQdP5tKH3bbR4dD3ZNXjRqllWOT-srDfzC-wXRnd7Kcym_A_9MpP4",
              "user-email": "tosinadebayo55@gmail.com",
            },
          }
        );
        setAuthToken(res.data);
      } catch (error) {
        // console.log(error?.response?.data);
      }
    };
    getAccessToken();
  }, []);

  // get list of countries
  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await axios.get(
          "https://www.universal-tutorial.com/api/countries/",
          {
            headers: {
              Authorization: `Bearer ${authToken.auth_token}`,
              Accept: "application/json",
            },
          }
        );
        setCountries(res.data);
      } catch (error) {
        // console.log(error?.response?.data);
      }
    };
    getCountries();
  }, [authToken]);

  // get list of states
  useEffect(() => {
    const getStates = async () => {
      try {
        const res = await axios.get(
          `https://www.universal-tutorial.com/api/states/${inputs?.country}`,
          {
            headers: {
              Authorization: `Bearer ${authToken.auth_token}`,
              Accept: "application/json",
            },
          }
        );
        setStates(res.data);
      } catch (error) {
        // console.log(error?.response?.data);
      }
    };
    getStates();
  }, [inputs.country]);

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/models/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "picture" && setProgress(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    picture && uploadFile(picture, "picture");
  }, [picture]);

  //input error state
  const [error, setError] = useState({
    username: inputs.username,
    gender: inputs.gender,
    state: inputs.state,
    country: inputs.country,
    bioErr: "",
    pictureErr: "",
  });

  // handle empty input
  useEffect(() => {
    function handleError() {
      let errorText = "This detail is required!";
      let bioText = "The bio section is required!";
      let pictureText = "Model picture is";

      !inputs.username
        ? setError((prev) => ({ ...prev, username: errorText }))
        : setError((prev) => ({ ...prev, userNameErr: null }));

      !inputs.gender
        ? setError((prev) => ({ ...prev, gender: errorText }))
        : setError((prev) => ({ ...prev, gender: null }));

      !inputs.country
        ? setError((prev) => ({ ...prev, country: errorText }))
        : setError((prev) => ({ ...prev, country: null }));

      !inputs.state
        ? setError((prev) => ({ ...prev, state: errorText }))
        : setError((prev) => ({ ...prev, state: null }));

      !inputs.bio
        ? setError((prev) => ({
            ...prev,
            bioErr: bioText,
          }))
        : setError((prev) => ({ ...prev, bioErr: null }));

      picture === undefined
        ? setError((prev) => ({ ...prev, pictureErr: pictureText }))
        : setError((prev) => ({ ...prev, pictureErr: null }));
    }

    handleError();
  }, [inputs, picture]);

  //checking for error message
  useEffect(() => {
    let err = false;
    if (
      picture === undefined ||
      !inputs.username ||
      !inputs.gender ||
      !inputs.state ||
      !inputs.country ||
      !inputs.bio
    ) {
      err = true;
    }

    !user.isUpdated && setIsError(err);
    path !== "/modelpage" && setIsError(err);
    setProgress(100);
  }, [error, inputs, picture, user]);

  //submit and go to the next page
  function handleSubmit(text) {
    if (isError) {
      setShowError(true);
    } else {
      FocusBlur();
      handleNavigation(text);
    }
  }
  console.log(inputs);

  return (
    <section
      className={
        darkmode
          ? "Forms KycForms light-theme  "
          : "Forms KycForms light-theme dark-theme"
      }
    >
      <header>
        <section className="signupforms">
          <div className="signupform-container">
            <ul>
              <li>
                <a href="/" className="form-logo">
                  <div className="form-images">
                    <img
                      src={forDark}
                      alt="premiummodelapp-logo"
                      title="premiummodelapp-logo"
                      className="logo-forDark"
                    />
                    <img
                      src={forLight}
                      alt="premiummodelapp-logo"
                      title="premiummodelapp-logo"
                      className="logo-forLight"
                    />
                  </div>
                  <h2>
                    <div className="logo-01">
                      <span className="logo-color-change">Premium</span>
                    </div>
                    <div className="logo-02">
                      <span className="logo-color">models</span>
                      <span className="logo-color ">.</span>
                    </div>
                  </h2>
                </a>
              </li>

              <li>
                <a href="/" className="formnav-link">
                  Home
                </a>
              </li>

              <li>
                <span
                  className="formnav-link theme-toggle "
                  onClick={HandleTheme}
                >
                  {!darkmode ? (
                    <FaSun className="sun-icon" />
                  ) : (
                    <FaMoon className="moon-icon" />
                  )}
                </span>
              </li>

              <li>
                <span className="formnav-link">
                  <FaTimes className="closeform-icon" />
                </span>
              </li>
            </ul>
          </div>
        </section>
      </header>

      <main>
        <section className="signupform-contact">
          <div className="signupform-container">
            <div className="form-left">
              <div className="form-left-wrapper">
                <div className="form-left-heading">
                  <h1 style={{ lineHeight: "4.5rem" }}>
                    Setting Up Your Model
                    <br></br> Portfolio
                    <span className="dots-hide-on-mobile">.</span>
                  </h1>

                  <p className="form-text">
                    fill in your information for <a>Step 1</a>
                  </p>
                </div>

                <form
                  className="form-left-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <>
                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Profile Details</h2>
                    </div>

                    <div className="form-stats-column">
                      {info.map((item) => {
                        let name = [item.id];
                        return (
                          <div
                            className="form-container"
                            key={item.id}
                            id={item.id}
                          >
                            {path !== "/modelpage" &&
                              item.id === "fullName" && (
                                <div className="form-wrapper" id={item.id}>
                                  <>
                                    <input
                                      onChange={handleChange}
                                      className="input-textarea"
                                      type={item.type}
                                      id={item.id}
                                      name={item.id}
                                      placeholder=""
                                      required
                                    />

                                    <label htmlFor={item.id}>
                                      {item.placeholder}
                                    </label>
                                  </>
                                </div>
                              )}

                            {item.id === "username" && (
                              <div className={`form-wrapper  `} id={item.id}>
                                <input
                                  className="input-textarea"
                                  onChange={handleChange}
                                  type={item.type}
                                  id="User Name"
                                  name={item.id}
                                  placeholder=""
                                  required
                                />

                                <label htmlFor={item.id}>{item.label}</label>
                              </div>
                            )}

                            {item.id === "country" && (
                              <div className={`form-wrapper `}>
                                <div className="select-box">
                                  <select
                                    className=""
                                    onChange={handleChange}
                                    name={item.id}
                                    id={item.id}
                                  >
                                    <option hidden> --Select Country--</option>
                                    {countries?.map((getCountry, index) => {
                                      const { country_name } = getCountry;
                                      return (
                                        <option
                                          value={country_name}
                                          key={index}
                                        >
                                          {country_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            )}

                            {item.id === "state" && (
                              <div className={`form-wrapper `}>
                                <div className="select-box">
                                  <select
                                    className=""
                                    id={item.id}
                                    onChange={handleChange}
                                    name={item.state}
                                  >
                                    <option hidden> --Select State--</option>
                                    {inputs?.country && (
                                      <>
                                        {states.map((state, index) => {
                                          return (
                                            <option
                                              value={
                                                state.state_name ===
                                                "Abuja Federal Capital Territor"
                                                  ? "Abuja"
                                                  : state.state_name
                                              }
                                              key={index}
                                            >
                                              {state.state_name ===
                                              "Abuja Federal Capital Territor"
                                                ? "Abuja"
                                                : state.state_name}
                                            </option>
                                          );
                                        })}
                                      </>
                                    )}
                                  </select>
                                </div>
                              </div>
                            )}

                            {item.id === "gender" && (
                              <div className="form-wrapper">
                                <div className="select-box">
                                  <select
                                    onChange={handleChange}
                                    id={item.id}
                                    name={item.id}
                                  >
                                    <option value="" hidden>
                                      Select your gender
                                    </option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            <div
                              className={
                                error[name] === null
                                  ? "form-error-controller error-mtop"
                                  : "form-error-controller"
                              }
                            >
                              <span className="form-error-btn">
                                {error[name] === null ? (
                                  <FaCheckCircle className="required-icon valid-icon " />
                                ) : (
                                  <FaStar
                                    hidden
                                    className="required-icon errors"
                                    style={{ visibility: "0" }}
                                  />
                                )}
                              </span>

                              {showError && (
                                <p className="error-text">
                                  {item.id === name ? error[name] : null}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Model Bio</h2>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Share a little about your self, including years of
                          modeling experience, previous clients, etc.
                        </span>
                      </p>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          {" "}
                          Don't be afraid to express your personality so you can
                          stand out from the crowd.
                        </span>
                      </p>
                    </div>
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
                        <label>wright out your Bio here...</label>
                        <FaInbox />
                      </div>

                      <div
                        className={
                          error.bioErr === null
                            ? "form-error-controller error-mtop"
                            : "form-error-controller"
                        }
                      >
                        <span className="form-error-btn">
                          {error.bioErr === null ? (
                            <FaCheckCircle className="required-icon valid-icon " />
                          ) : (
                            <FaStar
                              hidden
                              className="required-icon errors"
                              style={{ visibility: "0" }}
                            />
                          )}
                        </span>

                        {showError && (
                          <p className="error-text">{error.bioErr}</p>
                        )}
                      </div>
                    </div>
                    <div className="form-titles-wrapper">
                      <h2 className="form-titles">Model Picture </h2>
                      <p className="form-descriptions">
                        <FaAngleDoubleRight />
                        <span>
                          Include a well-lit headShort, generally framed between
                          the top of your head to just below your shoulders.
                        </span>
                      </p>
                    </div>
                    <div className="form-container" id="picture">
                      <div className="image-container color-codes">
                        <div
                          className={
                            model ? "pic-model open-model" : "pic-model"
                          }
                        >
                          <img src={tempImgSrc} />
                          <FaTimes onClick={() => setModel(false)} />
                        </div>
                        <input
                          type="file"
                          id="file"
                          accept="image/*"
                          ref={imageRef}
                          onChange={(e) => setPicture(e.target.files[0])}
                          hidden
                        />
                        {picture ? (
                          <div
                            className={"img-area active"}
                            data-img={
                              progress < 100
                                ? `uploading ${progress}%`
                                : "preview picture"
                            }
                            onClick={() => getImg(URL.createObjectURL(picture))}
                          >
                            {picture && (
                              <img src={URL.createObjectURL(picture)} alt="" />
                            )}
                          </div>
                        ) : (
                          <div
                            className={"img-area"}
                            data-img={
                              progress < 100
                                ? `uploading ${progress}%`
                                : "preview picture"
                            }
                            onClick={handleClick}
                          >
                            <BiCloudUpload />

                            <h3>Upload Image</h3>

                            {picture === undefined && !user.isUpdated && (
                              <p style={{ zIndex: 1, color: "var(--pink)" }}>
                                {error.pictureErr} <span>required! </span>
                              </p>
                            )}

                            {picture && (
                              <img src={URL.createObjectURL(picture)} alt="" />
                            )}
                          </div>
                        )}

                        {picture ? (
                          <span
                            onClick={handleClick}
                            className="select-image"
                            style={{ textAlign: "center" }}
                            disabled={progress > 0 && progress < 100}
                          >
                            {progress > 0 && progress < 100
                              ? ` uploading ${progress}%`
                              : "Change Picture"}
                          </span>
                        ) : (
                          <span
                            onClick={handleClick}
                            className="select-image"
                            style={{ textAlign: "center" }}
                          >
                            {"Upload Picture"}
                          </span>
                        )}
                      </div>

                      <div
                        className={
                          error.pictureErr === null
                            ? "form-error-controller error-mtop"
                            : "form-error-controller"
                        }
                      >
                        <span className="form-error-btn">
                          {error.pictureErr === null ? (
                            <FaCheckCircle className="required-icon valid-icon " />
                          ) : (
                            <FaStar
                              hidden
                              className="required-icon errors"
                              style={{ visibility: "0" }}
                            />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="kyc-btn-container">
                      <FormNavBtn
                        btnText="Next"
                        name="form1"
                        isError={isError}
                        handleClick={handleSubmit}
                        type="button"
                      />
                    </div>
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
  );
}

export default ModelsKycForm1;
