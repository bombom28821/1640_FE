import React from "react";
import { useNavigate } from "react-router-dom";
import "./missingStyle.css";
const Missing = () => {
  const navigate = useNavigate();
  return (
    <div className="missing">
      <div className="missing-main">
        <div className="missing-img">
          <img
            src="https://cdn.dribbble.com/users/761395/screenshots/6168098/media/08a85f09af819a00bcb17a62f41df84d.jpg?compress=1&resize=800x600&vertical=top"
            alt="img-missing"
          />
        </div>
        <div className="missing-content">
          <h4>This page isn't available</h4>
          <span>
            The link may be broken, or the page may have been removed. Check to
            see if the link you're trying to open is correct.
          </span>
        </div>
        <div className="missing-goBack">
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Missing;
