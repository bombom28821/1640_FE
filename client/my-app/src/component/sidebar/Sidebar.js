import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import "./sidebar.css";
const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <div className="sidebar">
      <div className="sidebar-logo d-flex">
        <div className="sidebar-avatar">
          <NavLink to="/">
            <img
              src="https://i.pinimg.com/236x/b8/c8/82/b8c882aeb1665d20b77e7830de3a7566.jpg"
              alt="logo"
            />
          </NavLink>
        </div>
        <div className="sidebar-title">
          <h2 className="sidebar-name">Greenwich</h2>
          <p className="sidebar-info">"Alliance with FPT Education"</p>
        </div>
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-content">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "d-flex active" : "d-flex"
                }
              >
                <span className="sidebar-arrow"></span>
                <span className="sidebar-icon">
                  <i className="fa fa-home"></i>
                </span>
                <span className="sidebar-text">Home</span>
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
                  <span className="sidebar-arrow"></span>
                  <span className="sidebar-icon">
                    <i className="fa fa-address-card"></i>
                  </span>
                  <span className="sidebar-text">Dashboard</span>
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
                  <span className="sidebar-arrow"></span>
                  <span className="sidebar-icon">
                    <i className="fa fa-atom"></i>
                  </span>
                  <span className="sidebar-text">Manage Account</span>
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
                  <span className="sidebar-arrow"></span>
                  <span className="sidebar-icon">
                    <i className="fa fa-calendar"></i>
                  </span>
                  <span className="sidebar-text">Manage Category</span>
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
                  <span className="sidebar-arrow"></span>
                  <span className="sidebar-icon">
                    <i className="fa fa-table"></i>
                  </span>
                  <span className="sidebar-text">Manage Idea</span>
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
        <div className="sidebar-line"></div>
        <div className="sidebar-function">
          <ul>
            <li>
              <NavLink to="/view-profile">
                <span className="sidebar-icon">
                  <i className="fa fa-user"></i>
                </span>
                <span className="sidebar-text">View Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/edit-profile">
                <span className="sidebar-icon">
                  <i className="fa fa-edit"></i>
                </span>
                <span className="sidebar-text">Edit Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/change-password">
                <span className="sidebar-icon">
                  <i className="fa fa-gavel"></i>
                </span>
                <span className="sidebar-text">Change password</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/logout"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <span className="sidebar-icon">
                  <i className="fa fa-sign-out-alt"></i>
                </span>
                <span className="sidebar-text">Log out</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar-line"></div>
        <div className="sidebar-image">
          <img src="../images/Back-to-school.png" alt="back-to-school" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
