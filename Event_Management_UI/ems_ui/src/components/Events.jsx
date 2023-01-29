import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavStatus from "./UserNavStatus";
import { RiReplyFill } from "react-icons/ri";

const Events = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      fetch("http://127.0.0.1:8000/api/events")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setData(data);
          //console.log(data["Bearer"]);
          /*if (data["Error"]) {
                alert(data["Error"]);
              } else {
                navigate("/user");
              }*/
        });
    } catch (e) {
      alert(e);
    }
  }, []);

  const enroll = async (eventNo) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        eventNo: eventNo,
      }),
    };
    try {
      await fetch("http://127.0.0.1:8000/api/register-event", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          //console.log(data["Bearer"]);
          if (data["Message"]) {
            alert(data["Message"]);
          } else {
            alert("Enrolled Successfully...");
          }
        });
    } catch (e) {
      alert(e);
    }
  };

  const enrolledUsers = async (eventNo) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventNo: eventNo,
      }),
    };
    try {
      await fetch("http://127.0.0.1:8000/api/enrolled-users", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data["Message"]) {
            alert(data["Message"]);
          } else {
            navigate("/enrolled-users", { state: { users: data } });
            //alert(JSON.stringify(data))
          }
        });
    } catch (e) {
      navigate("/enrolled-users", { state: { users: "No Users Enrolled" } });
    }
  };

  const back = () => {
    if (sessionStorage.getItem("IsAdmLoggedIn")) {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <div>
      <UserNavStatus />
      <div className="container-fluid">
        <h1>
          <span>
            <RiReplyFill className="cursor-hover fs-5" onClick={back} />
          </span>{" "}
          Events
        </h1>
        <table className="table text-light text-center">
          <thead>
            <tr>
              <th>Event No</th>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Event Date</th>
              <th>Event Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item["eventNo"]}</td>
                <td>{item["eventName"]}</td>
                <td>{item["description"]}</td>
                <td>{item["date"]}</td>
                <td>{item["time"]}</td>
                <td>
                  {sessionStorage.getItem("IsAdmLoggedIn") ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => enrolledUsers(item["eventNo"])}
                    >
                      View Enrolled Users
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => enroll(item["eventNo"])}
                    >
                      Enroll
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
