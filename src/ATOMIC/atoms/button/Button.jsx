import clsx from "clsx";
import React from "react";
import './buttonStyle.scss'


const style = "default"

const Button = ({ onClick = (e) => {}, variant, children, className, isDisabled }) => {
  switch (variant) {
    case "normal":
      className = clsx( "btn-normal");
      break;
    case "blur":
      className = clsx( "btn-blur");
      break;
    case "primary":
      className = clsx(style, "btn-primary");
      break;
    case "secondary":
      className = clsx(style, "btn-secondary");
      break;
    case "transparent":
      className = clsx(style, "btn-transparent");
      break;
    case "outlined":
      className = clsx(style, "btn-outlined");
      break;
    default:
      break;
  }
  return (
    <button onClick={(e) => onClick(e)} className={className} isDisabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
