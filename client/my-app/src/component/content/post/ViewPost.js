import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hook/useAuth";
import Profile from "../../profile/Profile";
import Sidebar from "../../sidebar/Sidebar";
import ViewMainPost from "./ViewMainPost";
import "./viewPostStyle.css";
const userFake = {
  id: "624ee563c744dc6dfe7ed50e",
  content: "This post is very good 11",
  file: null,
  img: "public/avatar/main.jpg",
  isDisLiked: false,
  isLiked: false,
  comment: [],
  like: [{ _id: "62264f08462fd625b6cea4df", name: "Tommy Shelby" }],
  dislike: [],
  time: "2  days ago",
  user: {
    _id: "62264f08462fd625b6cea4df",
    name: "Tommy Shelby",
    avatar: "public/avatar/admin.jpg",
  },
};
const ViewPost = () => {
  const [post, setPost] = useState(userFake);
  const { setAuth } = useAuth();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  useEffect(() => {
    // async function fecthData() {
    //   try {
    //     const response = await axios.get(`/idea`);
    //     if (response.data) {
    //       setPost(response.data);
    //     }
    //   } catch (error) {
    //     console.log(`The error happend ${error}`);
    //   }
    // }
    // fecthData();
  }, []);
  return (
    <div className="body row mx-0">
      <Sidebar></Sidebar>
      <div className="col-8 viewPost">
        <div className="content-main">
          <ViewMainPost post={post}></ViewMainPost>
        </div>
      </div>
      <Profile></Profile>
    </div>
  );
};

export default ViewPost;
