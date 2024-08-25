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
      <Container>
        <Row className="justify-content-md-center">
          {/* Post UI */}
          <Col xs={6}>
            <div className="reel-section">
              <ReelBoard/>
            </div>
            <div className="content-section">
              <PostList data={posts} />
            </div>
          </Col>

          {/* Personal summary UI */}
          <Col xs={3} height="100">
            <div className="personal-side">
              <div className="mini-profile">
                <MiniProfile />
              </div>
              <div className="mini-friendship">
                <MiniFriendship/>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
