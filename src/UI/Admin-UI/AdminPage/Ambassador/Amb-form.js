import { useEffect, useState } from "react";
import "../Amb-form.css";
import { storage } from "../../../../firebase"; // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AbsForm = ({
  addAmbassador,
  message,
  toggleAlert,
  setToggleAlert,
  isSuccess,
  setIsSuccess,
}) => {
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

  const [uploading, setUploading] = useState(false);

  // Handle input change
  const handleAbsData = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      handleFileUpload(files[0]); // Upload image to Firebase
    } else if (type === "checkbox") {
      setCheck((prev) => ({ ...prev, [name]: checked }));
    } else {
      setAbsData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload image to Firebase
  const handleFileUpload = (file) => {
    setUploading(true);
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name.replace(/\s/g, "_")}`;
    const storageRef = ref(storage, `ambassadors/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setAbsData((prev) => ({ ...prev, picture: downloadURL }));
        setUploading(false);
      }
    );
  };

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
      className="Abs-form"
    >
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
            <input
              type="file"
              id="photo"
              name="picture"
              onChange={handleAbsData}
              hidden
              required
            />
            {absData.picture ? (
              <img
                className="Abs-photo-img"
                src={absData.picture}
                alt="Uploaded"
              />
            ) : (
              <div className="photo-btn-wrapper">
                <div className="photo-btn">+</div>
              </div>
            )}
            {uploading && <p>Uploading...</p>}
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
          <p className="terms-text">
            I accept all terms of use and terms of service.
          </p>
        </label>
        {/* Submit Button */}
        <button className="register-btn" disabled={uploading}>
          {uploading ? "Uploading..." : "Register"}
        </button>
      </section>

      {/* modal section.... // // displaying the response from the server */}
      <section
        className="modal-container"
        style={{ transform: toggleAlert && `translateX(${0}%)` }}
      >
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
            className="modal-btn"
          >
            Got it!
          </div>
        </div>
      </section>
    </form>
  );
};

export default AbsForm;
