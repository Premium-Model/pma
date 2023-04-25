import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "mui-image";
import Button from "../../ATOMIC/atoms/button/Button";
import '../../UI/users/user.scss';

const EditClient = () => {
  const selectedClient = useSelector((state) => state.client.selectedClient);
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <main className="profile-bg">
        <div className="profile-container">
          <section className="img-section">
            <div>
              <Image
                src={selectedClient.img}
                alt={selectedClient.name}
                width={100}
                height={100}
                className="img"
              />
              <p>{selectedClient.name}</p>
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
                <p className="name">{selectedClient.name}</p>
            </div>
            <div>
                <p className="label">Location</p>
                <p className="name">{selectedClient.location}</p>
            </div>
            <div>
                <p className="label">Category</p>
                <p className="name">{selectedClient.category}</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default EditClient;
