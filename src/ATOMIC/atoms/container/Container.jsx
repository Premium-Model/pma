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
    case "container_fit":
      className = "container_fit";
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
    case "gapped-top-center":
      className = "gapped-top-center";
      break;
    case "flex-around":
      className = "flex-around";
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
