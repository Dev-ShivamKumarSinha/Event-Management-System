import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavStatus from "./UserNavStatus";
import { RiReplyFill } from "react-icons/ri";

const EnrolledEvents = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${sessionStorage.getItem("token")}`,
      },
    };
    try {
      fetch("http://127.0.0.1:8000/api/enrolled-events", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } catch (e) {
      alert(e);
    }
  }, []);

  const back = () => {
    navigate("/user");
  };

  const markPresent = (event) => {
    navigate("/mark-present",{state:{event:event}});
    //alert("Mark Present");
  };

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e);
    alert("Ticket Copied...");
  };

  return (
    <div>
      <UserNavStatus />
      <div className="container-fluid">
        <h1>
          <span>
            <RiReplyFill className="cursor-hover fs-5" onClick={back} />
          </span>{" "}
          Enrolled Events
        </h1>
        <table className="table text-light text-center">
          <thead>
            <tr>
              <th>Event No</th>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Event Date</th>
              <th>Event Time</th>
              <th>Ticket</th>
              <th>Attendance</th>
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
                <td className="copyInput">
                  <input
                    type="text"
                    value={item["ticket"]}
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => copyToClipboard(item["ticket"])}
                      type="button"
                    >
                      Copy
                    </button>
                  </div>
                </td>
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
                ):(
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
                <td>
                {item["attendance"] ? (
                  <button disabled
                    className="btn btn-primary"
                    onClick={() => markPresent({
                        eventNo :item["eventNo"],
                         eventName :item["eventName"],
                         description :item["description"],
                         date : item["date"],
                         time: item["time"]
                        })}
                  >
                    Mark Present
                  </button>
                ):(
                    <button 
                    className="btn btn-primary"
                    onClick={() => markPresent({
                        eventNo :item["eventNo"],
                         eventName :item["eventName"],
                         description :item["description"],
                         date : item["date"],
                         time: item["time"]
                        })}
                  >
                    Mark Present
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

export default EnrolledEvents;
