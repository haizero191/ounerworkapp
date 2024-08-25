import React, { useEffect, useState } from "react";
import "./PostCard.scss";

import GridOne from "../ImageLayout/GridOne/GridOne";
const PostCard = ({ data }) => {
  const [imgTypePosted, setImgTypePosted] = useState("NOIMAGE");

  const [GridImage, setGridImage] = [
    {
      component: "",
      amount: 0,
    },
    {
      component: "",
      amount: 1,
    },
  ];

  // Danh sách tỷ lệ cho các hình đơn
  const aspectRatios = [
    {
      name: "SHARED_LINK",
      ratioX: 1200,
      ratioY: 628,
    },
    {
      name: "IMAGE",
      ratioX: 1200,
      ratioY: 800,
    },
    {
      name: "IMAGE_HORIZONTAL",
      ratioX: 1200,
      ratioY: 630,
    },
    {
      name: "IMAGE_VERTICAL",
      ratioX: 960,
      ratioY: 1440,
    },
  ];

  useEffect(() => {
    if (data.mediaList === null) return;
    let amountImg = data.mediaList.length;

    if (amountImg === 0) {
      setImgTypePosted("NOIMAGE");
    }
    if (amountImg === 1) {
      setImgTypePosted("IMAGE");
    }
    if (amountImg > 1) {
      setImgTypePosted("ALBUM");
    }
  }, []);

  /** Tạo tên đầy đủ cho người dùng */
  const getFullName = (firstName, lastName) => {
    return firstName + " " +lastName;
  };

  /** Ẩn bớt content */
  const textSummary = (text) => {
    return text.slice(0, 180) + (text.length < 180 ? ".   " : "... ");
  };

  /** Xử lý Hiển thị chi tiết content */
  const onViewDetailContent = (e) => {
    const detailBtnElm = e.currentTarget;
    const contentParentElm = detailBtnElm.parentElement;
    const contentElm = contentParentElm.querySelector("span.content");
    contentElm.innerText = data.content;
    // ẩn xem thêm
    detailBtnElm.style.display = "none";
  };

  // Convert hours
  const convertTimeToHours = (time) => {
    const date = new Date(time);
    const now = new Date(); // Lấy thời gian hiện tại
    const diffInMilliseconds = now - date; // Tính toán chênh lệch thời gian
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Chuyển đổi chênh lệch sang giờ
    return diffInHours;
  };

  // Convert to time since posted
  const convertTimeSince = (time) => {
    var hours = Math.floor(convertTimeToHours(time));
    const hoursInADay = 24;
    const daysInAMonth = 30;
    const daysInAYear = 365;

    if (hours >= hoursInADay * daysInAYear) {
      const years = Math.floor(hours / (hoursInADay * daysInAYear));
      return `${years} năm trước`;
    } else if (hours >= hoursInADay * daysInAMonth) {
      const months = Math.floor(hours / (hoursInADay * daysInAMonth));
      return `${months} tháng trước`;
    } else if (hours >= hoursInADay) {
      const days = Math.floor(hours / hoursInADay);
      return `${days} ngày trước`;
    } else {
      return `${hours} giờ trước`;
    }
  };

  return (
    <div className="PostCard">
      <div className="post-card">
        <div className="post-card_header">
          <div className="avatar">
            <img src="https://productplacementblog.com/wp-content/uploads/2019/11/Apple-MacBook-Laptop-Used-by-Thomas-Middleditch-as-Richard-Hendricks-in-Silicon-Valley-Season-6-Episode-4-4.jpg" />
          </div>
          <div className="info">
            <p className="name">
              <span>
                {getFullName(
                  data.owner.profile.firstName,
                  data.owner.profile.lastName
                )}
                <i className="time">{convertTimeSince(data.updatedAt)}</i>
              </span>
              <span className="hightlight-major">
                {data.owner.profile.spec.major.alias}
              </span>
            </p>
            <p className="role">
              <b>{data.owner.profile.spec.alias}</b> /{" "}
              <span style={{ fontStyle: "italic" }}>
                {data.owner.profile.spec.name}
              </span>
            </p>
          </div>
        </div>
        <div className="post-card_media">
          <div className="grid-container_contain grid-style">
            <div className="grid-row">
              {/* RENDER SINGLE IMAGE  */}
              {data.mediaList.map((media) => {
                return (
                  <div className={"grid-col"}>
                    <GridOne media={media} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="post-card_reactions">
          <div className="reaction-icons">
            <div className="icon love">
              <i className="bi bi-heart"></i>
            </div>
            <div className="icon chat">
              <i className="bi bi-chat"></i>
            </div>
            <div className="icon share">
              <i className="bi bi-send"></i>
            </div>
          </div>
          <div className="reaction-pin">
            <i className="bi bi-bookmark-star"></i>
          </div>
          <div className="reactions-number">
            <span>{data.reactionNumber} lượt bày tỏ cảm xúc </span>
          </div>
        </div>
        <div className="post-card_content">
          <span className="content-summary">
            <span className={"summary"}>
              <span className="content">{textSummary(data.content)}</span>
              {data.content.length > 180 ? (
                <span className="detailed-btn" onClick={onViewDetailContent}>
                  Xem thêm
                </span>
              ) : (
                <></>
              )}
            </span>
          </span>
        </div>
        <div className="post-card_comments">
          <input type="text" placeholder="Thêm bình luận ..." />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
