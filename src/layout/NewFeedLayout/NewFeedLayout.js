import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet, Routes } from "react-router-dom";
import "./NewFeedLayout.scss";
import MiniProfile from "../components/MiniProfile/MiniProfile";

const NewFeedLayout = () => {
  return (
    <div className="NewFeedLayout">
      <div className="layout-header">{/* <Header /> */}</div>
      <div className="layout-main">
        <div className="layout-main__sidebar">
          <Sidebar />
        </div>
        <div className="layout-main__container">
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={6}>
                <Outlet />
              </Col>
              <Col xs={3} height="100">
                <div className="personal-side">
                    <div className="mini-profile">
                      <MiniProfile/>
                    </div>
                    <div className="mini-friendship">Mini friendship</div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NewFeedLayout;
