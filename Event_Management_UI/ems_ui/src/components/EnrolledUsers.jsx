import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavStatus from "./UserNavStatus";
import { RiReplyFill } from "react-icons/ri";

const EnrolledUsers = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const users = location.state.users;

  const back = () => {
    navigate("/events");
  };

  return (
    <div>
      <UserNavStatus />
      <div className="container-fluid">
        <h1>
          <span>
            <RiReplyFill className="cursor-hover fs-5" onClick={back} />
          </span>{" "}
          Enrolled Users
        </h1>
        <table className="table text-light text-center">
          <thead>
            <tr>
              <th>User Id</th>
              <th>User</th>
              <th>Phone No.</th>
              <th>Attendance</th>
            </tr>
          </thead>
          {typeof(users) == 'string' ? (
            <tr className="tr-message"><h1 className="align-center">No users Enrolled</h1></tr>
          ):(
          <tbody>
            {users.map((item, i) => (
              <tr key={i}>
                <td>{item["userId"]}</td>
                <td>{item["username"]}</td>
                <td>{item["phoneno"]}</td>
                <td>
                  {item["attendance"] ? (
                    <div className="form-check">
                      <input
                        checked
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckIndeterminateDisabled"
                        disabled
                      />
                    </div>
                  ) : (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckIndeterminateDisabled"
                        disabled
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EnrolledUsers;
