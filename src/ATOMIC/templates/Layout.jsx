import React from "react";
import Nav from "../molecules/Nav";
import './layout.scss'

const Layout = ({ children }) => {
  return (
    <main className="layout">
      <Nav />
      <main>{children}</main>
    </main>
  );
};

export default Layout;
