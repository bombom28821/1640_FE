import React from "react";
import "./createPostStyle.css";
const CreatePost = (props) => {
  return (
    <>
      <div className="content-createPost">
        <div className="content-statusPost">
          <div className="content-statusUser">
            <img
              src="https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg"
              alt=""
            />
          </div>
          <div
            className="content-statusContent"
            onClick={() => props.setCreateIdea(true)}
          >
            <span>Do you want to create idea?</span>
          </div>
        </div>
        <div className="content-statusLink">
          <div
            className="content-statusFile"
            onClick={() => {
              props.setCreateIdea(true);
              props.setImage(true);
            }}
          >
            <i className="fa fa-images"></i> <span>Image</span>
          </div>
          <div
            className="content-statusFile"
            onClick={() => {
              props.setCreateIdea(true);
              props.setFile(true);
            }}
          >
            <i className="fa fa-file-image"></i> <span>File</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
