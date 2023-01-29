import React from "react";
import { useNavigate } from "react-router-dom";
import { RiRadioButtonLine } from "react-icons/ri";

const UserNavStatus = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (sessionStorage.getItem("IsAdmLoggedIn")) {
      navigate("/admin-login");
    } else {
      navigate("/login");
    }
    sessionStorage.clear();
    window.location.reload(false);
  };

  let user = sessionStorage.getItem("username");

  return (
    <div>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="user-status">
              <div className="status text-capitalize">
                {user} <RiRadioButtonLine />
              </div>
              <div className="logout cursor-hover">
                <div className="nav-link menu_active" onClick={logout}>
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavStatus;
