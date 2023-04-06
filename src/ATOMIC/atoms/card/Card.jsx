import clsx from "clsx";
import "./cardStyle.scss";

let style = "default";

const Card = ({  children, className, variant }) => {
  switch (variant) {
    case "fill_light_green":
      className = clsx(style, "card-light-green");
      break;
    case "fill_red":
      className = clsx(style, "card-red");
      break;
    case "fill_black":
      className = clsx(style, "card-black");
      break;
    case "full_width":
      className = clsx( "full_width");
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
