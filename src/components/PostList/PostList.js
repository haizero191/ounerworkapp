import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import "./PostList.scss";
import { useSelector } from "react-redux";

const PostList = ({ data }) => {
  const state = useSelector((state) => state);


  useEffect(() => {
    
  }, [state]);

  return (
    <div className="PostList">
      <div className="post-list__inner">
        {data && data.map((post) => {
          return <PostCard data={post} />;
        })}
      </div>
    </div>
  );
};

export default PostList;
