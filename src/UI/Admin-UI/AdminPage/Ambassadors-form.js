import { useState } from "react";
import "./Ambassadors-form.css";

const AbsForm = () => {
  const [absData, setAbsData] = useState({
    id: "",
    img: "",
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    location: "",
    startDate: "",
    endDate: "",
    getEmail: true,
    acceptTerms: true,
  });

  const handleAbsData = (e) => {
    const { name, value, type, checked } = e.target;

    type === "checkbox"
      ? setAbsData((prev) => ({ ...prev, [name]: checked }))
      : setAbsData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="Abs-form">
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
          <label className="Abs-photo-label">
            <input
              type="file"
              id="photo"
              name="img"
              value={absData.img}
              onChange={handleAbsData}
              hidden
              required
            />

            <div className="photo-btn">+</div>
          </label>
          <div className="Abs--details">
            <label className="Abs-label" htmlFor="fName">
              <input
                type="text"
                id="fName"
                name="fName"
                value={absData.fName}
                onChange={handleAbsData}
                placeholder="First Name..."
                required
              />
            </label>

            <label className="Abs-label" htmlFor="lName">
              <input
                type="text"
                id="lName"
                name="lName"
                value={absData.lName}
                onChange={handleAbsData}
                placeholder="Last Name..."
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
              name="mobile"
              value={absData.mobile}
              onChange={handleAbsData}
              placeholder="Mobile Number..."
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
              required
            />
          </label>
          <div className="date-wrapper">
            <label className="Abs-label" htmlFor="start-date">
              <input
                type="date"
                id="start-date"
                name="startDate"
                value={absData.startDate}
                onChange={handleAbsData}
                placeholder="Starts..."
                required
              />
            </label>

            <label className="Abs-label" htmlFor="end-date">
              <input
                type="date"
                id="end-date"
                name="endDate"
                value={absData.endDate}
                onChange={handleAbsData}
                placeholder="Ends..."
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
            checked={absData.getEmail}
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
              checked={absData.acceptTerms}
              onChange={handleAbsData}
              required
            />
          </div>
          <p className="terms-text">I accept all terms of use and terms of service.</p>
        </label>
        <button className="register-btn" onClick={() => console.log(absData)}>
          Register
        </button>
      </section>
    </form>
  );
};
export default AbsForm;
