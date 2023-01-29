import React from "react";
import { useNavigate } from "react-router-dom";
import UserNavStatus from "../components/UserNavStatus";

const User = () => {
  const navigate = useNavigate();
  const navigateEvents = () =>{
    navigate("/events");
  }
  const navigateEnrolledEvents = () =>{
    navigate("/enrolled-events");
  }

  return (
    <div>
      <UserNavStatus />
      <div className="options">
        <div className="option">
          <button onClick={navigateEvents}>
            <h1>
              <span className="badge bg-primary">Events</span>
            </h1>
          </button>
        </div>
        <div className="option">
          <button  onClick={navigateEnrolledEvents}>
            <h1>
              <span className="badge bg-success">Enrolled Events</span>
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
