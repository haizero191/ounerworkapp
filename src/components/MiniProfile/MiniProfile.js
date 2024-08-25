import React from "react";
import "./MiniProfile.scss";
import cookies from "react-cookies";
import { useNavigate } from "react-router-dom";

const MiniProfile = () => {
  const navigate = useNavigate();

  const logout = () => {


    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất tài khoản này này?");

    if (isConfirmed) {
      cookies.remove("access-token", { path: "/" });
      cookies.remove("isApproved", { path: "/" });
      cookies.remove("studentID", { path: "/" });
      setTimeout(() => {
        navigate("/login"); 
      }, 1000)
    } 
  };

  return (
    <div className="MiniProfile">
      <div className="mini-profile_info">
        <div className="avatar">
          <img src="https://productplacementblog.com/wp-content/uploads/2019/11/Apple-MacBook-Laptop-Used-by-Thomas-Middleditch-as-Richard-Hendricks-in-Silicon-Valley-Season-6-Episode-4-4.jpg" />
        </div>
        <div className="info">
          <p>User name</p>
          <p>Infomation Technologies</p>
        </div>
      </div>
      <div className="mini-profile_logout" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default MiniProfile;
