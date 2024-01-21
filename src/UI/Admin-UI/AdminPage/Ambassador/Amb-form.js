import { useEffect, useState } from "react";
import "./Amb-form.css";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../../firebase/index";

const AbsForm = ({
  addAmbassador,
  message,
  toggleAlert,
  setToggleAlert,
  isSuccess,
  setIsSuccess,
}) => {
  const [picture, setPicture] = useState(undefined);

  const [absData, setAbsData] = useState({
    picture: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    location: "",
    start: "",
    end: "",
  });

  const [check, setCheck] = useState({
    getEmail: true,
    acceptTerms: true,
  });

  //handle input onchange
  const handleAbsData = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setCheck((prev) => ({ ...prev, [name]: checked }));
    } else {
      setAbsData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //handle file input onchange
  const handlePicture = (e) => {
    let file = e.target.files[0];
    setPicture(file);
  };

  // upload images
  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/models/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAbsData((prev) => ({ ...prev, [urlType]: downloadURL }));
        });
      }
    );
  };

  // upload images
  useEffect(() => {
    picture && uploadFile(picture, "picture");
    setPicture(undefined);
  }, [picture]);

  //setting absData state
  useEffect(() => {
    isSuccess === "Yes" &&
      setAbsData({
        picture: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        location: "",
        start: "",
        end: "",
      });
  }, [isSuccess]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        check.getEmail && check.acceptTerms
          ? addAmbassador(absData)
          : console.log("check box not checked");
      }}
      className="Abs-form">
      {/* title section */}

      <section className="title-section">
        <div>
          <h2 className="Abs-form-title">Add Ambassador</h2>
          <p>Create a referral code for an Ambassador</p>
        </div>
      </section>

      <div className="form-sect-wrapper">
        {/* top section */}

        <section className="top-sect-wrapper">
          <label className="Abs-photo-label" htmlFor="photo">
            <input type="file" id="photo" name="picture" onChange={handlePicture} hidden required />

            {absData.picture && <img className="Abs-photo-img" src={absData.picture} alt="" />}

            <div className="photo-btn-wrapper">
              <div className="photo-btn">+</div>
            </div>
          </label>
          <div className="Abs--details">
            <label className="Abs-label" htmlFor="firstName">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={absData.firstName}
                onChange={handleAbsData}
                placeholder="First Name..."
                spellCheck={false}
                autoComplete="off"
                required
              />
            </label>

            <label className="Abs-label" htmlFor="lastName">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={absData.lastName}
                onChange={handleAbsData}
                placeholder="Last Name..."
                spellCheck={false}
                autoComplete="off"
                required
              />
            </label>

            <label className="Abs-label" htmlFor="email">
              <input
                type="email"
                id="email"
                name="email"
                value={absData.email}
                onChange={handleAbsData}
                placeholder="Email Address..."
                spellCheck={false}
                autoComplete="off"
                required
              />
            </label>
          </div>
        </section>

        {/* down section  */}

        <section className="down-sect-wrapper">
          <label className="Abs-label" htmlFor="tel">
            <input
              type="tel"
              id="tel"
              name="phoneNo"
              value={absData.phoneNo}
              onChange={handleAbsData}
              placeholder="Mobile Number..."
              spellCheck={false}
              autoComplete="off"
              required
            />
          </label>
          <label className="Abs-label" htmlFor="location">
            <input
              type="text"
              id="location"
              name="location"
              value={absData.location}
              onChange={handleAbsData}
              placeholder="Enter location..."
              spellCheck={false}
              autoComplete="off"
              required
            />
          </label>
          <div className="date-wrapper">
            <label className="Abs-label" htmlFor="start-date">
              <input
                type="date"
                id="start-date"
                name="start"
                value={absData.start}
                onChange={handleAbsData}
                placeholder="Starts..."
                spellCheck={false}
                autoComplete="off"
                required
              />
            </label>

            <label className="Abs-label" htmlFor="end-date">
              <input
                type="date"
                id="end-date"
                name="end"
                value={absData.end}
                onChange={handleAbsData}
                placeholder="Ends..."
                spellCheck={false}
                autoComplete="off"
                required
              />
            </label>
          </div>
        </section>
      </div>

      {/* bottom  section */}
      <section className="bottom-sect-wrapper">
        <label className="terms-label" htmlFor="referral">
          <input
            className="terms-input"
            id="referral"
            type="checkbox"
            name="getEmail"
            checked={check.getEmail}
            onChange={handleAbsData}
            required
          />
          <p className="terms-text">Get an email with your referral code.</p>
        </label>
        <label className="terms-label" htmlFor="terms">
          <div>
            <input
              className="terms-input"
              id="terms"
              type="checkbox"
              name="acceptTerms"
              checked={check.acceptTerms}
              onChange={handleAbsData}
              required
            />
          </div>
          <p className="terms-text">I accept all terms of use and terms of service.</p>
        </label>
        <button className="register-btn">Register</button>
      </section>

      {/* modal section.... // // displaying the response from the server */}
      <section
        className="modal-container"
        style={{ transform: toggleAlert && `translateX(${0}%)` }}>
        <div className="modal-box">
          {isSuccess === "Yes" ? (
            <i className="fa-solid fa-circle-check fa-2x success-icon"></i>
          ) : isSuccess === "No" ? (
            <i className="fa-solid fa-circle-xmark fa-2x error-icon"></i>
          ) : null}

          <p className="modal-text">{message}</p>
          <div
            onClick={() => {
              setToggleAlert(false);
              setIsSuccess("");
            }}
            className="modal-btn">
            Got it!
          </div>
        </div>
      </section>
    </form>
  );
};
export default AbsForm;
