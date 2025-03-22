import "./model-settings.scss";
import "./model-settings.css";
import "../../../../scss/dashboards.scss";

// Sidebar Navigation Icons --> [START]
import {
  MdOutlineLiveTv,
  MdOutlineFilter,
  MdOutlineBarChart,
  MdOutlineLiveHelp,
  MdOutlineContactPhone,
  MdOutlineDashboard,
} from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { BiLogOut, BiWallet } from "react-icons/bi";
import { CgUserList } from "react-icons/cg"; //[END]

import Background from "../../../../Components/Dashboard/Background/background"; //[END]

// Custom Hooks  --> [START]
import useMediaQuery from "../../../../custom_hooks/useMediaQuery"; //[END]

// Other External NPM Packages --> [START]
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router"; //[END]
import { useSelector } from "react-redux";

//--> importing notification component
import Notification from "../../../Notification/Notification";
import Sidebar from "../../../../Components/Sidebar/Settings Sidebar";
import DashboardTopbar from "../../../../Components/Dashboard/Topbar/topbar";

const ModelPage = ({
  showNavbar,
  setShowNavbar,
  setModelPage,
  setNotice,
  notice,
}) => {
  const [darkmode, setDarkMode] = useState(() => {
    // Retrieve dark mode preference from local storage
    return localStorage.getItem("darkmode") === "true";
  });

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

  // Smooth transition handler
  const TransitionHandler = () => {
    const targetElements = document.querySelectorAll("*");

    targetElements.forEach((el) => {
      el.classList.add("dashboard-transition");

      requestAnimationFrame(() => {
        setTimeout(() => {
          el.classList.remove("dashboard-transition");
        }, 800); // Reduce time for a more natural effect
      });
    });
  };

  // Function to handle theme switching
  const HandleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkmode", newMode); // Save to local storage
      return newMode;
    });
    TransitionHandler();
  };

  // Run FocusBlur once when component mounts
  useEffect(() => {
    FocusBlur();
  }, []);

  const user = useSelector((state) => state.user.currentUser);
  // Using Hooks  --> [START]

  const [toggleNotice, setToggleNotice] = useState(false); //--> toggle Notification open or close

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]); //--> Hides The Navbar

  const [sidebarVisibility, setSidebarVisibility] = useState(false); //--> Toggle Sidebar Navigation
  const mQ1050px = useMediaQuery("(min-width: 768px)");

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      loc.pathname === "/model-Acct-setting" ||
      loc.pathname === "/model-Acct-setting/"
    ) {
      navigate("profile");
    } else if (loc.pathname === "/model-Acct-setting/wallet") {
      navigate("wallet");
    } else if (loc.pathname === "/model-Acct-setting/dashboard") {
      navigate("/modelpage/dashboard");
    }
  }, [loc.pathname, navigate]); // --> Redirecting to the dashboard
  //[END]

  // Array For Composing Sidebar Navigation -> (Sidebar Componet) --> [START]
  const topList = [
    { name: "Profile", icon: <CgUserList className="icon" />, path: "profile" },
    {
      name: "Stats",
      icon: <MdOutlineBarChart className="icon" />,
      path: "stats",
    },

    {
      name: "Photos",
      icon: <MdOutlineFilter className="icon" />,
      path: "photos",
    },
    {
      name: "Videos",
      icon: <MdOutlineLiveTv className="icon" />,
      path: "videos",
    },
    { name: "Wallet", icon: <BiWallet className="icon" />, path: "wallet" },
    {
      name: "Logins",
      icon: <HiStatusOnline className="icon" />,
      path: "logins",
    },
  ];
  const bottomList = [
    {
      name: "Contact us",
      icon: <MdOutlineContactPhone className="icon" />,
      path: "/contact",
    },
    {
      name: "Dashboard",
      icon: <MdOutlineDashboard className="icon" />,
      path: "/modelpage/dashboard",
    },
  ];
  //[END]
  // Button Component -> (Topbar Component) --> [START]
  const button = (
    <motion.button whileTap={{ scale: 0.96 }} id="nav_button">
      Promote Portfolio
    </motion.button>
  );
  //[END]

  return (
    !showNavbar && (
      <div
        className={
          darkmode
            ? "model_page  dashboards-styles  darkmode"
            : " model_page  dashboards-styles"
        }
      >
        {mQ1050px ? (
          <Sidebar
            topList={topList}
            darkmode={darkmode}
            HandleTheme={HandleTheme}
            bottomList={bottomList}
            setSidebarVisibility={setSidebarVisibility}
          />
        ) : sidebarVisibility ? (
          <Background childState={setSidebarVisibility}>
            <Sidebar
              topList={topList}
              darkmode={darkmode}
              HandleTheme={HandleTheme}
              bottomList={bottomList}
              setSidebarVisibility={setSidebarVisibility}
            />
          </Background>
        ) : null}
        {/*[END] */}

        <main
          id="model-setting-main"
          className={
            darkmode ? " dashboards-styles  darkmode " : "dashboards-styles "
          }
        >
          {/* Model Page Topbar --> [START] */}

          <DashboardTopbar
            lastItem={button}
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
            setPage={setModelPage}
            setToggleNotice={setToggleNotice}
            notice={notice}
          />
          {/* [END] */}

          {/* Render The Current Sidebar Navigation Link --> [START] */}
          <Outlet context={{ darkmode, HandleTheme }} />
          {/* [END] */}

          <Notification
            toggleNotice={toggleNotice}
            setToggleNotice={setToggleNotice}
            notice={notice}
            setNotice={setNotice}
          />
        </main>
      </div>
    )
  );
};

export default ModelPage;
