import React from "react";
import Nav from "../molecules/Nav";
import './layout.scss'

const Layout = ({ children }) => {
  return (
    <main className="layout">
      <Nav />
      <div>{children}</div>
    </main>
  );
};

export default Layout;
