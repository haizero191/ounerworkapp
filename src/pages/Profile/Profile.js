import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Profile.scss";

const Profile = () => {
  const friends = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="Profile">
      <Container>
        <Row className="justify-content-md-center">
          {/* Post UI */}
          <Col xs={9}>
            <div className="user-information">
              <div className="user-information_container">
                <div className="wallpaper">
                  <img src="https://th.bing.com/th/id/R.46a305c6c82622ac5a5bd587ae39be9a?rik=sSmuEHJcfWJhAw&riu=http%3a%2f%2fmattingly.design%2farticles%2fwp-content%2fuploads%2f2020%2f07%2fsilicon-valley-logo-story-arc.jpg&ehk=d5HJJZNDd8ZgByMb8q5Ob4dfopk3QSNJebVH7HFXG8g%3d&risl=&pid=ImgRaw&r=0" />
                </div>
                <div className="information">
                  <div>
                    <div className="name">
                      <p>richard hendricks</p>
                    </div>
                    <div className="student-info">
                      <div className="major">
                        <p>
                          Information Technologies ( IT ) <span></span>
                        </p>
                        <p>/</p>
                        <p> MIS Class </p>
                      </div>
                    </div>
                  </div>
                  <div className="friends"></div>
                </div>
                <div className="intro">
                  <h5>Giới thiệu</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="avatar">
                  <img src="https://th.bing.com/th/id/OIP.VgBs2Eio87UBvoyOk6E1TgHaE8?rs=1&pid=ImgDetMain" />
                </div>
              </div>
            </div>


            <div className="user-posted">
              <div className="title">
                <h5>Photos of you</h5>
                <p>When people tag you in photos, they'll appear here.</p>
              </div>
              <div className="pins-row">
                <div className="pins-col">
                  <img src="https://th.bing.com/th/id/OIP.9G6_JbtWnLO1IZeODruEcgHaEK?rs=1&pid=ImgDetMain" />
                </div>
                <div className="pins-col">
                  <img src="https://m.media-amazon.com/images/M/MV5BOWJlMDY5NWEtODJmZS00Mzk1LTg1Y2MtNWE2NTE5ZGI1MmJiXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_FMjpg_UX500_.jpg" />
                </div>
                <div className="pins-col">
                  <img src="https://m.media-amazon.com/images/M/MV5BOGQ0YjhiYTAtMzVkZS00ZDE3LTlmNWQtZGZjNDAwODRlNjk1XkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_QL75_UX500_CR0,47,500,281_.jpg" />
                </div>
                <div className="pins-col">
                  <img src="https://th.bing.com/th/id/OIP.J5d4dAguw1vv5ASQL4IwSAHaK-?w=1012&h=1500&rs=1&pid=ImgDetMain" />
                </div>
                <div className="pins-col">
                  <img src="https://i.ytimg.com/vi/9m9fXyHPfwg/maxresdefault.jpg" />
                </div>
                <div className="pins-col">
                  <img src="https://th.bing.com/th/id/OIP.i4rgD9TAvXqgYTnBFrla6wHaEo?w=640&h=400&rs=1&pid=ImgDetMain" />
                </div>
                <div className="pins-col">
                  <img src="https://th.bing.com/th/id/OIP.8G212Ze2b4YnPdgUlsXoKgHaEK?w=1200&h=675&rs=1&pid=ImgDetMain" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
