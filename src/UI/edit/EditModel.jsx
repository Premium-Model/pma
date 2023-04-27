import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "mui-image";
import Button from "../../ATOMIC/atoms/button/Button";
import '../../UI/users/user.scss';

const EditModel = () => {
  const selectedUser = useSelector((state) => state.model.selectedModel);
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <main className="profile-bg">
        <div className="profile-container">
          <section className="img-section">
            <div>
              <Image
                src={selectedUser.img}
                alt={selectedUser.name}
                width={100}
                height={100}
                className="img"
              />
              <p>{selectedUser.name}</p>
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
                <p className="name">{selectedUser.name}</p>
            </div>
            <div>
                <p className="label">Location</p>
                <p className="name">{selectedUser.location}</p>
            </div>
            <div>
                <p className="label">Category</p>
                <p className="name">{selectedUser.category}</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default EditModel;
