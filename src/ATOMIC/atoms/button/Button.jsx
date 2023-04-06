import clsx from "clsx";
import React from "react";
import './buttonStyle.scss'


const style = "default"

const Button = ({ onClick = (e) => {}, variant, children, className }) => {
  switch (variant) {
    case "primary":
      className = clsx(style, "btn-primary");
      break;
    case "secondary":
      className = clsx(style, "btn-secondary");
      break;
    default:
      break;
  }
  return (
    <button onClick={(e) => onClick(e)} className={className}>
      {children}
    </button>
  );
};

export default Button;
