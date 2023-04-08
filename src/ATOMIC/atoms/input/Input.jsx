import React from "react";
import "./inputStyle.scss";

const Input = ({
  onChange = (e) => null,
  type = "",
  className,
  name,
  checked,
  placeholder = "",
  variant,
  value,
}) => {
  switch (variant) {
    case "normal":
      className = "input";
      break;
    case "checkbox":
      className = "checkbox";
      break;
    case "number":
      className = "number";
      break;
    case "search":
      className = "search";
      break;
    default:
      break;
  }
  return (
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      className={className}
    />
  );
};

export default Input;
