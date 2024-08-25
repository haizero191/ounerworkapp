import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, Routes } from "react-router-dom";
import "./NewFeedLayout.scss";
import sessions from "react-cookies";


const NewFeedLayout = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="NewFeedLayout">
      <div className="layout-main">
        {/* Sidebar */}
        <div className="layout-main__sidebar">
          <Sidebar />
        </div>

        {/* Content  */}
        <div className="layout-main__container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NewFeedLayout;
