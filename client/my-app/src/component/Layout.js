import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="Main">
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
