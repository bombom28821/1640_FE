import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./viewprofile.css";

const ViewProfile = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  return (
    <div className="viewProfile">
      <Sidebar></Sidebar>
      <div className="viewProfile-navbar">
        <Navbar></Navbar>
      </div>
      <div className="viewProfile-main">
        <div className="viewProfile-mainContent">
          <h4>View Profile</h4>
          <span>{`Hi ${auth.name}, welcome to view profile`}</span>
          <div className="viewProfile-content">
            <div className="viewProfile-img">
              <img src={`${auth.url}/${auth.avatar}`} alt="avatar-user" />
            </div>
            <div className="viewProfile-info">
              <div className="viewProfile-infoItem">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={auth.name} readOnly />
              </div>
              <div className="viewProfile-infoItem">
                <label htmlFor="role">Role</label>
                <input type="text" id="role" value={auth.role} readOnly />
              </div>
              <div className="viewProfile-infoItem">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  value={auth.category || "admin"}
                  readOnly
                />
              </div>
              <div className="viewProfile-infoItem">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={auth.email} readOnly />
              </div>
              <div className="viewProfile-infoItem">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" value={auth.phone} readOnly />
              </div>
              <div className="viewProfile-infoItem">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" value={auth.address} readOnly />
              </div>
            </div>
            <div className="viewProfile-update">
              <NavLink to="/edit-profile">Update</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
