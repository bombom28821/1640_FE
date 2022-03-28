import React from "react";
import Post from "./Post";

const ListPost = ({ posts }) => {
  return (
    <div className="content-listpost">
      {posts.length > 0 &&
        posts.map((post, index) => <Post post={post} key={index}></Post>)}
    </div>
  );
};

export default ListPost;
