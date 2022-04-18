import React, { useEffect, useRef, useState } from "react";
import "./Content.css";
import axios from "../../api/axios";
import ListPost from "./posts/ListPost";
import CreatePost from "./createPost/CreatePost";
import Overlay from "../overlay/Overlay";
import CreateContentPost from "./createPost/CreateContentPost";
import Navbar from "../navbar/Navbar";
const Content = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const positionLoad = useRef(null);
  const [createIdea, setCreateIdea] = useState(false);
  const [image, setImage] = useState(false);
  const [file, setFile] = useState(false);
  const [filter, setFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState("new");
  const [loadFilter, setLoadFilter] = useState(false);
  const nodeRef = useRef();

  const handleFilter = (type) => {
    setTypeFilter(type);
    setPage(1);
    setPosts([]);
    setLoadFilter(!loadFilter);
  };
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
        const response = await axios.get(
          `/idea?page=${page}&option=${typeFilter}`
        );
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
  }, [page, loadFilter]);
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
  return (
    <div className="content">
      <div className="content-navbar">
        <Navbar></Navbar>
      </div>
      <div className="content-main">
        <div className="content-search">
          <input type="text" placeholder="Search something..." />
          <span>
            <i className="fa fa-search"></i>
          </span>
        </div>
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
        <div className="content-filter">
          <div className="content-filterMain">
            <span>Post</span>
            <div
              className="content-filterDropdown"
              onClick={() => {
                setFilter(!filter);
              }}
            >
              <span>Filter</span>
              <span>
                <i className="fa fa-caret-down"></i>
              </span>
              {filter && (
                <div className="content-filterShowDropdown">
                  <div className="content-filterShowDropdownContent">
                    <div
                      className="content-filterItem"
                      onClick={() => handleFilter("new")}
                    >
                      <span>New Idea</span>
                    </div>
                    <div
                      className="content-filterItem"
                      onClick={() => handleFilter("view")}
                    >
                      <span>View Idea</span>
                    </div>
                    <div
                      className="content-filterItem"
                      onClick={() => handleFilter("popular")}
                    >
                      <span>Popular Idea</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {posts.length > 0 && (
          <ListPost posts={posts} setPosts={setPosts}></ListPost>
        )}
        <div className="text-center content-loadMore" ref={positionLoad}></div>
        <div className="content-loading d-flex justify-content-center fs-3">
          {loading && <i className="fa fa-spinner fa-spin"></i>}
        </div>
      </div>
    </div>
  );
};

export default Content;
