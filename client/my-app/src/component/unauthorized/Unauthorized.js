import React from "react";
import { useNavigate } from "react-router-dom";
import "./unauthorizedStyle.css";
const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="unauthorized">
      <div className="unauthorized-main">
        <div className="unauthorized-img">
          <img
            src="https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg"
            alt="img-unauthorized"
          />
        </div>
        <div className="unauthorized-content">
          <h4>You are not authorized to access this page</h4>
          <span>
            When this happens, the page is inactive because you are not logged
            in or may not have permission to access this page. You can visit
            again to be able to access the page
          </span>
        </div>
        <div className="unauthorized-goBack">
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
