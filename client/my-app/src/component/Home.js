import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../component/sidebar/Sidebar";
import Content from "../component/content/Content";
import Profile from "../component/profile/Profile";
import Overlay from "./overlay/Overlay";
import CreateContentPost from "./content/createPost/CreateContentPost";
const Home = () => {
  const [createIdea, setCreateIdea] = useState(false);
  const [image, setImage] = useState(false);
  const [file, setFile] = useState(false);
  const nodeRef = useRef();
  useEffect(() => {
    const deleteBtn = document.querySelector(".createContentPost-deletePost");
    const handleClickOutSide = (e) => {
      if (createIdea && !nodeRef.current.contains(e.target)) {
        setCreateIdea(false);
        document.body.classList.remove("active");
      } else if (createIdea && deleteBtn.contains(e.target)) {
        setCreateIdea(false);
        document.body.classList.remove("active");
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [createIdea]);
  return (
    <div className="body row mx-0 position-relative">
      <Sidebar></Sidebar>
      <Content
        setCreateIdea={setCreateIdea}
        setImage={setImage}
        setFile={setFile}
      ></Content>
      <Profile></Profile>
      {createIdea && (
        <Overlay>
          <CreateContentPost
            setCreateIdea={setCreateIdea}
            image={image}
            setImage={setImage}
            file={file}
            setFile={setFile}
            ref={nodeRef}
          ></CreateContentPost>
        </Overlay>
      )}
    </div>
  );
};

export default Home;
