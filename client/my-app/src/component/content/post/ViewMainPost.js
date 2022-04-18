import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import useAuth from "../../../hook/useAuth";
import Overlay from "../../overlay/Overlay";
import EmotionPost from "../emotionPost/EmotionPost";
const URL = "http://localhost:5000";
const ViewMainPost = ({ post }) => {
  const { auth } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [activeLike, setActiveLike] = useState(() => {
    return post.isLiked;
  });
  const [activeDisLike, setActiveDisLike] = useState(() => {
    return post.isDisLiked;
  });
  const [showEmotion, setShowEmotion] = useState("all");
  const [showEmotionUser, setShowEmotionUser] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("40px");
  const [text, setText] = useState("");
  const textareaRef = useRef();
  const [privateComment, setPrivateComment] = useState(false);
  const [comments, setComments] = useState(() => {
    const postComment = JSON.parse(JSON.stringify(post.comment));
    return postComment;
  });
  const [showComments, setShowComments] = useState(false);
  const [showFunction, setShowFunction] = useState(true);
  const [showViewComment, setShowViewComment] = useState(false);
  const [typeViewComment, setTypeViewComment] = useState("Newest");
  const [viewMoreComments, setViewMoreComments] = useState(false);
  //Edit comment
  const [textEdit, setTextEdit] = useState("");
  const [textareaEditHeight, setTextareaEditHeight] = useState("40px");
  const textareaEditRef = useRef();
  const [showEdit, setShowEdit] = useState(false);
  const [idCommentEdit, setIdCommentEdit] = useState("");
  const [privateEditComment, setPrivateEditComment] = useState(false);
  const navigate = useNavigate();
  const countEmotions = post.like.length + post.dislike.length;
  const checkStatus =
    post.like.length + post.dislike.length + post.comment.length;
  const handlePostDelete = (id) => {
    async function Post() {
      try {
        await axios({
          method: "delete",
          url: `/idea?id=${id}`,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    Post();
  };
  //End post
  const handleChangeTextArea = (e) => {
    setText(e.target.value);
    if (textareaRef.current.scrollHeight !== 40) {
      setTextareaHeight("auto");
    }
  };
  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [text]);
  useEffect(() => {
    if (showComments) {
      textareaRef.current.focus();
    }
  }, [showComments]);
  //Handle Like
  const handleLike = () => {
    if (activeLike && activeDisLike === false) {
      const newLike = post.like.filter((user) => user.id !== auth._id);
      post.like = newLike;
    } else if (activeLike === false && activeDisLike === true) {
      const newDislike = post.dislike.filter((user) => user.id !== auth._id);
      post.dislike = newDislike;
      post.like.push(auth);
    } else {
      post.like.push(auth);
    }
    // Call API
    async function Post() {
      try {
        await axios({
          method: "put",
          url: `/idea/like?id=${post.id}`,
        });
      } catch (error) {
        console.log(error);
      }
    }
    Post();
    setActiveLike(!activeLike);
    setActiveDisLike(false);
  };
  //Handle Dislike
  const handleDislike = () => {
    if (activeDisLike && activeLike === false) {
      const newDisike = post.dislike.filter((user) => user.id !== auth._id);
      console.log(newDisike);
      post.dislike = newDisike;
    } else if (activeDisLike === false && activeLike === true) {
      const newLike = post.like.filter((user) => user.id !== auth._id);
      post.like = newLike;
      post.dislike.push(auth);
    } else {
      post.dislike.push(auth);
    }
    // Call API
    async function Post() {
      try {
        await axios({
          method: "put",
          url: `/idea/dislike?id=${post.id}`,
        });
      } catch (error) {
        console.log(error);
      }
    }
    Post();
    setActiveDisLike(!activeDisLike);
    setActiveLike(false);
  };
  const handleComment = () => {
    setShowComments(!showComments);
  };
  const handleShowFunctions = (e) => {
    const ellipsis = document
      .querySelector(".content-post")
      .querySelectorAll(".content-commentContentCircle i");
    ellipsis.forEach((item) => {
      item.classList.remove("active");
    });
    if (showFunction) {
      e.target.classList.add("active");
    }
    setShowFunction(!showFunction);
  };
  const handleOldestComment = () => {
    setTypeViewComment("Oldest");
    setShowViewComment(false);
    setViewMoreComments(false);
    if (typeViewComment !== "Oldest") {
      setComments(comments.reverse());
    }
    if (showComments) {
      textareaRef.current.focus();
    }
  };
  const handleNewestComment = () => {
    setTypeViewComment("Newest");
    setShowViewComment(false);
    setViewMoreComments(false);
    setComments(() => {
      const postComment = JSON.parse(JSON.stringify(post.comment));
      return postComment;
    });
    if (showComments) {
      textareaRef.current.focus();
    }
  };
  const handleAllComment = () => {
    setTypeViewComment("All comments");
    setShowViewComment(false);
    setViewMoreComments(true);
    setComments(() => {
      const postComment = JSON.parse(JSON.stringify(post.comment));
      return postComment;
    });
    if (showComments) {
      textareaRef.current.focus();
    }
  };
  const handleCreateCommentDelete = () => {
    setText("");
    if (showComments) {
      textareaRef.current.focus();
    }
  };
  //Send comment
  const handleSendComment = (idPost, idCategory) => {
    const newComment = {
      id: comments.length + 1,
      content: text,
      private: privateComment,
      time: "now",
      user: {
        name: "Bom Bom",
        avatar:
          "https://i.pinimg.com/236x/1d/f9/25/1df925b514e09c101d5374b7914e7be4.jpg",
        email: "bombom@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        role: "staff",
      },
    };
    const newCommentAPI = {
      content: text,
      private: privateComment,
      category: idCategory,
      idea: idPost,
      //User : id
    };
    // Call API
    async function Post() {
      try {
        await axios({
          method: "post",
          url: "/comment",
          data: newCommentAPI,
        });
      } catch (error) {
        console.log(error);
      }
    }
    Post();
    if (typeViewComment === "Oldest") {
      setComments(() => {
        post.comment.push(newComment);
        comments.push(newComment);
        return comments;
      });
    } else {
      setComments(() => {
        post.comment.unshift(newComment);
        comments.unshift(newComment);
        return comments;
      });
    }
    setText("");
    if (showComments) {
      textareaRef.current.focus();
    }
  };
  //Edit comment
  const handleChangeEditTextArea = (e) => {
    setTextEdit(e.target.value);
    if (textareaEditRef.current.scrollHeight !== 40) {
      setTextareaEditHeight("auto");
    }
  };
  const handleEditComment = (values, id) => {
    setTextEdit(values);
    setShowEdit(true);
    setIdCommentEdit(id);
    setShowFunction(true);
  };
  const handleCommentEditDeleteText = () => {
    setTextEdit("");
    if (showEdit) {
      textareaEditRef.current.focus();
    }
  };
  const handleEditSendComment = (idComment) => {
    console.log(idComment);
    const commentEdit = comments.find((comment) => comment.id === idComment);
    commentEdit.content = textEdit;
    commentEdit.private = privateEditComment;
    const postEdit = post.comment.find((comment) => comment.id === idComment);
    postEdit.content = textEdit;
    postEdit.private = privateEditComment;
    // Call API
    async function Post() {
      try {
        await axios({
          method: "put",
          url: `/comment`,
          data: {
            content: textEdit,
            private: privateEditComment,
            id: idComment,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    Post();
    setShowEdit(false);
  };
  //Delete comment
  const handleDeleteComment = (idComment, idPost) => {
    console.log(idComment);
    const newPostComments = post.comment.filter(
      (comment) => comment.id !== idComment
    );
    post.comment = newPostComments;
    const commentsNew = comments.filter((comment) => comment.id !== idComment);
    //Call API method: delete
    async function Post() {
      try {
        await axios({
          method: "delete",
          url: `/comment`,
          data: { id: idComment, idea: idPost },
        });
      } catch (error) {
        console.log(error);
      }
    }
    Post();
    setComments(commentsNew);
    setShowFunction(true);
  };
  useEffect(() => {
    if (textareaEditRef.current) {
      setTextareaEditHeight(`${textareaEditRef.current.scrollHeight}px`);
    }
  }, [textEdit]);
  useEffect(() => {
    if (showEdit) {
      textareaEditRef.current.focus();
    }
  }, [showEdit]);
  return (
    <div className="content-post">
      <div
        className="content-postEllipsis"
        onClick={() => setShowMenu(!showMenu)}
      >
        <i className="fa fa-ellipsis-h"></i>
      </div>
      {showMenu && (
        <div className="content-postFunction">
          <div className="content-postMainFunction">
            <div
              className="content-postMainItem"
              onClick={() => handlePostDelete(post.id)}
            >
              <span>
                <i className="fa fa-trash-alt"></i>
              </span>
              <span>Delete</span>
            </div>
          </div>
        </div>
      )}
      <div className="content-user">
        <div className="content-avatar">
          <img src={`${URL}/${post.user.avatar}`} alt="user" />
        </div>
        <div className="content-userInfo">
          <h3 className="content-username">{post.user.name}</h3>
          <div className="content-TitleTime">
            <span className="content-currentTime">{post.time}</span>
            <span>{post.private ? <i className="fa fa-lock"></i> : null}</span>
          </div>
        </div>
      </div>
      <div className="content-title">
        <span>{post.content}</span>
        <p className="content-file"></p>
      </div>
      {post.img && (
        <div
          className="content-image"
          style={{
            marginBottom: checkStatus === 0 ? "20px" : "",
          }}
        >
          <img src={`${URL}/${post.img}`} alt="" />
        </div>
      )}

      {checkStatus > 0 ? (
        <div className="content-countStatus">
          <div className="content-countStatusLeft">
            {countEmotions > 0 ? (
              <div className="content-countEmotion">
                {post.like.length > 0 && (
                  <div className="content-countLike">
                    <img
                      src="./images/like.png"
                      alt="like-logo"
                      onClick={() => {
                        setShowEmotionUser(true);
                        setShowEmotion("like");
                      }}
                    />
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
                )}
                {post.dislike.length > 0 && (
                  <div className="content-countDislike">
                    <img
                      src="./images/dislike.png"
                      alt="dislike-logo"
                      onClick={() => {
                        setShowEmotionUser(true);
                        setShowEmotion("dislike");
                      }}
                    />
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
                )}

                <div
                  className="content-countAll"
                  onClick={() => {
                    setShowEmotionUser(true);
                  }}
                >
                  <span>
                    {countEmotions >= 1000
                      ? `${(countEmotions / 1000).toFixed(1)}K`
                      : countEmotions}
                  </span>
                </div>
                {showEmotionUser && (
                  <Overlay>
                    <EmotionPost
                      postEmotion={post}
                      showEmotion={showEmotion}
                      showEmotionUser={showEmotionUser}
                      setShowEmotionUser={setShowEmotionUser}
                    />
                  </Overlay>
                )}
              </div>
            ) : null}
          </div>
          <div className="content-countStatusRight">
            {post.comment.length > 0 ? (
              <span onClick={handleComment}>
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
          onClick={handleDislike}
        >
          <span>
            <i className="fa fa-thumbs-up"></i>
          </span>
          <span>Dislike</span>
        </div>
        <div className="content-statusItem" onClick={handleComment}>
          <span>
            <i className="fa fa-comment"></i>
          </span>
          <span>Comment</span>
        </div>
      </div>
      {showComments && (
        <div className="content-showComments">
          {comments.length > 0 && (
            <div className="content-commentChooseView">
              <p>
                <span onClick={() => setShowViewComment(!showViewComment)}>
                  <span>{typeViewComment}</span>
                  <i className="fa fa-caret-down"></i>
                </span>
              </p>
              {showViewComment && (
                <div className="content-commentShowChooseView">
                  <div className="content-commentShowChooseViewContent">
                    <div
                      className="content-commentViewItem"
                      onClick={handleOldestComment}
                    >
                      <span>Oldest</span>
                      <p>Show comments with the oldest comments first</p>
                    </div>
                    <div
                      className="content-commentViewItem"
                      onClick={handleNewestComment}
                    >
                      <span>Newest</span>
                      <p>Show comments with the newest comments first</p>
                    </div>
                    <div
                      className="content-commentViewItem"
                      onClick={handleAllComment}
                    >
                      <span>All comments</span>
                      <p>Show all comments with the newest comments first</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
                {text && (
                  <ul>
                    <li onClick={handleCreateCommentDelete}>
                      <span>
                        <i className="fa fa-times"></i>
                      </span>
                      <div className="content-createCommentDelete">
                        <p>Delete content</p>
                      </div>
                    </li>
                    <li onClick={() => setPrivateComment(!privateComment)}>
                      {privateComment ? (
                        <span>
                          <i className="fa fa-lock"></i>
                          <div className="content-createCommentLock">
                            <p>Private comment</p>
                          </div>
                        </span>
                      ) : (
                        <span>
                          <i className="fa fa-lock-open"></i>
                          <div className="content-createCommentOpenLock">
                            <p>Public comment</p>
                          </div>
                        </span>
                      )}
                    </li>
                    <li
                      onClick={() => handleSendComment(post.id, post.category)}
                    >
                      <span>
                        <i className="fa fa-location-arrow"></i>
                      </span>
                      <div className="content-createCommentSend">
                        <p>Send comment</p>
                      </div>
                    </li>
                  </ul>
                )}
              </form>
            </div>
          </div>
          {comments.length > 0 && (
            <div className="content-listComments">
              {viewMoreComments
                ? comments.map((comment, index) => (
                    <div className="content-comment" key={`${comment.id}`}>
                      <div className="content-commentUser">
                        <img
                          src={comment.user.avatar}
                          alt={comment.user.name}
                        />
                        <div className="content-infoUserComment">
                          <div className="content-infoUserCommentImg">
                            <img
                              src={comment.user.avatar}
                              alt={comment.user.name}
                            />
                          </div>
                          <div className="content-infoUserCommentContent">
                            <div className="content-infoUserCommentName">
                              <span>{comment.user.name}</span>
                            </div>
                            <div className="content-infoUserCommentMain">
                              <div className="content-infoUserCommentTitle">
                                <span>
                                  <i className="fa fa-bullseye"></i>
                                </span>
                                <span>
                                  Position by <span>{comment.user.role}</span>
                                </span>
                              </div>
                              <div className="content-infoUserCommentTitle">
                                <span>
                                  <i className="fa fa-home"></i>
                                </span>
                                <span>
                                  Live in <span>{comment.user.address}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {showEdit && comment.id === idCommentEdit ? (
                        <div className="content-commentEdit">
                          <form action="">
                            <div className="content-commentEditMain">
                              <textarea
                                placeholder="Edit comment..."
                                ref={textareaEditRef}
                                value={textEdit}
                                onChange={handleChangeEditTextArea}
                                style={{
                                  height: textareaEditHeight,
                                }}
                              ></textarea>
                              <span onClick={() => setShowEdit(false)}>
                                Cancel
                              </span>
                            </div>
                            {textEdit && (
                              <ul>
                                <li onClick={handleCommentEditDeleteText}>
                                  <span>
                                    <i className="fa fa-times"></i>
                                  </span>
                                  <div className="content-commentEditDeleteText">
                                    <p>Delete content</p>
                                  </div>
                                </li>
                                <li
                                  onClick={() =>
                                    setPrivateEditComment(!privateComment)
                                  }
                                >
                                  {privateEditComment ? (
                                    <span>
                                      <i className="fa fa-lock"></i>
                                      <div className="content-commentEditLock">
                                        <p>Private comment</p>
                                      </div>
                                    </span>
                                  ) : (
                                    <span>
                                      <i className="fa fa-lock-open"></i>
                                      <div className="content-commentEditOpenLock">
                                        <p>Public comment</p>
                                      </div>
                                    </span>
                                  )}
                                </li>
                                <li
                                  onClick={() =>
                                    handleEditSendComment(comment.id)
                                  }
                                >
                                  <span>
                                    <i className="fa fa-check"></i>
                                  </span>
                                  <div className="content-commentEditSend">
                                    <p>Edit comment</p>
                                  </div>
                                </li>
                              </ul>
                            )}
                          </form>
                        </div>
                      ) : (
                        <div className="content-commentContent">
                          <div className="content-commentContentUser">
                            <span>
                              {comment.user.name}
                              <div className="content-infoUserComment">
                                <div className="content-infoUserCommentImg">
                                  <img
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                  />
                                </div>
                                <div className="content-infoUserCommentContent">
                                  <div className="content-infoUserCommentName">
                                    <span>{comment.user.name}</span>
                                  </div>
                                  <div className="content-infoUserCommentMain">
                                    <div className="content-infoUserCommentTitle">
                                      <span>
                                        <i className="fa fa-bullseye"></i>
                                      </span>
                                      <span>
                                        Position by{" "}
                                        <span>{comment.user.role}</span>
                                      </span>
                                    </div>
                                    <div className="content-infoUserCommentTitle">
                                      <span>
                                        <i className="fa fa-home"></i>
                                      </span>
                                      <span>
                                        Live in{" "}
                                        <span>{comment.user.address}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </span>
                            <span>&bull; {comment.time}</span>
                          </div>
                          <div className="content-commentContentTitle">
                            <p>{comment.content}</p>
                            <div className="content-commentContentEllipsis">
                              <div className="content-commentContentEllipsisMain">
                                <div className="content-commentContentCircle">
                                  <i
                                    className="fa fa-ellipsis-h"
                                    onClick={handleShowFunctions}
                                  ></i>
                                  <div className="content-commentFunction">
                                    <ul>
                                      <li
                                        onClick={() =>
                                          handleEditComment(
                                            comment.content,
                                            comment.id
                                          )
                                        }
                                      >
                                        Edit
                                      </li>
                                      <li
                                        onClick={() =>
                                          handleDeleteComment(
                                            comment.id,
                                            post.id
                                          )
                                        }
                                      >
                                        Delete
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="content-commentArrow"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {comment.private && (
                            <div className="content-commentHidden">
                              <i className="fa fa-lock"></i>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                : comments.slice(0, 2).map((comment, index) => (
                    <div className="content-comment" key={comment.id}>
                      <div className="content-commentUser">
                        <img
                          src={comment.user.avatar}
                          alt={comment.user.name}
                        />
                        <div className="content-infoUserComment">
                          <div className="content-infoUserCommentImg">
                            <img
                              src={comment.user.avatar}
                              alt={comment.user.name}
                            />
                          </div>
                          <div className="content-infoUserCommentContent">
                            <div className="content-infoUserCommentName">
                              <span>{comment.user.name}</span>
                            </div>
                            <div className="content-infoUserCommentMain">
                              <div className="content-infoUserCommentTitle">
                                <span>
                                  <i className="fa fa-bullseye"></i>
                                </span>
                                <span>
                                  Position by <span>{comment.user.role}</span>
                                </span>
                              </div>
                              <div className="content-infoUserCommentTitle">
                                <span>
                                  <i className="fa fa-home"></i>
                                </span>
                                <span>
                                  Live in <span>{comment.user.address}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {showEdit && comment.id === idCommentEdit ? (
                        <div className="content-commentEdit">
                          <form action="">
                            <div className="content-commentEditMain">
                              <textarea
                                placeholder="Edit comment..."
                                ref={textareaEditRef}
                                value={textEdit}
                                onChange={handleChangeEditTextArea}
                                style={{
                                  height: textareaEditHeight,
                                }}
                              ></textarea>
                              <span onClick={() => setShowEdit(false)}>
                                Cancel
                              </span>
                            </div>
                            {textEdit && (
                              <ul>
                                <li onClick={handleCommentEditDeleteText}>
                                  <span>
                                    <i className="fa fa-times"></i>
                                  </span>
                                  <div className="content-commentEditDeleteText">
                                    <p>Delete content</p>
                                  </div>
                                </li>
                                <li
                                  onClick={() =>
                                    setPrivateEditComment(!privateComment)
                                  }
                                >
                                  {privateEditComment ? (
                                    <span>
                                      <i className="fa fa-lock"></i>
                                      <div className="content-commentEditLock">
                                        <p>Private comment</p>
                                      </div>
                                    </span>
                                  ) : (
                                    <span>
                                      <i className="fa fa-lock-open"></i>
                                      <div className="content-commentEditOpenLock">
                                        <p>Public comment</p>
                                      </div>
                                    </span>
                                  )}
                                </li>
                                <li
                                  onClick={() =>
                                    handleEditSendComment(comment.id)
                                  }
                                >
                                  <span>
                                    <i className="fa fa-check"></i>
                                  </span>
                                  <div className="content-commentEditSend">
                                    <p>Edit comment</p>
                                  </div>
                                </li>
                              </ul>
                            )}
                          </form>
                        </div>
                      ) : (
                        <div className="content-commentContent">
                          <div className="content-commentContentUser">
                            <span>
                              {comment.user.name}
                              <div className="content-infoUserComment">
                                <div className="content-infoUserCommentImg">
                                  <img
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                  />
                                </div>
                                <div className="content-infoUserCommentContent">
                                  <div className="content-infoUserCommentName">
                                    <span>{comment.user.name}</span>
                                  </div>
                                  <div className="content-infoUserCommentMain">
                                    <div className="content-infoUserCommentTitle">
                                      <span>
                                        <i className="fa fa-bullseye"></i>
                                      </span>
                                      <span>
                                        Position by
                                        <span>{comment.user.role}</span>
                                      </span>
                                    </div>
                                    <div className="content-infoUserCommentTitle">
                                      <span>
                                        <i className="fa fa-home"></i>
                                      </span>
                                      <span>
                                        Live in
                                        <span>{comment.user.address}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </span>
                            <span>&bull; {comment.time}</span>
                          </div>
                          <div className="content-commentContentTitle">
                            <p>{comment.content}</p>
                            <div className="content-commentContentEllipsis">
                              <div className="content-commentContentEllipsisMain">
                                <div className="content-commentContentCircle">
                                  <i
                                    className="fa fa-ellipsis-h"
                                    onClick={handleShowFunctions}
                                  ></i>
                                  <div className="content-commentFunction">
                                    <ul>
                                      <li
                                        onClick={() =>
                                          handleEditComment(
                                            comment.content,
                                            comment.id
                                          )
                                        }
                                      >
                                        Edit
                                      </li>
                                      <li
                                        onClick={() =>
                                          handleDeleteComment(
                                            comment.id,
                                            post.id
                                          )
                                        }
                                      >
                                        Delete
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="content-commentArrow"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {comment.private && (
                            <div className="content-commentHidden">
                              <i className="fa fa-lock"></i>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              {comments.length > 2 && !viewMoreComments && (
                <div
                  className="content-viewMoreComents"
                  onClick={() => setViewMoreComments(true)}
                >
                  <span>View more comments</span>
                  <span>{`2 of ${comments.length}`}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMainPost;
