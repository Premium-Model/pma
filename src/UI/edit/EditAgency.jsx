import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "mui-image";
import Button from "../../ATOMIC/atoms/button/Button";
import '../../UI/users/user.scss';
import { useLocation } from "react-router-dom";
import { makeGet } from "../../redux/apiCalls";

const EditAgency = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const [isVisible, setIsVisible] = useState(true);
  const [agency, setAgency] = useState({});

  const fetchClient = useCallback(() => {
    makeGet(dispatch, `/agency/${path}`, setAgency);
  }, [dispatch, path]);

  useEffect(() => {
    let unsubscribe = fetchClient();
    return () => unsubscribe;
  }, []);

  return (
    <>
      <main className="profile-bg">
        <div className="profile-container">
          <section className="img-section">
            <div>
              <Image
                src={agency.picture}
                alt={agency.picture}
                width={100}
                height={100}
                className="img"
              />
              <p>{agency.fullName}</p>
            </div>
            <div>
              <p onClick={() => setIsVisible(!isVisible)}>Details </p>
              <div>
                <Button variant="blur">Edit</Button>
              </div>
            </div>
          </section>
          <div className="hr"></div>
          <section
            className={
              isVisible ? "detail-section_visible" : "detail-section_hidden"
            }
          >
            <div>
                <p className="label">Name</p>
                <p className="name">{agency.fullName}</p>
            </div>
            <div>
                <p className="label">Location</p>
                <p className="name">{agency.state}, {agency.country}</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default EditAgency;
