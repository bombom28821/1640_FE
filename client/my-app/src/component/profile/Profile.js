import React, { useRef, useState } from "react";
import "./profile.css";
import useAuth from "../../hook/useAuth";
import { NavLink } from "react-router-dom";
const arrayTemp = Array(21).fill(null);
const Profile = () => {
  // Call User login
  const { auth } = useAuth();
  const [viewPhotos, setViewPhotos] = useState("All Photos");
  const [countImg, setCountImg] = useState(() => {
    const array = arrayTemp;
    if (arrayTemp.length < 10) {
      return array;
    } else {
      return array.slice(0, 9);
    }
  });
  const photoRef = useRef();
  const handleViewPhotos = () => {
    if (viewPhotos === "All Photos") {
      setViewPhotos("Shorten Photos");
      setCountImg(arrayTemp);
    } else {
      const arraySlice = arrayTemp.slice(0, 9);
      setCountImg(arraySlice);
      setViewPhotos("All Photos");
    }
  };

  return (
    <div className="profile">
      <div className="profile-top">
        <div className="profile-right">
          <a href="#">
            <i className="fa fa-bell"></i>
          </a>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-img">
          {auth?.avatar && (
            <img src={`${auth.url}/${auth.avatar}`} alt="avatarUser" />
          )}
        </div>
        <div className="profile-info">
          <h4>{auth.name}</h4>
          <p>{auth.email}</p>
        </div>
        <div className="profile-change">
          <div className="profile-personal">
            <NavLink to="/view-profile" className="profile-view">
              View Profile
            </NavLink>
            <NavLink to="/edit-profile" className="profile-update">
              Edit Profile
            </NavLink>
          </div>
        </div>
      </div>
      <div ref={photoRef} className="profile-listImageView">
        <div className="seeAllPhotos">
          <span>Photos</span>
          <span onClick={handleViewPhotos}>{viewPhotos}</span>
        </div>
        <div className="listPhotos">
          {countImg.map((item, index) => (
            <a
              href="#index"
              key={index}
              className={`${
                countImg.length % 3 === 0 &&
                (index === 0 || index === countImg.length - 3)
                  ? "photo-imgRoundedLeft"
                  : ""
              } ${
                countImg.length % 3 === 0 &&
                (index === 2 || index === countImg.length - 1)
                  ? "photo-imgRoundedRight"
                  : ""
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1647103575551-2e83159d3370?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
