import React, { useEffect, useState } from "react";
import "./Home.scss";
import PostList from "../../commons/PostList/PostList";
import APIs, { endpoints } from "../../../configs/APIs";
import { useSelector, useDispatch } from "react-redux";
import { POST_ACTION_GETALL } from "../../../redux/actions/post.action";
import cookies from "react-cookies";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [posts, setPosts] = useState([]);


  // Initial Functional
  useEffect(() => {
    dispatch(POST_ACTION_GETALL());
  }, []);


  // Change data when state updated
  useEffect(() => {
    if (state.posts.data) {
      setPosts(state.posts.data);
    }
  }, [state.posts]);


  return (
    <div className="Home">
      <div className="reel-section">Reel container</div>
      <div className="content-section">
        <PostList data={posts} />
      </div>
    </div>
  );
};

export default Home;
