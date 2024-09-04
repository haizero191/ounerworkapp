import React, { useEffect, useState } from "react";
import "./PostCard.scss";
import { decryptHTML } from "../../utils/Crypto";

import GridOne from "../ImageLayout/GridOne/GridOne";
import { POST_ACTION_REACTION } from "../../redux/actions/post.action";
import { useDispatch, useSelector } from "react-redux";
import ThunThunIcon from "../../assets/images/thun_thun_reaction_icon.png";
import SadIcon from "../../assets/images/sad_reaction_icon.png";
import LikeIcon from "../../assets/images/like_reaction_icon.png";
import HahaIcon from "../../assets/images/haha_reaction_icon.png";
import LikeFIcon from "../../assets/images/likef_reaction_icon.png";
import RenderReactionUI from "./RenderReactionUI/RenderReactionUI";

const PostCard = ({ data }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [clickTimeout, setClickTimeout] = useState(null);
  const dispatchDelay = 500;
  const [emotion, setEmotion] = useState("DEFAULT");

  const [reaction, setReaction] = useState({
    isInteracted: false,
    emotion: "DEFAULT",
    number: 0,
  });

  /* =================== COMPONENT LIFECYCLE ===================== */

  useEffect(() => {
    setReaction({
      emotion: data.userInteraction
        ? data.userInteraction.reactionType
        : "DEFAULT",
      number: data.reactionNumber,
      isInteracted: data.userInteraction ? true : false,
    });
  }, []);

  useEffect(() => {
    if (data.userInteraction) setEmotion(data.userInteraction.reactionType);
    else setEmotion("DEFAULT");
  }, [data]);

  /* =================== COMPONENT FUNCTIONS ===================== */

  /* GET FULLNAME ------------------- */
  const getFullName = (firstName, lastName) => {
    return firstName + " " + lastName;
  };

  /* HANDLE TEXT SUMMARY ------------------- */
  const textSummary = (text) => {
    return text.slice(0, 180) + (text.length < 180 ? ".   " : "... ");
  };

  /* HANDLE VIEW DETAILED CONTENT ------------------- */
  const onViewDetailContent = (e) => {
    const detailBtnElm = e.currentTarget;
    const contentParentElm = detailBtnElm.parentElement;
    const contentElm = contentParentElm.querySelector("span.content");
    const summaryContentElem =
      contentParentElm.querySelector(".content-summary");
    summaryContentElem.style.maxHeight = "fit-content";
    summaryContentElem.style.overflow = "auto";
    contentElm.dangerouslySetInnerHTML = data.content;
    // ẩn xem thêm
    detailBtnElm.style.display = "none";
  };

  /* CONVERT TIME TO HOURS ------------------- */
  const convertTimeToHours = (time) => {
    const date = new Date(time);
    const now = new Date(); // Lấy thời gian hiện tại
    const diffInMilliseconds = now - date; // Tính toán chênh lệch thời gian
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Chuyển đổi chênh lệch sang giờ
    return diffInHours;
  };

  /* CONVERT TO SINCE POST CREATED ------------------- */
  const convertTimeSince = (time) => {
    var hours = Math.floor(convertTimeToHours(time));
    var minutes = Math.floor((convertTimeToHours(time) - hours) * 60); // Tính số phút
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
    } else if (hours >= 1) {
      return `${hours} giờ trước`;
    } else {
      return `${minutes} phút trước`;
    }
  };

  /* INNER HTML ------------------- */
  const HtmlContent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  /* HANDLE REACTION TO POST ------------------- */
  const onReactionClicked = (postId, type) => {
    // Clear timeout action if user spam
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    var currentEmotion = reaction.emotion !== type ? type : "DEFAULT";

    if (type === "DEFAULT") {
      // SET CLIENT DEFAUTL
      setReaction({
        ...reaction,
        emotion: "LOVE",
        isInteracted: true,
        number: reaction.number + 1,
      });
      currentEmotion = "LOVE"
    } else {
      // SET CLIENT EMOTION
      setReaction({
        ...reaction,
        emotion: reaction.emotion !== type ? type : "DEFAULT",
        isInteracted:
          reaction.emotion === type
            ? !reaction.isInteracted
            : reaction.emotion !== type
            ? true
            : false,
        number: !reaction.isInteracted
          ? reaction.number + 1
          : reaction.emotion !== type
          ? reaction.number
          : reaction.number - 1,
      });
      currentEmotion = reaction.emotion !== type ? type : "DEFAULT"
    }





    // tạo timeout block spam
    const newTimeout = setTimeout(() => {


      console.log("last emotion: ", emotion);
      console.log("current emotion", currentEmotion)

      if(emotion === currentEmotion){
        console.log("BLOCKED")
        return;
      }

      if (reaction.emotion !== "DEFAULT") {
        dispatch(
          POST_ACTION_REACTION({
            postId: data.id,
            reactionType: type,
            isUpdate: true,
          })
        );
      } else {
        dispatch(
          POST_ACTION_REACTION({
            postId: data.id,
            reactionType: type === "DEFAULT" ? "LOVE" : type,
            isUpdate: false,
          })
        );
      }

      console.log("before set emotion")

      setEmotion(currentEmotion)
    }, dispatchDelay);

    setClickTimeout(newTimeout);
  };

  return (
    <div className="PostCard">
      <div className="post-card">
        <div className="post-card_header">
          <div className="avatar">
            <img src={data.owner.profile.avatar.url} />
          </div>
          <div className="info">
            <p className="name">
              <span>
                {getFullName(
                  data.owner.profile.firstName,
                  data.owner.profile.lastName
                )}
                <i className="time">{convertTimeSince(data.createdAt)}</i>
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
                  <div className={"grid-col"} key={"post-card-img-" + media.id}>
                    <GridOne media={media} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="post-card_reactions">
          <div className="reaction-icons">
            <div className="icon emotions">
              <div className="reaction-icons_container">
                {/* <div
                  className="icon-more"
                  onClick={() => onReactionClicked(data.id, "LIKE")}
                >
                  <img
                    className="just-like"
                    src={LikeFIcon}
                    style={{ transform: "rotateZ(90deg) scale(1)" }}
                    alt="just-like"
                  />
                </div> */}

                <div
                  className="icon-more"
                  onClick={() => onReactionClicked(data.id, "LOVE")}
                >
                  <i className="bi bi-heart-fill"></i>
                </div>
                <div className="icon-more"  onClick={() => onReactionClicked(data.id, "LIKE")}>
                  <img src={LikeIcon} />
                </div>

                <div className="icon-more">
                  <img
                    src={HahaIcon}
                    onClick={() => onReactionClicked(data.id, "HAHA")}
                    alt="haha"
                  />
                </div>
                <div className="icon-more">
                  <img
                    src={ThunThunIcon}
                    onClick={() => onReactionClicked(data.id, "THUNTHUN")}
                    alt="thunthun"
                  />
                </div>
                <div className="icon-more">
                  <img
                    src={SadIcon}
                    onClick={() => onReactionClicked(data.id, "SAD")}
                    alt="sad"
                  />
                </div>
              </div>

              {/* RENDER DEFAULT REACTION */}
              <div className="icon-default">
                <RenderReactionUI
                  isInteracted={reaction.isInteracted}
                  reactionType={reaction.emotion}
                  target={data}
                  onReactionClicked={onReactionClicked}
                />
              </div>
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
            <span>{reaction.number} lượt bày tỏ cảm xúc </span>
          </div>
        </div>
        <div className="post-card_content">
          <span className="content-summary">
            <span className={"summary"}>
              <span className="content">
                <HtmlContent html={decryptHTML(data.content)} />
              </span>
            </span>
          </span>
          <span className="detailed-btn" onClick={onViewDetailContent}>
            Xem thêm
          </span>
        </div>
        <div className="number-comment">
          <p>{data.commentNumber} bình luận về bài viết này</p>
        </div>
        <div className="post-card_comments">
          <input type="text" placeholder="Thêm bình luận ..." />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
