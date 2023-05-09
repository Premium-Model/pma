import clsx from "clsx";
import "./cardStyle.scss";

let style = "default";

const Card = ({  children, className, variant }) => {
  switch (variant) {
    case "fill_light_green":
      className = clsx(style, "card-light-green");
      break;
    case "fill_light_green-md":
      className = clsx(style, "card-light-green_md");
      break;
    case "fill_red":
      className = clsx(style, "card-red");
      break;
    case "fill_red-md":
      className = clsx(style, "card-red_md");
      break;
    case "fill_black":
      className = clsx(style, "card-black");
      break;
    case "full_width":
      className = "full_width";
      break;
    default:
      break;
  }

  return (
    <div
      variant={variant}
      className={clsx(style, className)}
    >
      {children}
    </div>
  );
};

export default Card;
