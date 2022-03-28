import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar col-2">
      <div className="sidebar-logo d-flex">
        <div className="sidebar-avatar">
          <a href="#">
            <img
              src="https://i.pinimg.com/236x/b8/c8/82/b8c882aeb1665d20b77e7830de3a7566.jpg"
              alt="logo"
            />
          </a>
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
            <li>
              <NavLink
                to="/user/manage"
                className={({ isActive }) =>
                  isActive ? "d-flex active" : "d-flex"
                }
              >
                <span className="sidebar-arrow"></span>
                <span className="sidebar-icon">
                  <i className="fab fa-accusoft"></i>
                </span>
                <span className="sidebar-text">Manage</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/page-personal"
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
        <div className="sidebar-image">
          <img src="../images/Back-to-school.png" alt="back-to-school" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
