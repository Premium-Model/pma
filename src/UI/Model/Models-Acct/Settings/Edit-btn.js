import "./Btn.scss";
import { Edit, Save } from "@mui/icons-material";

function EditBtn({ btnText, section, handleActiveEdit }) {
  function handleClick() {
    handleActiveEdit(section, btnText);
  }

  return (
    <button
      onClick={handleClick}
      className="editable-btn btn_shadow"
      type="button"
    >
      {btnText === "Edit" ? (
        <Edit className="edit-icon" />
      ) : (
        <Save className="edit-icon" />
      )}
      <span className="edit-btn-text">
        {btnText === "Done" ? "Save Changes" : btnText}
      </span>
    </button>
  );
}

export default EditBtn;
