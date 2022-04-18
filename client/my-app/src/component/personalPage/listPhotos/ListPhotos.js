import React, { useRef, useState } from "react";
import "./listPhotosStyle.css";
const arrayTemp = Array(21).fill(null);
const ListPhotos = (props) => {
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
    props.setScrollPhoto(!props.scrollPhoto);
  };
  return (
    <div ref={photoRef}>
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
  );
};

export default ListPhotos;
