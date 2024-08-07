import React from "react";
import { Link } from "react-router-dom";
import Line from "../../../../../Components/Line/line";

import "./hero.scss";

const Hero = () => {
  return (
    <>
      <Line />
      <div className="hero-container">
        <section className="hero-section container">
          <div className="hero-img-container">
            <img
              src="./images/home/hero/hero-img1new.jpg"
              className="hero-img "
              alt="hero-img"
            ></img>
            <img
              src="./images/home/hero/hero-img2new.jpg"
              className="hero-img"
              alt="hero-img"
            ></img>
            <img
              src="./images/home/hero/hero-img4.jpg"
              className="hero-img"
              alt="hero-img"
            ></img>
            <img
              src="./images/home/hero/hero-img.png"
              className="hero-img "
              alt="hero-img"
            ></img>
          </div>

          <div className="hero-text">
            <article>
              <div className="heading">
                <span>Looking For Models?</span>
              </div>

              <div className="paragraph">
                <span className="paragraph-head">
                  Find The right Model Now!
                </span>

                <span>
                  <img
                    src="./assets/main-assets/hero-checkmark.png"
                    alt="check-markicon"
                    className="circle-icon"
                  />
                  <p>Quick & Easy Model Search</p>
                </span>

                <span>
                  <img
                    src="./assets/main-assets/hero-checkmark.png"
                    alt="check-markicon"
                    className="circle-icon"
                  />
                  <p>Efficient Messaging Services</p>
                </span>

                <span>
                  <img
                    src="./assets/main-assets/hero-checkmark.png"
                    alt="check-markicon"
                    className="circle-icon"
                  />
                  <p>Fast Model responses</p>
                </span>
                <div className="hero-btn">
                  <a href="/signup" className="btn btn2">
                    Start now
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;
