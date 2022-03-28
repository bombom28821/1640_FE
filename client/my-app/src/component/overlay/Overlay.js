import React, { useEffect } from "react";
import "./overlayStyle.css";
const Overlay = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("active");
  }, []);
  return (
    <>
      <div className="overlay"></div>
      <div className="overlay-content">{children}</div>
    </>
  );
};

export default Overlay;
