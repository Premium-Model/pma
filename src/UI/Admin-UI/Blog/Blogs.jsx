import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./styles.scss";
import Write from "./Write";
import { makeGet } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";

const Blogs = ({ isWrite, setIsWrite }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  // const [isWrite, setIsWrite] = useState(false);

  const cat = useLocation().search;
  // console.log(cat);

  useEffect(() => {
    const fetchData = () => {
      makeGet(dispatch, "/blog/blogs", setPosts);
    };
    fetchData();
  }, [cat]);

  const reversed = [...posts].reverse();

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <button className="newBlog" onClick={() => setIsWrite(!isWrite)}>
        {isWrite ? "Close" : "New Blog"}
      </button>
      {isWrite ? (
        <Write />
      ) : (
        <div className="posts">
          {reversed.map((post, index) => (
            <div className="post" key={index}>
              {post.photo && (
                <div className="img">
                  <img src={post.photo} alt="" />
                </div>
              )}
              <div className="content">
                <Link className="link" to={`/adminpage/post/${post._id}`}>
                  <h1>{post.title}</h1>
                </Link>
                {post?.text && <p>{getText(post?.text)}</p>}
                {post?.paragraphs?.slice(0, 1).map((item, index) => (
                  <p key={index}>{getText(item?.text)}</p>
                ))}
                <Link className="link" to={`/adminpage/post/${post._id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
