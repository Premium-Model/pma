import React from "react";
import "./inputStyle.scss";

const Input = (
  {
    onChange = (e) => null,
    type = "",
    className,
    placeholder = "",
    variant,
    value,
  }
) => {
  switch (variant) {
    case "normal":
      className = "input";
      break;
    default:
      break;
  }
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default Input;
