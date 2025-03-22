function EditBtn({ btnText, section, handleActiveEdit }) {
  function handleClick() {
    handleActiveEdit(section, btnText);
  }

  return (
    <button
      onClick={handleClick}
      className="edit-btn colored-hover"
      type="button"
    >
      {btnText}
      <i className="fa-solid fa-pen-to-square"></i>
    </button>
  );
}

export default EditBtn;
