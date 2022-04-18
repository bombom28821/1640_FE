import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import Account from "./account/Account";
import "./navbarStyle.css";
import Notification from "./notification/Notification";
const Navbar = () => {
  const [activeUser, setActiveUser] = useState(false);
  const [activeNotification, setActiveNotification] = useState(false);
  const [activeFunction, setActiveFunction] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { auth } = useAuth();
  const handleNavigation = (e) => {
    const listItem = document.querySelectorAll(".navbar-itemFunction");
    listItem.forEach((item) => {
      if (item.contains(e.target)) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };
  const handleFunction = (e) => {
    const listItem = document.querySelectorAll(".navbar-item");
    listItem.forEach((item) => {
      if (item.contains(e.target) && !activeFunction) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    setActiveFunction(!activeFunction);
  };
  const handleNotification = (e) => {
    const listItem = document.querySelectorAll(".navbar-item");
    listItem.forEach((item) => {
      if (item.contains(e.target) && !activeNotification) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    setActiveNotification(!activeNotification);
  };
  useEffect(() => {
    if (dropdown) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
    return () => {
      document.body.classList.remove("active");
    };
  }, [dropdown]);
  return (
    <div className="navbar-horizontal">
      <div className="navbar-content">
        <div className="navbar-left">
          <NavLink to="/" className="navbar-logo">
            <img
              src="https://i.pinimg.com/236x/b8/c8/82/b8c882aeb1665d20b77e7830de3a7566.jpg"
              alt="logo"
            />
          </NavLink>
          <div
            className="navbar-setting"
            onClick={() => setDropdown(!dropdown)}
          >
            <div className="navbar-settingMain">
              <span>
                <i
                  className="fa fa-align-justify"
                  style={{
                    color: dropdown ? "#1877f2" : "",
                  }}
                ></i>
              </span>
            </div>
          </div>
          {/* <div className="navbar-search">
            <label htmlFor="search">
              <input type="text" id="search" placeholder="Search Post" />
              <span>
                <i className="fa fa-search"></i>
              </span>
            </label>
          </div> */}
        </div>
        {dropdown && (
          <div className="navbar-dropdown">
            <div className="navbar-dropdownMain">
              {/* <div className="navbar-search navbar-searchDropdown">
                <label htmlFor="search">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search Post"
                    autoComplete="off"
                  />
                  <span
                    onClick={() => {
                      setDropdown(false);
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </span>
                </label>
              </div> */}
              <div className="navbar-dropdownUser">
                <div className="navbar-dropdownImgUser">
                  <img src={`${auth.url}/${auth.avatar}`} alt="" />
                </div>
                <div className="navbar-dropdownNameUser">
                  <span>{auth.name}</span>
                </div>
              </div>
              <div className="navbar-dropdownLine"></div>
              <div className="navbar-dropdownContent">
                <ul>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "d-flex active" : "d-flex"
                      }
                    >
                      <span className="navbar-dropdownIcon">
                        <i className="fa fa-home"></i>
                      </span>
                      <span className="navbar-dropdownText">Home</span>
                    </NavLink>
                  </li>
                  {(auth.role === "admin" || auth.role === "manager") && (
                    <li>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          isActive ? "d-flex active" : "d-flex"
                        }
                      >
                        <span className="navbar-dropdownIcon">
                          <i className="fa fa-address-card"></i>
                        </span>
                        <span className="navbar-dropdownText">Dashboard</span>
                      </NavLink>
                    </li>
                  )}
                  {auth.role === "admin" && (
                    <li>
                      <NavLink
                        to="/manage-account"
                        className={({ isActive }) =>
                          isActive ? "d-flex active" : "d-flex"
                        }
                      >
                        <span className="navbar-dropdownIcon">
                          <i className="fa fa-atom"></i>
                        </span>
                        <span className="navbar-dropdownText">
                          Manage Account
                        </span>
                      </NavLink>
                    </li>
                  )}
                  {(auth.role === "admin" || auth.role === "manager") && (
                    <li>
                      <NavLink
                        to="/manage-category"
                        className={({ isActive }) =>
                          isActive ? "d-flex active" : "d-flex"
                        }
                      >
                        <span className="navbar-dropdownIcon">
                          <i className="fa fa-calendar"></i>
                        </span>
                        <span className="navbar-dropdownText">
                          Manage Category
                        </span>
                      </NavLink>
                    </li>
                  )}
                  {(auth.role === "admin" || auth.role === "manager") && (
                    <li>
                      <NavLink
                        to="/manage-idea"
                        className={({ isActive }) =>
                          isActive ? "d-flex active" : "d-flex"
                        }
                      >
                        <span className="navbar-dropdownIcon">
                          <i className="fa fa-table"></i>
                        </span>
                        <span className="navbar-dropdownText">Manage Idea</span>
                      </NavLink>
                    </li>
                  )}

                  <li>
                    <NavLink
                      to="/personal-page"
                      className={({ isActive }) =>
                        isActive ? "d-flex active" : "d-flex"
                      }
                    >
                      <span className="sidebar-arrow"></span>
                      <span className="sidebar-icon">
                        <i className="fab fa-accusoft"></i>
                      </span>
                      <span className="sidebar-text">Personal Page</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="navbar-middle">
          <div
            className="navbar-itemFunction"
            onClick={(e) => handleNavigation(e)}
          >
            <div className="navbar-itemMain">
              <NavLink to="/">
                <i className="fa fa-home"></i>
              </NavLink>
              <div className="navbar-note">
                <span>Home</span>
              </div>
            </div>
          </div>
          {(auth.role === "admin" || auth.role === "manager") && (
            <div
              className="navbar-itemFunction"
              onClick={(e) => handleNavigation(e)}
            >
              <div className="navbar-itemMain">
                <NavLink to="/dashboard">
                  <i className="fa fa-address-card"></i>
                </NavLink>
                <div className="navbar-note">
                  <span>Dashboard</span>
                </div>
              </div>
            </div>
          )}
          {auth.role === "admin" && (
            <div
              className="navbar-itemFunction"
              onClick={(e) => handleNavigation(e)}
            >
              <div className="navbar-itemMain">
                <NavLink to="/manage-account">
                  <i className="fa fa-atom"></i>
                </NavLink>
                <div className="navbar-note">
                  <span>Manage Account</span>
                </div>
              </div>
            </div>
          )}
          {(auth.role === "admin" || auth.role === "manager") && (
            <div
              className="navbar-itemFunction"
              onClick={(e) => handleNavigation(e)}
            >
              <div className="navbar-itemMain">
                <NavLink to="/manage-category">
                  <i className="fa fa-calendar"></i>
                </NavLink>
                <div className="navbar-note">
                  <span>Manage Category</span>
                </div>
              </div>
            </div>
          )}
          {(auth.role === "admin" || auth.role === "manager") && (
            <div
              className="navbar-itemFunction"
              onClick={(e) => handleNavigation(e)}
            >
              <div className="navbar-itemMain">
                <NavLink to="/manage-idea">
                  <i className="fa fa-table"></i>
                </NavLink>
                <div className="navbar-note">
                  <span>Manage Idea</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="navbar-bottom">
          <div className={`navbar-user ${activeUser ? "active" : ""}`}>
            <div className="navbar-img">
              {auth.avatar && (
                <img src={`${auth.url}/${auth.avatar}`} alt="img-user" />
              )}
            </div>
            <div className="navbar-name">
              <span>{auth.name}</span>
            </div>
          </div>
          <div
            className="navbar-item navbar-notification"
            onClick={(e) => handleNotification(e)}
          >
            <span>
              <i className="fa fa-bell"></i>
            </span>
            <div className="navbar-note">
              <span>Notifications</span>
            </div>
          </div>
          <div
            className="navbar-item navbar-function"
            onClick={(e) => handleFunction(e)}
          >
            <span>
              <i className="fa fa-caret-down"></i>
            </span>
            <div className="navbar-note">
              <span>Account</span>
            </div>
          </div>
        </div>
        {activeNotification && (
          <Notification
            activeNotification={activeNotification}
            setActiveNotification={setActiveNotification}
          ></Notification>
        )}
        {activeFunction && (
          <Account
            activeFunction={activeFunction}
            setActiveFunction={setActiveFunction}
          ></Account>
        )}
      </div>
    </div>
  );
};

export default Navbar;
