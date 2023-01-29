import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserNavStatus from '../components/UserNavStatus'

const Admin = () => {

  const navigate = useNavigate();

  const navigateEvents = () => {
    navigate("/events");
  }
  const navigateCreateEvents = () => {
    navigate("/create-event");
  }

  return (
    <div>
    <div>
    <UserNavStatus />
    <h1 className='align-center'>Admin Page</h1>
    <div className="options">
      <div className="option">
        <button onClick={navigateEvents}>
          <h1>
            <span className="badge bg-primary">Events</span>
          </h1>
        </button>
      </div>
      <div className="option">
        <button  onClick={navigateCreateEvents}>
          <h1>
            <span className="badge bg-success">Create Events</span>
          </h1>
        </button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Admin
