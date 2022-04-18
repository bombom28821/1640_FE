import React, { useEffect } from "react";
import Sidebar from "../component/sidebar/Sidebar";
import Content from "../component/content/Content";
import Profile from "../component/profile/Profile";
import axios from "../api/axios";
import useAuth from "../hook/useAuth";

const Home = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  return (
    <div className="body row mx-0">
      <Sidebar></Sidebar>
      <Content></Content>
      <Profile></Profile>
    </div>
  );
};

export default Home;
