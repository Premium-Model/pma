import React from "react";
import { useState, useEffect } from "react";
import './modal.scss'

const Modal = ({ isOpen, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };
  
  return (
    // className={isModalOpen ? "modal-overlay" : "modal-hiden"}
    <div className={isOpen ? "modal-overlay ": "modal-hiden"}>
      <div className="modal">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;


