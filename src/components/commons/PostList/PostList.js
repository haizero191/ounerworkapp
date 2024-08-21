import React, { useState } from "react";
import PostCard from "../PostCard/PostCard";
import "./PostList.scss";

const PostList = () => {
  const [posts, setPosts] = useState([{}]);

  return (
    <div className="PostList">
      <div className="post-list__inner">
        {/* {
          posts.map(post => {
            return <PostCard data={post}/>
          })
        } */}

        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default PostList;
