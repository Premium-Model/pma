import React from "react";
import Nav from "../molecules/Nav";

const Layout = ({ children }) => {
  return (
    <main>
      <Nav />
      <div>{children}</div>
    </main>
  );
};

export default Layout;
