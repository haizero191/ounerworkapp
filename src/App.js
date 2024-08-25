import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useReducer, useState } from "react";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import "./assets/fonts/SegoeUI/SegoeUI_Fonts.css";

import Login from "./pages/Login/Login";

import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

import NewFeedLayout from "./layout/NewFeedLayout/NewFeedLayout";
import Home from "./pages/Home/Home";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
import PrivateRoute from "./layout/components/PrivateRoute/PrivateRoute";
import Profile from "./pages/Profile/Profile";

export const MyUserContext = createContext();
export const MyDispatchContext = createContext();

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const approvedPath = ["/", "/home"];

  // Check user login
  useEffect(() => {

    if (cookies.load("isApproved") === "false" && approvedPath.includes(location.pathname)) {
      const isConfirmed = window.confirm(
        "Tài khoản của bạn chưa được quản trị viên phê duyệt. Hoàn thành hồ sơ cá nhân của bạn chính xác và chờ xác nhận nha :>"
      );
      if(isConfirmed) {
        setTimeout(() => {
          navigate("/profile");
        }, 500);
      }
    }
  }, [location]);

  return (
    <Routes>
      {/* HOME PAGE LAYOUT */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <NewFeedLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
