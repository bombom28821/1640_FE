import React, { useState } from "react";
import "./profile.css";
const arrayTemp = Array(21).fill(null);
const Profile = () => {
  const [seeAll, setSeeAll] = useState(true);
  const [countImg, setCountImg] = useState(() => {
    const array = arrayTemp;
    if (arrayTemp.length < 10) {
      return array;
    } else {
      return array.slice(0, 9);
    }
  });
  const handleSeeAllPost = () => {
    setCountImg(arrayTemp);
    setSeeAll(!seeAll);
  };
  const handleShortened = () => {
    const arraySlice = arrayTemp.slice(0, 9);
    setCountImg(arraySlice);
    setSeeAll(!seeAll);
  };
  return (
    <div className="col-2 profile">
      <div className="profile-top">
        <div className="profile-left">
          <a href="#">
            <i className="fa fa-bell"></i>
          </a>
        </div>
        <div className="profile-right">
          <a href="#">
            <i className="fa fa-user-graduate"></i>
          </a>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-img">
          <img
            src="https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg"
            alt=""
          />
        </div>
        <div className="profile-info">
          <h4>Bombom</h4>
          <p>bomntgch190607@fpt.edu.vn</p>
        </div>
        <div className="profile-change">
          <div className="profile-personal">
            <a href="#" className="profile-view">
              View Profile
            </a>
            <a href="#" className="profile-update">
              Edit Profile
            </a>
          </div>
        </div>
      </div>
      <div className="profile-listpost">
        {countImg.map((item, index) => (
          <a
            href="#index"
            key={index}
            className={`${
              countImg.length % 3 === 0 &&
              (index === 0 || index === countImg.length - 3)
                ? "profile-imgRoundedLeft"
                : ""
            } ${
              countImg.length % 3 === 0 &&
              (index === 2 || index === countImg.length - 1)
                ? "profile-imgRoundedRight"
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
      <div className="profile-seeAllPost">
        <span onClick={handleShortened}>
          {!seeAll && (
            <span>
              <i className="fa fa-long-arrow-alt-left"></i> Shortened
            </span>
          )}
        </span>
        <span onClick={handleSeeAllPost}>
          {seeAll && (
            <span>
              See all <i className="fa fa-long-arrow-alt-right"></i>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default Profile;
