import React, { useState } from "react";
import Post from "./Post";

const ListPost = ({ posts, setPosts }) => {
  return (
    <div className="content-listpost">
      {posts.length > 0 &&
        posts.map((post, index) => (
          <Post
            post={post}
            key={post.id}
            postIndex={index}
            posts={posts}
            setPosts={setPosts}
          ></Post>
        ))}
    </div>
  );
};

export default ListPost;
