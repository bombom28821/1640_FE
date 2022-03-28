import React, { useEffect, useRef, useState } from "react";
import "./postStyle.css";
const Post = ({ post }) => {
  const [activeLike, setActiveLike] = useState(false);
  const [activeDisLike, setActiveDisLike] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("36px");
  const [text, setText] = useState("");
  const textareaRef = useRef();
  const countEmotions = post.like.length + post.dislike.length;
  const checkStatus =
    post.like.length + post.dislike.length + post.comment.length;
  const handleChangeTextArea = (e) => {
    setText(e.target.value);
    console.log(textareaRef.current.scrollHeight);
    console.log(textareaRef.current.scrollTop);
    if (textareaRef.current.scrollHeight !== 40) {
      setTextareaHeight("auto");
    }
  };
  useEffect(() => {
    setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
  }, [text]);
  const handleLike = () => {
    setActiveLike(!activeLike);
    setActiveDisLike(false);
  };
  const handleUnLike = () => {
    setActiveDisLike(!activeDisLike);
    setActiveLike(false);
  };
  const handleComment = () => {
    console.log("Comment");
  };
  return (
    <div className="content-post">
      <div className="content-user">
        <div className="content-avatar">
          <img src={post.user.image} alt="user" />
        </div>
        <div className="content-userInfo">
          <h3 className="content-username">{post.user.name}</h3>
          <span className="content-currentTime">{post.time}</span>
        </div>
      </div>
      <div className="content-title">
        <span>{post.content}</span>
        <p className="content-file"></p>
      </div>
      <div
        className="content-image"
        style={{
          marginBottom: checkStatus === 0 ? "20px" : "",
        }}
      >
        <img src={post.image} alt="" />
      </div>
      {checkStatus > 0 ? (
        <div className="content-countStatus">
          <div className="content-countStatusLeft">
            {countEmotions > 0 ? (
              <div className="content-countEmotion">
                <div className="content-countLike">
                  <img src="./images/like.png" alt="like-logo" />
                  <div className="content-listUserLike">
                    <p>Like</p>
                    {post.like.length > 0 &&
                      post.like
                        .slice(0, 9)
                        .map((user, index) => (
                          <span key={index}>
                            {user.name.length > 19
                              ? `${user.name.slice(0, 19)}...`
                              : user.name}
                          </span>
                        ))}
                    {post.like.length > 11 ? (
                      <span>{`and ${post.like.length - 11} more...`}</span>
                    ) : null}
                  </div>
                </div>
                <div className="content-countDislike">
                  <img src="./images/dislike.png" alt="dislike-logo" />
                  <div className="content-listUserDislike">
                    <p>Dislike</p>
                    {post.dislike.length > 0 &&
                      post.dislike
                        .slice(0, 9)
                        .map((user, index) => (
                          <span key={index}>
                            {user.name.length > 19
                              ? `${user.name.slice(0, 19)}...`
                              : user.name}
                          </span>
                        ))}
                    {post.dislike.length > 11 ? (
                      <span>{`and ${post.dislike.length - 11} more...`}</span>
                    ) : null}
                  </div>
                </div>
                <div className="content-countAll">
                  <span>
                    {countEmotions >= 1000
                      ? `${(countEmotions / 1000).toFixed(1)}K`
                      : countEmotions}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="content-countStatusRight">
            {post.comment.length > 0 ? (
              <span>
                {post.comment.length === 1
                  ? `${post.comment.length} comment`
                  : post.comment.length > 1
                  ? `${post.comment.length} comments`
                  : null}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="content-line"></div>
      <div className="content-status content-statusLine">
        <div
          className={`content-statusItem ${activeLike ? "active" : ""}`}
          onClick={handleLike}
        >
          <span>
            <i className="fa fa-thumbs-up"></i>
          </span>
          <span>Like</span>
        </div>
        <div
          className={`content-statusItem ${activeDisLike ? "active" : ""}`}
          onClick={handleUnLike}
        >
          <span>
            <i className="fa fa-thumbs-up"></i>
          </span>
          <span>Unlike</span>
        </div>
        <div className="content-statusItem" onClick={handleComment}>
          <span>
            <i className="fa fa-comment"></i>
          </span>
          <span>Comment</span>
        </div>
      </div>
      <div className="content-showComments">
        <div className="content-createComment">
          <div className="content-createCommentUser">
            <img
              src="https://images.unsplash.com/photo-1536148020659-4dde4128f8ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhlJTIwaGFuZHNvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt="user-comment"
            />
          </div>
          <div className="content-createCommentContent">
            <form action="">
              <div className="content-createCommentMain">
                <textarea
                  placeholder="Write a comment..."
                  ref={textareaRef}
                  value={text}
                  onChange={handleChangeTextArea}
                  style={{
                    height: textareaHeight,
                  }}
                ></textarea>
              </div>
              <ul>
                <li>
                  <span>
                    <i className="fa fa-times"></i>
                  </span>
                  <div className="content-createCommentDelete">
                    <p>Delete content</p>
                  </div>
                </li>
                <li>
                  <span>
                    <i className="fa fa-location-arrow"></i>
                  </span>
                  <div className="content-createCommentSend">
                    <p>Send comment</p>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="content-listComments">
          <div className="content-comment">
            <div className="content-commentUser">
              <img
                src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aGFuZHNvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt="user1-logo"
              />
            </div>
            <div className="content-commentContent">
              <div className="content-commentContentUser">
                <p>Trâm Anh</p>
              </div>
              <div className="content-commentContentTitle">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolorem, rem!
                </p>
              </div>
            </div>
          </div>
          <div className="content-comment">
            <div className="content-commentUser">
              <img
                src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aGFuZHNvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt="user1-logo"
              />
            </div>
            <div className="content-commentContent">
              <div className="content-commentContentUser">
                <p>Trâm Anh</p>
              </div>
              <div className="content-commentContentTitle">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolorem, rem!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
