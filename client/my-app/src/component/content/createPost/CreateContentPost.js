import axios from "../../../api/axios";
import React, { useEffect, useRef, useState } from "react";
import "./createContentPostStyle.css";
import useAuth from "../../../hook/useAuth";
import Overlay from "../../overlay/Overlay";
import Terms from "../../terms/Terms";
const CreateContentPost = (props, ref) => {
  const [upload, setUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadFile, setUploadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);
  const inputFileRef = useRef(null);
  const [text, setText] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [positionHeightTextarea, setPositionHeightTextarea] = useState(0);
  const [chooseStatus, setChooseStatus] = useState(false);
  const [status, setStatus] = useState("public");
  const [postText, setPostText] = useState(false);
  const [postFile, setPostFile] = useState(false);
  const [postImage, setPostImage] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);
  const [newPost, setNewPost] = useState([]);
  //check Terms
  const [clickTerm, setClickTerm] = useState(false);
  const textareaRef = useRef();
  const post = postText || postFile || postImage;
  const { auth } = useAuth();
  const handlePost = (e) => {
    if (!post) {
      e.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("img", selectedImage ? selectedImage : null);
      formData.append("file", selectedFile ? selectedFile : null);
      formData.append("content", text);
      formData.append("private", status === "private" ? true : false);
      formData.append("category", auth.category);
      async function Post() {
        try {
          const response = await axios({
            method: "post",
            url: "/idea",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
          const idea = {
            id: response.data._id,
            time: "now",
            content: text,
            comment: [],
            like: [],
            dislike: [],
            isDisLiked: false,
            isLiked: false,
            private: status === "private" ? true : false,
            img: response.data.img,
            user: auth,
          };
          document.body.classList.remove("active");
          props.posts.unshift(idea);
          props.setPosts(props.posts);
          props.setCreateIdea(false);
          setNewPost(response);
        } catch (error) {
          console.log(error);
        }
      }
      Post();
    }
  };
  const handleChangeTextArea = (e) => {
    setPostText(e.target.value.length > 0 ? true : false);
    setText(e.target.value);
    setTextareaHeight("auto");
    setPositionHeightTextarea(textareaRef.current.scrollHeight);
  };
  useEffect(() => {
    if (textareaRef.current.scrollHeight < 200) {
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    } else {
      setTextareaHeight("200px");
    }
  }, [text]);
  const handleUpload = () => {
    inputRef.current.click();
  };
  const handleClickFile = () => {
    inputFileRef.current.click();
  };
  const handleFile = () => {
    setUploadFile(true);
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setPostFile(file ? true : false);
    setSelectedFile(file);
    e.target.value = null;
  };
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    setPostImage(file ? true : false);
    file.image = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(file);
    e.target.value = null;
  };
  const handleImage = () => {
    setUpload(true);
  };
  const handleChooseStatus = () => {
    setChooseStatus(true);
  };
  const handleTerm = (e) => {
    if (e.target.checked) {
      setClickTerm(true);
    }
    setCheckTerm(e.target.checked);
  };
  useEffect(() => {
    return () => {
      selectedImage && URL.revokeObjectURL(selectedImage.image);
    };
  }, [selectedImage]);
  useEffect(() => {
    setUpload(props.image);
    setUploadFile(props.file);
  }, [props.file, props.image]);
  return (
    <div className="createContentPost" ref={ref}>
      <div
        className="createContentPost-term"
        style={{
          opacity: clickTerm ? 1 : 0,
          visibility: clickTerm ? "visible" : "hidden",
        }}
      >
        <Overlay>
          <Terms
            setCheckTerm={setCheckTerm}
            setClickTerm={setClickTerm}
          ></Terms>
        </Overlay>
      </div>
      <div
        className="createContentPost-chooseStatus"
        style={{
          display: chooseStatus ? "block" : "none",
        }}
      >
        <div className="createContentPost-chooseStatusMain">
          <div
            className="createContentPost-chooseStatusBack"
            onClick={() => setChooseStatus(false)}
          >
            <i className="fa fa-arrow-left"></i>
          </div>
          <h2>Choose Status</h2>
          <div className="createContentPost-titleStatus">
            <span>Who can see your posts?</span>
            <p>Your posts will appear in Feed, on the profile.</p>
          </div>
          <div className="createContentPost-statusOject">
            <div
              className={`createContentPost-statusItem ${
                status === "public" ? "createContentPost-statusItemActive" : ""
              }`}
              onClick={() => {
                setStatus("public");
                setChooseStatus(false);
              }}
            >
              <div className="createContentPost-statusItemLeft">
                <span>
                  <i className="fa fa-globe-asia"></i>
                </span>
              </div>
              <div className="createContentPost-statusItemRight">
                <div className="createContentPost-statusInfo">
                  <p>Public</p>
                  <p>Anyone on or off Facebook</p>
                </div>
                <div className="createContentPost-check">
                  <input
                    type="radio"
                    name="public"
                    checked={status === "public" ? true : false}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div
              className={`createContentPost-statusItem ${
                status === "private" ? "createContentPost-statusItemActive" : ""
              }`}
              onClick={() => {
                setStatus("private");
                setChooseStatus(false);
              }}
            >
              <div className="createContentPost-statusItemLeft">
                <span>
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <div className="createContentPost-statusItemRight">
                <div className="createContentPost-statusInfo">
                  <p>Private</p>
                  <p>Posts will be made anonymously to everyone</p>
                </div>
                <div className="createContentPost-check">
                  <input
                    type="radio"
                    name="private"
                    checked={status === "private" ? true : false}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="createContentPost-mainContent">
        <h2>Create idea</h2>
        <div className="createContentPost-main">
          <div className="createContentPost-top">
            <div className="createContentPost-topLeft">
              <div className="createContentPost-imgUser">
                <img src={`${auth.url}/${auth.avatar}`} alt="avatar" />
              </div>
              <div className="createContentPost-info">
                <p>{auth.name}</p>
                <div
                  className="createContentPost-status"
                  onClick={handleChooseStatus}
                >
                  <i className="fa fa-globe-asia"></i>
                  <span>{status}</span>
                  <i className="fa fa-sort-down"></i>
                </div>
              </div>
            </div>
            <div className="createContentPost-topRight">
              <span>Bussiness</span>
            </div>
          </div>
          <div className="createContentPost-title">
            <textarea
              placeholder="What's on your mind?"
              value={text}
              onChange={handleChangeTextArea}
              ref={textareaRef}
              style={{
                height: textareaHeight,
                overflow: positionHeightTextarea > 121 ? "visible" : "hidden",
              }}
            ></textarea>
          </div>
          <div
            className="createContentPost-file"
            style={{
              display: uploadFile ? "block" : "none",
            }}
          >
            <div
              className="createContentPost-fileContent"
              onClick={handleClickFile}
            >
              {selectedFile ? (
                <div className="createContentPost-fileUpload">
                  <div className="createContentPost-fileUpLoadLeft">
                    <span>
                      <i className="fa fa-file-archive"></i>
                    </span>
                  </div>
                  <div className="createContentPost-fileUpLoadRight">
                    <span>{selectedFile.name}</span>
                    <span>{(selectedFile.size / 1024).toFixed(2)}KB</span>
                  </div>
                </div>
              ) : (
                <div className="createContentPost-bgUploadFile">
                  <div className="createContentPost-positionAddFile">
                    <div className="createContentPost-positionAddFileMain">
                      <span>
                        <i className="fa fa-file-archive"></i>
                      </span>
                      <p>Add File</p>
                    </div>
                  </div>
                </div>
              )}
              <input
                type="file"
                name="file"
                hidden
                ref={inputFileRef}
                onChange={handleChangeFile}
              />
            </div>
            <div
              className="createContentPost-fileDelete"
              onClick={() => {
                setPostFile(false);
                setUploadFile(false);
                setSelectedFile(null);
                props.setFile(false);
              }}
            >
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div
            className="createContentPost-image"
            style={{
              display: upload ? "block" : "none",
            }}
          >
            <div
              className="createContentPost-imageContent"
              onClick={handleUpload}
            >
              {selectedImage ? (
                <div className="createContentPost-img">
                  <img src={selectedImage.image} alt="" />
                </div>
              ) : (
                <div className="createContentPost-uploadImg">
                  <div className="createContentPost-addImg">
                    <span>
                      <i className="fa fa-camera-retro"></i>
                    </span>
                    <p>Add Image</p>
                  </div>
                </div>
              )}
              <input
                type="file"
                name="image"
                hidden
                ref={inputRef}
                onChange={handleChangeImg}
              />
            </div>
            <div
              className="createContentPost-imageDelete"
              onClick={() => {
                setPostImage(false);
                setUpload(false);
                setSelectedImage(null);
                props.setImage(false);
              }}
            >
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div className="createContentPost-bottom">
            <div className="createContentPost-addFile">
              <p>Add to post</p>
              <div className="createContentPost-addContentFile">
                <span
                  onClick={handleImage}
                  className={`${upload ? "createContentPost-imageActive" : ""}`}
                >
                  <i className="fa fa-images"></i>
                </span>
                <span
                  onClick={handleFile}
                  className={`${
                    uploadFile ? "createContentPost-fileActive" : ""
                  }`}
                >
                  <i className="fa fa-file-image"></i>
                </span>
              </div>
            </div>
            <div className="createContentPost-terms">
              <input
                type="checkbox"
                value={checkTerm}
                checked={checkTerm}
                onChange={(e) => handleTerm(e)}
              />
              <span>
                Accept our{" "}
                <span
                  onClick={() => {
                    setClickTerm(true);
                  }}
                >
                  terms and conditions
                </span>
              </span>
            </div>
            <div className="createContentPost-post">
              <button
                onClick={handlePost}
                className={`${post && checkTerm ? "active" : ""}`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="createContentPost-deletePost">
          <i className="fa fa-times"></i>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(CreateContentPost);
