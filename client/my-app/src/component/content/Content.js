import React, { useEffect, useRef, useState } from "react";
import "./Content.css";
import axios from "axios";
import ListPost from "./posts/ListPost";
import CreatePost from "./createPost/CreatePost";
const Content = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const positionLoad = useRef(null);

  useEffect(() => {
    async function fecthData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/viewIdea?page=${page}`
        );
        if (response.data?.ideas) {
          setTimeout(() => {
            setPosts([...posts, ...response.data.ideas]);
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
  return (
    <div className="col-8">
      <div className="content-main">
        <div className="content-search">
          <input type="text" placeholder="Search something..." />
          <span>
            <i className="fa fa-search"></i>
          </span>
        </div>
        <CreatePost
          setCreateIdea={props.setCreateIdea}
          setImage={props.setImage}
          setFile={props.setFile}
        ></CreatePost>
        <ListPost posts={posts}></ListPost>
        <div className="text-center content-loadMore" ref={positionLoad}></div>
        <div className="content-loading d-flex justify-content-center fs-3">
          {loading && <i className="fa fa-spinner fa-spin"></i>}
        </div>
      </div>
    </div>
  );
};

export default Content;
