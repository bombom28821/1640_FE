import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import ListPhotos from "./listPhotos/ListPhotos";
import CreatePost from "../content/createPost/CreatePost";
import "./personalPageStyle.css";
import Overlay from "../overlay/Overlay";
import CreateContentPost from "../content/createPost/CreateContentPost";
import ListPost from "../content/posts/ListPost";
import axios from "../../api/axios";
import useAuth from "../../hook/useAuth";
import { NavLink } from "react-router-dom";
const PersonalPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const positionLoad = useRef(null);
  const [createIdea, setCreateIdea] = useState(false);
  const [image, setImage] = useState(false);
  const [file, setFile] = useState(false);
  const nodeRef = useRef();
  const scrollRef = useRef();
  const [scrollPhoto, setScrollPhoto] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  useEffect(() => {
    const deleteBtn = document.querySelector(".createContentPost-deletePost");
    const handleClickOutSide = (e) => {
      if (createIdea && !nodeRef.current?.contains(e.target)) {
        setCreateIdea(false);
        document.body.classList.remove("active");
      } else if (createIdea && deleteBtn.contains(e.target)) {
        setCreateIdea(false);
        document.body.classList.remove("active");
      }
    };
    if (createIdea) {
      document.addEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [createIdea]);
  useEffect(() => {
    async function fecthData() {
      setLoading(true);
      try {
        const response = await axios.get(`/idea?page=${page}`);
        if (response.data) {
          setTimeout(() => {
            setPosts([...posts, ...response.data.data]);
            setLoading(false);
          }, 300);
        }
      } catch (error) {
        setLoading(false);
        console.log(`The error happend ${error}`);
      }
    }
    fecthData();
  }, [page]);
  useEffect(() => {
    let positionBefore;
    const handleScroll = () => {
      const position = positionLoad.current.getBoundingClientRect();
      if (
        window.innerHeight - position.bottom < 10 &&
        window.innerHeight - position.bottom > 0 &&
        window.scrollY >= positionBefore
      ) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }
      positionBefore = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    if (loadMore) {
      setPage(page + 1);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore]);
  useEffect(() => {
    if (scrollPhoto) {
      scrollRef.current.classList.add("photo-scroll");
    } else {
      scrollRef.current.classList.remove("photo-scroll");
    }
    return () => {};
  }, [scrollPhoto]);
  return (
    <div className="personalPage">
      <Navbar></Navbar>
      <div className="personalPage-top">
        <div className="personalPage-topMain">
          <div className="personalPage-topLeft">
            <div className="personalPage-leftAvatar">
              {auth.avatar && (
                <img src={`${auth.url}/${auth.avatar}`} alt="avatarUser" />
              )}
            </div>
            <div className="personalPage-leftUsername">
              <h1>{auth.name}</h1>
              <span>{auth.role}</span>
            </div>
          </div>
          <div className="personalPage-topRight">
            <div
              className="personalPage-rightItem personalPage-rightCreate"
              onClick={() => {
                setCreateIdea(true);
              }}
            >
              <span>
                <i className="fa fa-plus-circle"></i>
              </span>
              <span>Create Post</span>
            </div>
            <NavLink
              to="/edit-profile"
              className="personalPage-rightItem personalPage-rightEdit"
            >
              <span>
                <i className="fa fa-pen"></i>
              </span>
              <span>Edit Profile</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="personalPage-bottom">
        <div className="personalPage-bottomMain">
          <div className="personalPage-bottomLeft">
            <div className="personalPage-bottomLeftMain">
              <div className="personalPage-bottomIntro">
                <div className="personalPage-bottomIntroMain">
                  <h3>Intro</h3>
                  <div className="personalPage-bottomItem">
                    <span>
                      <i className="fa fa-home"></i>
                    </span>
                    <span>Lives in</span>
                    <span>{auth.address}</span>
                  </div>
                  <div className="personalPage-bottomItem">
                    <span>
                      <i className="fa fa-phone"></i>
                    </span>
                    <span>Contacts at</span>
                    <span>{auth.phone}</span>
                  </div>
                  <div className="personalPage-bottomItem">
                    <span>
                      <i className="fa fa-envelope"></i>
                    </span>
                    <span>Sends at</span>
                    <span>{auth.email}</span>
                  </div>
                  <NavLink
                    to="/view-profile"
                    className="personal-bottomIntroView"
                  >
                    <span>View details</span>
                  </NavLink>
                  <NavLink
                    to="/edit-profile"
                    className="personal-bottomIntroEdit"
                  >
                    <span>Edit details</span>
                  </NavLink>
                </div>
              </div>
              <div className="personalPage-bottomPhotos" ref={scrollRef}>
                <div className="personalPage-bottomPhotosMain">
                  <ListPhotos
                    scrollPhoto={scrollPhoto}
                    setScrollPhoto={setScrollPhoto}
                  ></ListPhotos>
                </div>
              </div>
            </div>
          </div>
          <div className="personalPage-bottomRight">
            <CreatePost
              setCreateIdea={setCreateIdea}
              setImage={setImage}
              setFile={setFile}
            ></CreatePost>
            {createIdea && (
              <Overlay>
                <CreateContentPost
                  setCreateIdea={setCreateIdea}
                  image={image}
                  setImage={setImage}
                  file={file}
                  setFile={setFile}
                  posts={posts}
                  setPosts={setPosts}
                  ref={nodeRef}
                ></CreateContentPost>
              </Overlay>
            )}
            {posts.length > 0 && (
              <ListPost posts={posts} setPosts={setPosts}></ListPost>
            )}
            <div
              className="text-center content-loadMore"
              ref={positionLoad}
            ></div>
            <div className="content-loading d-flex justify-content-center fs-3">
              {loading && <i className="fa fa-spinner fa-spin"></i>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
