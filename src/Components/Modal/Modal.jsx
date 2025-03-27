import "./Modal.scss";

const Modal = ({
  toggleAlert,
  setToggleAlert,
  message,
  isSuccess,
  setIsSuccess,
}) => {
  return (
    <section
      className="modal-container"
      style={{
        transform: toggleAlert ? `translateX(0%)` : `translateX(-100%)`,
      }}
    >
      <div className="modal-box">
        {isSuccess === "Yes" ? (
          <i className="fa-solid fa-circle-check fa-2x success-icon"></i>
        ) : isSuccess === "No" ? (
          <i className="fa-solid fa-circle-xmark fa-2x error-icon"></i>
        ) : null}

        <p className="modal-text">{message}</p>
        <div
          onClick={() => {
            setToggleAlert(false);
            setIsSuccess("");
          }}
          className="modal-btn btn-shadow"
        >
          Got it!
        </div>
      </div>
    </section>
  );
};

export default Modal;
