import React from "react";
import './layout.scss'

const Layout = ({ children }) => {
  return (
    <main className="layout">
      <main>{children}</main>
    </main>
  );
};

export default Layout;
