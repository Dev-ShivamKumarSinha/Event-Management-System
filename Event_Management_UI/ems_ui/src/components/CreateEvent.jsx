import React, { useState } from "react";
import UserNavStatus from "./UserNavStatus";
import { RiReplyFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import addEvent from "../static/event.jpg";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    eventName: "",
    description: "",
    date: "",
    time: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEvent({ ...event, [name]: value });
  };
  const navigate = useNavigate();
  const back = () => {
    navigate("/admin");
  };
  const createEvent = async() => {
   let { eventName, description, date, time } = event;
      if(!eventName || !description ||!date || !time){
          alert("All the fields are mandatory");
      }
      else{
          const requestOptions = {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                eventName, description, date, time 
            }),
          };
          await fetch("http://127.0.0.1:8000/api/add-event", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data);
                    if (data['Error']){
                        alert(JSON.stringify(data['Error']));
                    }
                    else{
                        navigate('/admin');
                        alert("New Event Created")
                    }    
                });
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
          Create Events
        </h1>
      </div>
      <div className="base-container">
        <div className="content">
          <div className="image">
            <img className="logImg" src={addEvent} alt="Login/Register" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="eventName">Event Title</label>
              <input
                value={event.eventName}
                onChange={handleInput}
                type="text"
                name="eventName"
                placeholder="Event Title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                value={event.description}
                onChange={handleInput}
                type="text"
                name="description"
                placeholder="Event Description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Event Date</label>
              <input
                value={event.date}
                onChange={handleInput}
                type="date"
                name="date"
                placeholder="Event Date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Event Time</label>
              <input
                value={event.time}
                onChange={handleInput}
                type="time"
                name="time"
                placeholder="Event Time"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={createEvent} type="button" className="btn">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
