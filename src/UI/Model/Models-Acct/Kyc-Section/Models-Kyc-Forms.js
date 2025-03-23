import { useCallback, useEffect, useState, createContext } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import ModelsKycForm01 from "./Models-Kyc-Forms/Models-Kyc-Form-01";
import ModelsKycForm02 from "./Models-Kyc-Forms/Models-Kyc-Form-02";
import ModelsKycForm03 from "./Models-Kyc-Forms/Models-Kyc-Form-03";
import "./Models-Kyc-Forms.css";
import "../../../../scss/kyc-forms.scss";
import axios from "axios";
import { Country, State } from "country-state-city";
export const FormContext = createContext();

function ModelsForms({ showNavbar, setShowNavbar }) {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const path = location.pathname;
  const [picture, setPicture] = useState(undefined);
  const [activeForm, setActiveForm] = useState(1);
  const [inputs, setInputs] = useState({});
  const [category, setCategory] = useState([]);
  const [interestedJob, setInterestedJob] = useState([]);
  const [darkmode, setDarkMode] = useState(false);

  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleChange = useCallback(
    (e) => {
      setInputs((prev) => {
        const newInputs = { ...prev, [e.target.name]: e.target.value };

        if (e.target.name === "country") {
          // Find the selected country's ISO code
          const selectedCountry = countries.find(
            (c) => c.name === e.target.value
          );
          if (selectedCountry) {
            setStates(State.getStatesOfCountry(selectedCountry.isoCode));
          } else {
            setStates([]); // Reset states if no country is found
          }
        }

        return newInputs;
      });
    },
    [setInputs, countries]
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
  }, [category, interestedJob, handleCheckboxChange, handleCheckboxChange2]);

  function handleNavigation(text) {
    if (text === "Next") {
      setActiveForm((prevForm) => prevForm + 1);
    } else if (text === "Back") {
      setActiveForm((prevForm) => prevForm - 1);
    } else {
      setTimeout(() => {
        setActiveForm(1);
      }, 1500);
    }
  }

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

  // function handles onfocus and onblur mode on form inputs
  const FocusBlur = () => {
    const focusinputs = document.querySelectorAll(".input-textarea");
    focusinputs.forEach((ipt) => {
      ipt.addEventListener("focus", () => {
        ipt.parentNode.classList.add("focus");
        ipt.parentNode.classList.add("not-empty");
      });

      ipt.addEventListener("blur", () => {
        if (ipt.value == "") {
          ipt.parentNode.classList.remove("not-empty");
          ipt.parentNode.classList.remove("focus");
        }
      });
    });
  };

  // handles form transitions on light and dark mode
  const TransitionHandler = () => {
    const allElement = document.querySelectorAll("*");
    allElement.forEach((el) => {
      el.classList.add("form-transition");
      setTimeout(() => {
        el.classList.remove("form-transition");
      }, 1000);
    });
  };
  //  function handles dark and light mode onclick on forms
  const HandleTheme = (event) => {
    // 👇️ toggle darkmode state on click
    setDarkMode((current) => !current);
    TransitionHandler();
  };

  useEffect(() => {
    FocusBlur();
  }, []);

  return (
    !showNavbar && (
      <FormContext.Provider
        value={{
          inputs,
          path,
          user,
          darkmode,
          picture,
          interestedJob,
          category,
          countries,
          states,
          handleNavigation,
          handleChange,
          HandleTheme,
          TransitionHandler,
          FocusBlur,
          setPicture,
          setInputs,
          setCategory,
          setInterestedJob,
        }}
      >
        <div className="kyc">
          {activeForm === 1 && <ModelsKycForm01 />}
          {activeForm === 2 && <ModelsKycForm02 />}
          {activeForm === 3 && <ModelsKycForm03 />}
        </div>
      </FormContext.Provider>
    )
  );
}

export default ModelsForms;
