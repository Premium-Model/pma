import React from "react";
import "./containerStyle.scss";

const Container = ({ variant, children, className }) => {
  switch (variant) {
    case "flexFit":
      className = "flex-fit";
      break;
    case "flexed":
      className = "flex-bw";
      break;
    case "normal":
      className = "container";
      break;
    case "gapped":
      className = "gapped";
      break;
    case "gapped-spaced":
      className = "nav-flex-bw";
      break;
    case "gapped-top":
      className = "gapped-top";
      break;
    default:
      break;
  }
  return (
    <main className={className} variant={variant}>
      {children}
    </main>
  );
};

export default Container;
