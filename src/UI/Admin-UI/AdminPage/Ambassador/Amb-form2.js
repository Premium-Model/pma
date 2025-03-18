import { useEffect, useState } from "react";
import { storage } from "../firebase"; // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./Amb-form.css";

const AbsForm = ({
  addAmbassador,
  message,
  toggleAlert,
  setToggleAlert,
  isSuccess,
  setIsSuccess,
}) => {
  const [absData, setAbsData] = useState({
    picture: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    location: "",
    start: "",
    end: "",
  });

  const [check, setCheck] = useState({
    getEmail: true,
    acceptTerms: true,
  });

  const [uploading, setUploading] = useState(false);

  // Handle input change
  const handleAbsData = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      handleFileUpload(files[0]); // Upload image to Firebase
    } else if (type === "checkbox") {
      setCheck((prev) => ({ ...prev, [name]: checked }));
    } else {
      setAbsData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload image to Firebase
  const handleFileUpload = (file) => {
    setUploading(true);
    const storageRef = ref(storage, `ambassadors/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setAbsData((prev) => ({ ...prev, picture: downloadURL }));
        setUploading(false);
      }
    );
  };

  // Reset form when submission is successful
  useEffect(() => {
    if (isSuccess === "Yes") {
      setAbsData({
        picture: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        location: "",
        start: "",
        end: "",
      });
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        check.getEmail && check.acceptTerms
          ? addAmbassador(absData)
          : console.log("Checkbox not checked");
      }}
      className="Abs-form"
    >
      {/* Upload Image */}
      <section className="top-sect-wrapper">
        <label className="Abs-photo-label" htmlFor="photo">
          <input
            type="file"
            id="photo"
            name="picture"
            onChange={handleAbsData}
            hidden
            required
          />
          {absData.picture ? (
            <img
              className="Abs-photo-img"
              src={absData.picture}
              alt="Uploaded"
            />
          ) : (
            <div className="photo-btn-wrapper">
              <div className="photo-btn">+</div>
            </div>
          )}
          {uploading && <p>Uploading...</p>}
        </label>
      </section>

      {/* Other input fields remain unchanged */}
      <section className="down-sect-wrapper">
        <label className="Abs-label" htmlFor="firstName">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={absData.firstName}
            onChange={handleAbsData}
            placeholder="First Name..."
            required
          />
        </label>

        <label className="Abs-label" htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            value={absData.email}
            onChange={handleAbsData}
            placeholder="Email..."
            required
          />
        </label>
      </section>

      {/* Submit Button */}
      <button className="register-btn" disabled={uploading}>
        {uploading ? "Uploading..." : "Register"}
      </button>
    </form>
  );
};

export default AbsForm;
