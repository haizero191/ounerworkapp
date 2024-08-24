import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useReducer, useState } from "react";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import "./assets/fonts/SegoeUI/SegoeUI_Fonts.css";



import Login from "./components/pages/Login/Login";

import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

import NewFeedLayout from "./layout/NewFeedLayout/NewFeedLayout";
import Home from "./components/pages/Home/Home";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
import PrivateRoute from "./layout/components/PrivateRoute/PrivateRoute";

export const MyUserContext = createContext();
export const MyDispatchContext = createContext();

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const state = useSelector((state) => state);

  // Check user login
  useEffect(() => {
    if (isLogin) {
      setIsAuthenticated(true);
    }
    else {
      setIsAuthenticated(true);
    }
  }, [location]);

  const isLogin = () => {
    try {
      const payload = JSON.parse(
        atob(cookies.load("access-token").split(".")[1])
      );
      const exp = payload.exp * 1000; // Convert expiration to milliseconds
      return Date.now() < exp;
    } catch (e) {
      return false;
    }
  };

  return (
    <Routes>
      {/* HOME LAYOUT */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <NewFeedLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
      </Route>

      {/* LOGIN LAYOUT */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
