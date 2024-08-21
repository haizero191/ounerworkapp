import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useReducer } from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "./assets/fonts/SegoeUI/SegoeUI_Fonts.css";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MyUserReducer from "./reducers/MyUserReducer";
import Login from "./components/Login";
import Register from "./components/Register";
import Post from "./components/commons/PostList/PostList";
import Homepage from "./components/pages/Home/Homepage";
import Sidebar from "./layout/components/Sidebar/Sidebar";
import { Col, Row } from "react-bootstrap/esm";

export const MyUserContext = createContext();
export const MyDispatchContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <div className="layout-header">{/* <Header /> */}</div>

          <div className="layout-main">
            <div className="layout-main__sidebar">
              <Sidebar />
            </div>
            <div className="layout-main__container">
              <Container >
                <Row className="justify-content-md-center">
                  <Col xs={6}>
                    <Routes>
                      <Route path="/" element={<Homepage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      {/* <Route path="/home" element={<Homepage />} /> */}
                    </Routes>
                  </Col>
                  <Col xs={3} height="100">1 of 3</Col>
                </Row>
              </Container>
            </div>
          </div>

          {/* <Footer /> */}
        </BrowserRouter>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
};

export default App;
