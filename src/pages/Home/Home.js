import React, { useEffect, useState } from "react";
import "./Home.scss";
import PostList from "../../components/PostList/PostList";
import APIs, { endpoints } from "../../configs/APIs";
import { useSelector, useDispatch } from "react-redux";
import { POST_ACTION_GETALL } from "../../redux/actions/post.action";
import cookies from "react-cookies";
import CustomModal from "../../components/CustomModal/Modal";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import MiniProfile from "../../components/MiniProfile/MiniProfile";
import ReelBoard from "../../components/ReelBoard/ReelBoard";
import MiniFriendship from "../../components/MiniFriendship/MiniFriendship";
import { PROFILE_ACTION_GET } from "../../redux/actions/profile.action";
import PostCreateForm from "../../components/PostCreateForm/PostCreateForm";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState();
  const [isCreatedForm, setIsCreatedForm] = useState(false);

  /* Get cookies state - access token */
  const token = cookies.load("access-token");

  useEffect(() => {
    if (state.profile && state.profile.data) {
      setProfile(state.profile.data);
    }
  }, [state.profile]);

  // Initial Functional
  useEffect(() => {
    // Get Post
    dispatch(POST_ACTION_GETALL());

    // Get profile user login
    if (token && getPayloadFromJWT(token) != null) {
      dispatch(
        PROFILE_ACTION_GET({
          studentID: getPayloadFromJWT(token),
        })
      );
    }
  }, []);

  // Change data when state updated
  useEffect(() => {
    if (state.posts.data) {
      setPosts(state.posts.data);
    }
  }, [state.posts]);

  const getPayloadFromJWT = (token) => {
    // Here, you might want to decode the token and check for its expiration, etc.
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000; // Convert expiration to milliseconds
      return payload.sub;
    } catch (e) {
      return null;
    }
  };

  const onCreatePost = () => {
    setIsCreatedForm((isCreatedForm) => (isCreatedForm = !isCreatedForm));
  };

  return (
    <div className="Home">
      <Container>
        <Row className="justify-content-md-center">
          {/* Post Create UI */}
          {isCreatedForm && (
            <Col xs={6}>
              <PostCreateForm />
            </Col>
          )}

          {/* Post UI */}
          <Col xs={6} style={{paddingTop: "32px", paddingBottom: "50px"}}>
            <div className="reel-section">
              <ReelBoard />
            </div>
            <div className="content-section" >
              <PostList data={posts} />
            </div>
          </Col>

          {/* Personal summary UI */}
          {!isCreatedForm && (
            <Col xs={3}  style={{paddingTop: "32px", paddingBottom: "50px"}}>
              <div className="personal-side">
                <div className="mini-profile">
                  <MiniProfile data={profile} />
                </div>
                <div className="mini-friendship">
                  <MiniFriendship />
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>

      <div className="post-create-btn" onClick={onCreatePost}>
        {!isCreatedForm ? (
          <>
            <span>Tạo bài viết mới</span>
            <i class="bi bi-plus"></i>
          </>
        ) : (
          <>
            <span>Đóng</span>
            <i class="bi bi-x"></i>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
