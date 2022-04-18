import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../../hook/useAuth";
import "./emotionPostStyle.css";

const EmotionPost = ({
  postEmotion,
  showEmotion,
  showEmotionUser,
  setShowEmotionUser,
}) => {
  const [emotions, setEmotions] = useState(() => {
    const copyLike = JSON.parse(JSON.stringify(postEmotion.like));
    const copyDislike = JSON.parse(JSON.stringify(postEmotion.dislike));
    return [...copyLike, ...copyDislike];
  });
  const [active, setActive] = useState("post-emotionAll");
  const { auth } = useAuth();
  const nodeMainRef = useRef();

  const handleClickEmotion = (className) => {
    setActive(className);
    const copyLikeTemp = JSON.parse(JSON.stringify(postEmotion.like));
    const copyDislikeTemp = JSON.parse(JSON.stringify(postEmotion.dislike));
    if (className === "post-emotionAll") {
      setEmotions([...copyLikeTemp, ...copyDislikeTemp]);
    } else if (className === "post-emotionLike") {
      setEmotions(copyLikeTemp);
    } else if (className === "post-emotionDislike") {
      setEmotions(copyDislikeTemp);
    }
  };
  useEffect(() => {
    if (showEmotion === "like") {
      const copyLikeTemp = JSON.parse(JSON.stringify(postEmotion.like));
      setEmotions(copyLikeTemp);
      setActive("post-emotionLike");
    } else if (showEmotion === "dislike") {
      const copyDislikeTemp = JSON.parse(JSON.stringify(postEmotion.dislike));
      setEmotions(copyDislikeTemp);
      setActive("post-emotionDislike");
    }
  }, []);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (showEmotionUser && !nodeMainRef.current?.contains(e.target)) {
        document.body.classList.remove("active");
        setShowEmotionUser(false);
      }
    };
    if (showEmotionUser) {
      document.addEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [setShowEmotionUser, showEmotionUser]);
  return (
    <div className="post-emotion" ref={nodeMainRef}>
      <div className="post-emotionContent">
        <div className="post-emotionCount">
          <div className="post-emotionCountContent">
            <div
              className={`post-emotionItem post-emotionAll ${
                active === "post-emotionAll" ? "active" : ""
              }`}
              onClick={() => handleClickEmotion("post-emotionAll")}
            >
              <span>All</span>
            </div>
            <div
              className={`post-emotionItem post-emotionLike ${
                active === "post-emotionLike" ? "active" : ""
              }`}
              onClick={() => handleClickEmotion("post-emotionLike")}
            >
              <img src="./images/like.png" alt="like-logo" />
              <span>{postEmotion.like.length}</span>
            </div>
            <div
              className={`post-emotionItem post-emotionDislike ${
                active === "post-emotionDislike" ? "active" : ""
              }`}
              onClick={() => handleClickEmotion("post-emotionDislike")}
            >
              <img src="./images/dislike.png" alt="dislike-logo" />
              <span>{postEmotion.dislike.length}</span>
            </div>
          </div>
        </div>
        <div className="post-emotionList">
          {emotions.map((emotion, index) => (
            <div className="post-emotionUser" key={index}>
              <div className="post-emotionImg">
                <img src={`${auth.url}/${emotion.avatar}`} alt={emotion.name} />
                <div className="post-emotionStatus">
                  <img
                    src={
                      postEmotion.like.find((user) => user.id === emotion.id)
                        ? "./images/like.png"
                        : "./images/dislike.png"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="post-name">
                <span>{emotion.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="post-emotionDelete"
        onClick={() => {
          setShowEmotionUser(false);
          document.body.classList.remove("active");
        }}
      >
        <i className="fa fa-times"></i>
      </div>
    </div>
  );
};

export default EmotionPost;
