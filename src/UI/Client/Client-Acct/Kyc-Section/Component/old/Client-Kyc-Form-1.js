import "./Client-Kyc-Form-1.css";
import FormNavBtn from "./Form-nav-btn";
import { useContext, useEffect, useState } from "react";
import { Input1, Input2, Input3 } from "./kyc-input";
import { Industry, SocialMedia } from "../utils";
import { FormContext } from "./Client-Kyc-Forms";
function ClientsKycForm1({}) {
  const { handleNavigation, handleChange, inputs, setInputs } =
    useContext(FormContext);

  //State Error
  const [error, setError] = useState({
    brandName: inputs.brandName,
    brandUrl: inputs.brandUrl,
    address: inputs.address,
    state: inputs.state,
    country: inputs.country,
    bio: inputs.bio,
    instagram: inputs.instagram,
    industry: inputs.industry,
  });

  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);

  //setting error messages
  useEffect(() => {
    function handleError() {
      let errorText = "This detail is required.!";
      let bioErr = "The Bio section is required.!";
      let industryErr = "Please choose an industry.!";
      let socialErr = "You social-media link is required.!";

      !inputs.brandName
        ? setError((prev) => ({ ...prev, brandName: errorText }))
        : setError((prev) => ({ ...prev, brandName: "" }));

      !inputs.brandUrl
        ? setError((prev) => ({ ...prev, brandUrl: errorText }))
        : setError((prev) => ({ ...prev, brandUrl: "" }));

      !inputs.address
        ? setError((prev) => ({ ...prev, address: errorText }))
        : setError((prev) => ({ ...prev, address: "" }));

      !inputs.state
        ? setError((prev) => ({ ...prev, state: errorText }))
        : setError((prev) => ({ ...prev, state: "" }));

      !inputs.country
        ? setError((prev) => ({ ...prev, country: errorText }))
        : setError((prev) => ({ ...prev, country: "" }));

      !inputs.bio
        ? setError((prev) => ({ ...prev, bio: bioErr }))
        : setError((prev) => ({ ...prev, bio: "" }));

      !inputs.industry
        ? setError((prev) => ({ ...prev, industry: industryErr }))
        : setError((prev) => ({ ...prev, industry: "" }));

      !inputs.instagram
        ? setError((prev) => ({ ...prev, instagram: socialErr }))
        : setError((prev) => ({ ...prev, instagram: "" }));
    }

    handleError();
  }, [inputs]);

  //checking for error message
  useEffect(() => {
    let err = false;
    if (
      !inputs.brandName ||
      !inputs.brandUrl ||
      !inputs.address ||
      !inputs.state ||
      !inputs.country ||
      !inputs.bio ||
      !inputs.instagram ||
      !inputs.industry
    ) {
      err = true;
    } else {
      err = false;
    }

    setIsError(err);
  }, [inputs]);

  //submit and go to the next page
  function handleSubmit(text) {
    if (isError) {
      setShowError(true);
    } else {
      handleNavigation(text);
    }
  }

  return (
    <form className="--kyc-form" onSubmit={(e) => e.preventDefault()}>
      <section className="--kyc-hero">
        <img src="/images/kyc/client-1.jpg" alt="" />
        <div className="--kyc-hero__text-rapper">
          <h2 className="--kyc-hero__title">Step-1</h2>
          <p className="--kyc-hero__text">Setting Up Your Portfolio.</p>
        </div>
      </section>

      {/* input/details section  */}

      <section className="--kyc-content-section">
        <div className="--list-container">
          <section className="--sections-container ">
            <h2 className="--sections-title">Profile Details</h2>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Let's get to know you better.!
            </p>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Fill out some basic info about your Brand.
            </p>

            <ul className="--info-section">
              {/* name input */}
              <Input1
                id="brandName"
                label="Brand Name"
                placeholder="Your Brand Name..."
                error={error.brandName}
                handleChange={handleChange}
                showError={showError}
              />

              {/* url input  */}
              <Input1
                id="brandUrl"
                label="Brand Url"
                placeholder="Brand Url..."
                error={error.brandUrl}
                handleChange={handleChange}
                showError={showError}
              />

              {/* address input */}
              <Input2
                id="address"
                label="Office Address"
                placeholder="Office Address..."
                error={error.address}
                handleChange={handleChange}
                showError={showError}
              />

              {/* country input */}
              <Input3
                id="country"
                label="Country"
                placeholder="Country..."
                error={error.country}
                handleChange={handleChange}
                showError={showError}
              />

              {/* state input */}
              <Input3
                id="state"
                label="State"
                placeholder="State..."
                error={error.state}
                handleChange={handleChange}
                showError={showError}
              />
            </ul>
          </section>

          {/* industry section */}

          <section className="--sections-container">
            <h2 className="--sections-title">Client's Industry</h2>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Pick an industry from the list of industries in the drop down.
            </p>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Please ensure that your chosen industry compliments your Brand.
            </p>
            <select
              className="--kyc-input-field"
              name="industry"
              onChange={handleChange}
            >
              <option value="">Choose an industry</option>
              {Industry.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            {showError && <p className="--error-text">{error.industry}</p>}
          </section>

          {/* bio section */}
          <section className="--sections-container">
            <h2 className="--sections-title">Client's Bio</h2>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Share a little about your Brand, including years of experience,
              achievements etc.
            </p>
            <p className="--note-text">
              <i className="fa-solid fa-angles-right --points"></i>
              Include a credible and verifiable information so you can stand out
              from the crowd.
            </p>
            <div className="--bio-rapper">
              <textarea
                className="--bio-text-area"
                onChange={handleChange}
                name="bio"
                id="bio"
                cols="30"
                rows="10"
                placeholder="Brief information about your Brand..."
                required
              ></textarea>
            </div>

            {showError && (
              <p className="--error-text --bio-error">{error.bio}</p>
            )}
          </section>

          {/* social media section */}
          <section className="--sections-container">
            <h2 className="--sections-title">Social Media Handles</h2>
            <ul className="--social-media-link">
              {SocialMedia.map((item, index) => {
                return (
                  <li className="--kyc-input-container" key={index}>
                    <label className="--kyc-input-label" htmlFor={item.id}>
                      <span className="--required-icon_rapper">
                        {item.label}
                        {error[item.id] === "" ? (
                          <i className="fa-solid fa-circle-check --valid-icon"></i>
                        ) : (
                          <i className="fa-solid fa-star --required-icon"></i>
                        )}
                      </span>
                      <input
                        onChange={handleChange}
                        className="--kyc-input-field"
                        type={item.type}
                        id={item.id}
                        name={item.id}
                        placeholder={item.placeholder}
                        required
                        spellCheck={false}
                      />
                      {showError && (
                        <p className="--error-text">{error[item.id]}</p>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="--kyc-btn-container">
            {/* <FormNavBtn
              btnText="Back"
              name="form1"
              handleClick={handleNavigation}
              type="button"
            /> */}
            <FormNavBtn
              btnText="Next"
              name="form1"
              handleClick={handleSubmit}
              type="button"
            />
          </section>
        </div>
      </section>
    </form>
  );
}

export default ClientsKycForm1;
