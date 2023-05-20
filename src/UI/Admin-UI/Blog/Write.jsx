import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useLocation } from "react-router-dom";
import { storage } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { makeEdit, makePost } from "../../../redux/apiCalls";
import BundledEditor from "./BundledEditor";

const Write = () => {
  const { isFetching } = useSelector((state) => state.process);
  const state = useLocation().state;
  const dispatch = useDispatch();

  const [title, setTitle] = useState(state?.title || "");
  const [photo, setPhoto] = useState(state?.photo || undefined);
  const [cat, setCat] = useState(state?.cat || "");
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [paragraph, setParagraph] = useState(state?.paragraphs || []);

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/models/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "photo" && setProgress(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    photo && uploadFile(photo, "photo");
  }, [photo]);

  const data = {
    title,
    photo: state?.photo || inputs.photo,
    cat,
    paragraphs: paragraph,
  };

  const handleClick = () => {
    if (state) {
      makeEdit(dispatch, `/blog/blog/edit?_id=${state._id}`, data);
    } else {
      makePost(dispatch, "/blog/post-blog", data, setMessage);
    }
  };

  return (
    <form className="add" onSubmit={handleClick}>
      {/* <form> */}
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <div className="">
            {photo && (
              <img src={state?.photo || URL.createObjectURL(photo)} alt="" />
            )}
            <BundledEditor setParagraph={setParagraph} paragraph={paragraph} />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <div className="buttons">
              <button>Save as a draft</button>
              <button disabled={!data.title}>
                {isFetching ? "Please wait..." : "Publish"}
              </button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "tips&tricks"}
                name="cat"
                value="tips&tricks"
                id="tips&tricks"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="tips&tricks">Tips & Tricks</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "news"}
                name="cat"
                value="news"
                id="news"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="news">News</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "models"}
                name="cat"
                value="models"
                id="models"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="models">Models</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "lifestyle"}
                name="cat"
                value="lifestyle"
                id="lifestyle"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="lifestyle">Lifestyle</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "magazine"}
                name="cat"
                value="magazine"
                id="magazine"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="magazine">Magazine</label>
            </div>
          </div>
        </div>
      {/* </form> */}
    </form>
  );
};

export default Write;
