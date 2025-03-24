import { useCallback, useEffect, useState, createContext } from "react";
import AgencyKycForm1 from "./Agency-Kyc-Forms/Agency-Kyc-Form-1";
import AgencyKycForm2 from "./Agency-Kyc-Forms/Agency-Kyc-Form-2";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Country, State } from "country-state-city";
import "./Agency-Kyc-Forms.css";
import "../../../../scss/kyc-forms.scss";
import "react-toastify/dist/ReactToastify.css";

export const FormContext = createContext();
function AgencyForms({ showNavbar, setShowNavbar }) {
  const [activeForm, setActiveForm] = useState(1);
  const [darkmode, setDarkMode] = useState(false);
  const [picture, setPicture] = useState(undefined);
  const [inputs, setInputs] = useState({});

  const [authToken, setAuthToken] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
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

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

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
          handleNavigation,
          handleChange,
          setInputs,
          setDarkMode,
          TransitionHandler,
          FocusBlur,
          HandleTheme,
          handleNavigation,
          setPicture,
          picture,
          inputs,
          darkmode,
          countries,
          states,
        }}
      >
        <div style={{ backgroundColor: "white" }}>
          <ToastContainer />
          {activeForm === 1 && <AgencyKycForm1 />}

          {activeForm === 2 && <AgencyKycForm2 />}
        </div>
      </FormContext.Provider>
    )
  );
}

export default AgencyForms;
