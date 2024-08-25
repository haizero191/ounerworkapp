import React, { useEffect } from "react";
import "./MiniProfile.scss";
import cookies from "react-cookies";
import { useNavigate } from "react-router-dom";

const MiniProfile = ({ data }) => {
  const navigate = useNavigate();

  useEffect(() => {}, [data]);

  const logout = () => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất tài khoản này này?"
    );

    if (isConfirmed) {
      cookies.remove("access-token", { path: "/" });
      cookies.remove("isApproved", { path: "/" });
      cookies.remove("studentID", { path: "/" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div className="MiniProfile">
      {data && (
        <>
          <div className="mini-profile_info">
            <div className="avatar">
              <img src={data.avatar.url} />
            </div>
            <div className="info">
              <p>
                {data.firstName} {data.lastName}
              </p>
              <p>{data.spec.major.name}</p>
            </div>
          </div>
          <div className="mini-profile_logout" onClick={logout}>
            Logout
          </div>
        </>
      )}
    </div>
  );
};

export default MiniProfile;
