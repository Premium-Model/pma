import { createContext, useCallback, useEffect, useState } from "react";
import ClientKycForm1 from "./Client-Kyc-Forms/Client-Kyc-Form-1";
import ClientKycForm2 from "./Client-Kyc-Forms/Client-Kyc-Form-2";
import "./Client-Kyc-Forms.css";
import "../../../../scss/kyc-forms.scss";
import axios from "axios";
import { Country, State } from "country-state-city";
export const FormContext = createContext();
function ClientsForms({ setShowNavbar, showNavbar }) {
  const [activeForm, setActiveForm] = useState(1);
  const [inputs, setInputs] = useState({});
  const [darkmode, setDarkMode] = useState(false);
  const [picture, setPicture] = useState(undefined);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

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

  // console.log(inputs)

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
  const focusinputs = document.querySelectorAll(".input-textarea");
  const FocusBlur = () => {
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
  }, [focusinputs]);

  return (
    !showNavbar && (
      <FormContext.Provider
        value={{
          handleNavigation,
          HandleTheme,
          setDarkMode,
          TransitionHandler,
          FocusBlur,
          handleChange,
          setInputs,
          setPicture,
          countries,
          states,
          picture,
          darkmode,
          inputs,
        }}
      >
        <div style={{ backgroundColor: "white" }}>
          {activeForm === 1 && <ClientKycForm1 />}

          {activeForm === 2 && <ClientKycForm2 />}
        </div>
      </FormContext.Provider>
    )
  );
}

export default ClientsForms;
