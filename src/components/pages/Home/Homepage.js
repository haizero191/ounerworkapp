import React from "react";
import "./Homepage.scss";
import PostList from "../../commons/PostList/PostList";

const Homepage = () => {
  return (
    <div class="Homepage">
      <div className="reel-section">
        Real container
      </div>

      <div className="content-section">
        <PostList />
      </div>
    </div>
  );
};

export default Homepage;
