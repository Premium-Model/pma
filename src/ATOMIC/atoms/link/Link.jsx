import { Link } from "react-router-dom";
import Icons from "../icons/Icons";

const IconLink = ({ href, icons = {}, children }) => {
  return (
    <Link to={href}>
     {children}
    </Link>
  );
};

export default IconLink;
