import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import "./accountStyle.css";
const Account = (props) => {
  const { auth, setAuth } = useAuth();
  const nodeFunctionRef = useRef();
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        props.activeFunction &&
        !nodeFunctionRef.current?.contains(e.target)
      ) {
        const listItem = document.querySelectorAll(".navbar-item");
        listItem.forEach((item) => {
          if (!item.contains(e.target)) {
            item.classList.remove("active");
          }
        });
        props.setActiveFunction(false);
      }
    };
    if (props.activeFunction) {
      document.addEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [props]);
  return (
    <div className="navbar-account" ref={nodeFunctionRef}>
      <div className="navbar-accountInside">
        <div className="navbar-accountUser">
          <div className="navbar-accountUserImg">
            <img src={`${auth.url}/${auth.avatar}`} alt="avatar" />
          </div>
          <div className="navbar-accountUserName">
            <h4>{auth.name}</h4>
            <span>See your profile</span>
          </div>
        </div>
        <div className="navbar-accountFunction">
          <NavLink to="/view-profile" className="navbar-accountFunctionItem">
            <div className="navbar-iconFunction">
              <span>
                <i className="fa fa-user"></i>
              </span>
            </div>
            <div className="navbar-nameFunction">
              <span>View Profile</span>
            </div>
          </NavLink>
          <NavLink to="/edit-profile" className="navbar-accountFunctionItem">
            <div className="navbar-iconFunction">
              <span>
                <i className="fa fa-edit"></i>
              </span>
            </div>
            <div className="navbar-nameFunction">
              <span>Edit Profile</span>
            </div>
          </NavLink>
          <NavLink to="/change-password" className="navbar-accountFunctionItem">
            <div className="navbar-iconFunction">
              <span>
                <i className="fa fa-gavel"></i>
              </span>
            </div>
            <div className="navbar-nameFunction">
              <span>Change Password</span>
            </div>
          </NavLink>
          <NavLink
            to="/logout"
            className="navbar-accountFunctionItem"
            onClick={() => {
              window.location.reload();
            }}
          >
            <div className="navbar-iconFunction">
              <span>
                <i className="fa fa-sign-out-alt"></i>
              </span>
            </div>
            <div className="navbar-nameFunction">
              <span>Log Out</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Account;
