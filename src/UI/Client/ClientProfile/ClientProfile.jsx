import "../ClientProfile/client.css";
import clientimg from "../ClientProfile/assets/clientimg.jpg";
import { GrLocation } from "react-icons/gr";
import { SlSocialInstagram } from "react-icons/sl";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineIdcard } from "react-icons/ai";
import { SlUserFollow } from "react-icons/sl";
import { SiWebauthn } from "react-icons/si";
import About from "../ClientProfile/About";
import Jobs from "../ClientProfile/Jobs";
import Portfolio from "../ClientProfile/Portfolio";
import { Link, Route, Routes } from "react-router-dom";
import header from "../ClientProfile/assets/header.png";
import { useSelector } from "react-redux";
import { useState } from "react";

const ClientProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [about, setAbout] = useState(true);
  const [job, setJob] = useState(false);
  const [portfolio, setPortfolio] = useState(false);

  const handleAbout = () => {
    setAbout(true);
    setJob(false);
    setPortfolio(false);
  };

  const handleJob = () => {
    setJob(true);
    setAbout(false);
    setPortfolio(false);
  };

  const handlePortfolio = () => {
    setPortfolio(true);
    setJob(false);
    setAbout(false);
  };

  return (
    <div className="client-profile">
      <div className="top-nav">
        <img
          src={
            user?.client?.coverPicture
              ? user?.client?.coverPicture
              : "https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png"
          }
          alt=""
          className="nav-img"
          style={{ objectFit: "cover" }}
        />
        <div className="client-nav">
          <div className="client-img">
            <img src={user?.picture} alt="placeholder" />
          </div>
          <div className="nav-links">
            <Link to="" onClick={handleAbout}>
              <p className="about-nav">
                <AiOutlineInfoCircle />
                About
              </p>
            </Link>
            <Link to="" onClick={handleJob}>
              <p className="jobs-nav">
                <BsFillBagFill />
                Jobs
              </p>
            </Link>
            <Link to="" onClick={handlePortfolio}>
              <p className="portfolio-nav">
                <AiOutlineIdcard />
                Brand Photos
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="cbox">
        <div className="clientBox-1">
          <h2>{user?.client?.brandName}</h2>
          <p>
            <GrLocation /> {user?.client?.state}, {user?.client?.country}
          </p>
          <p>
            <SiWebauthn />
            {user?.client?.brandUrl}
          </p>
          {/* <Link>
            <button>
              <SlUserFollow /> Follow
            </button>
          </Link> */}
          {/* <div className="followSection">
            <div className="following">
              <p>Following</p>
              <p>106</p>
            </div>
            <div className="followers">
              <p>Followers</p>
              <p>547</p>
            </div>
          </div> */}
          <div className="socialMediaButtons">
            <a href={`https://www.instagram.com/${user?.client?.instagram}`} target="_blanc" >
              <SlSocialInstagram />
            </a>
            {/* <Link>
              <AiFillFacebook />
            </Link>
            <Link>
              <AiFillTwitterCircle />
            </Link> */}
          </div>
        </div>
        <div className="clientBox-2">
          {about && <About user={user} />}
          {job && <Jobs user={user} />}
          {portfolio && <Portfolio user={user} />}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
