import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavStatus from "./UserNavStatus";
import { RiReplyFill } from "react-icons/ri";

const MarkPresent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state.event;
  const [ticket, setTicket] = useState("");

  const back = () => {
    navigate("/enrolled-events");
  };


  const markPresent = async () => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          token: ticket,
        }),
      };
      try {
        await fetch("http://127.0.0.1:8000/api/mark-present", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            //console.log(data["Bearer"]);
            if (data["Error"]) {
              alert(data["Error"]);
            }
            if (data["Message"]){
                alert(data["Message"]);
            } 
            if(data["Success"]) {
              alert(data["Success"]);
              navigate("/enrolled-events");
            }
          });
      } catch (e) {
        alert(e);
      }
  }

  return (
    <div>
      <UserNavStatus />
      <div className="container-fluid">
        <h1>
          <span>
            <RiReplyFill className="cursor-hover fs-5" onClick={back} />
          </span>{" "}
          Mark Present
        </h1>
        <table className="table text-light text-center">
          <thead>
            <tr>
              <th>Event No</th>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Event Date</th>
              <th>Event Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{event["eventNo"]}</td>
              <td>{event["eventName"]}</td>
              <td>{event["description"]}</td>
              <td>{event["date"]}</td>
              <td>{event["time"]}</td>
            </tr>
            <tr>
              <div className="d-grid gap-2 col-6 mx-auto position-absolute top-40 start-50 translate-middle">
              <input onChange={(e)=>setTicket(e.target.value)} className="pretty" type="text" placeholder="Ticket" />
            <button className="btn btn-primary position-relative top-40 start-50 translate-middle" type="button" onClick={markPresent}>
                Mark Attendance
            </button>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarkPresent;
