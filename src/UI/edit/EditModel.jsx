import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "mui-image";
import Button from "../../ATOMIC/atoms/button/Button";
import "../../UI/users/user.scss";
import { makeGet } from "../../redux/apiCalls";
import { useLocation } from "react-router-dom";

const EditModel = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  const [isVisible, setIsVisible] = useState(true);
  const [model, setModel] = useState({});

  const fetchModel = useCallback(() => {
    makeGet(dispatch, `/model/model/${path}`, setModel);
  }, [dispatch, path]);

  useEffect(() => {
    let unsubscribe = fetchModel();
    return () => unsubscribe;
  }, []);

  return (
    <>
      <main className="profile-bg">
        <div className="profile-container">
          <section className="img-section">
            <div>
              <Image
                src={model.picture}
                alt={model.picture}
                width={100}
                height={100}
                className="img"
              />
              <p>{model.fullName}</p>
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
              <p className="name">{model.fullName}</p>
            </div>
            <div>
              <p className="label">Location</p>
              <p className="name">
                {model.state}, {model.country}
              </p>
            </div>
            <div>
              <p className="label">Category</p>
              <p className="name">{model.category}</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default EditModel;
