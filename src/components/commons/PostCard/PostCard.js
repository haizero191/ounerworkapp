import React, { useEffect } from "react";
import "./PostCard.scss";
const PostCard = ({ post }) => {
  useEffect(() => {
    console.log("post data:", post);
  });

  return (
    <div className="PostCard">
      <div className="post-card">
        <div className="post-card_header">
          <div className="avatar">
            <img src="https://productplacementblog.com/wp-content/uploads/2019/11/Apple-MacBook-Laptop-Used-by-Thomas-Middleditch-as-Richard-Hendricks-in-Silicon-Valley-Season-6-Episode-4-4.jpg" />
          </div>
          <div className="info">
            <p className="name">Richard Hendricks </p>
            <p className="role">CEO Pied Piper</p>
          </div>
        </div>
        <div className="post-card_media">
          <img src="https://www.themoviedb.org/t/p/original/Ab6maL0pq9KKT0izRsNamOMVGLQ.jpg" />
        </div>
        <div className="post-card_reactions">
          <div className="reaction-icons">
            <div className="icon love">
              <i class="bi bi-heart"></i>
            </div>
            <div className="icon chat">
              <i class="bi bi-chat"></i>
            </div>
            <div className="icon share">
              <i class="bi bi-send"></i>
            </div>
          </div>
          <div className="reaction-pin">
            <i class="bi bi-bookmark-star"></i>
          </div>
          <div className="reactions-number">
            <span>0 lượt bày tỏ cảm xúc </span>
          </div>
        </div>

        <div className="post-card_content">
          <span className="content-summary">
            <span className="summary">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s...{" "}
            </span>
            <span className="detailed">Xem thêm</span>
          </span>
        </div>

        <div className="post-card_comments">
          <input type="text" placeholder="Thêm bình luận ..."/>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
